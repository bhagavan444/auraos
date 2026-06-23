import os
import uuid
import logging
from flask import Blueprint, request, jsonify, g
from auth_middleware import firebase_required
from werkzeug.utils import secure_filename
from bson.objectid import ObjectId

from database import knowledge_base_collection, knowledge_chunks_collection
from knowledge_service import process_document, search_documents

logger = logging.getLogger(__name__)

knowledge_bp = Blueprint('knowledge_bp', __name__)

UPLOAD_DIR = "downloads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {'.pdf', '.docx', '.pptx'}

def allowed_file(filename):
    return '.' in filename and \
           os.path.splitext(filename)[1].lower() in ALLOWED_EXTENSIONS

@knowledge_bp.route("/api/knowledge/upload", methods=["POST"])
@firebase_required
def upload_knowledge():
    """Uploads a document, extracts text, summarizes with AI, and stores in Knowledge Vault."""
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
        
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400
        
    if not allowed_file(file.filename):
        return jsonify({"error": f"Invalid file type. Allowed extensions: {', '.join(ALLOWED_EXTENSIONS)}"}), 400
        
    user_id = g.current_user["uid"]
    
    # Save file temporarily
    filename = f"{uuid.uuid4().hex}_{secure_filename(file.filename)}"
    path = os.path.join(UPLOAD_DIR, filename)
    file.save(path)
    
    try:
        # Orchestrate ingestion
        result = process_document(user_id, path, file.filename)
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"Upload failed: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        # Optionally clean up the file after ingestion, or keep it in downloads.
        # For this implementation, keeping it since other parts of the app might use it.
        pass

@knowledge_bp.route("/api/knowledge/list", methods=["GET"])
@firebase_required
def list_knowledge():
    """Fetches all documents for a user, omitting the large 'content' field for speed."""
    user_id = g.current_user["uid"]
    
    # Exclude the raw content from the list view
    cursor = knowledge_base_collection.find(
        {"user_id": user_id}, 
        {"content": 0}
    ).sort("uploaded_at", -1)
    
    documents = []
    for doc in cursor:
        doc["_id"] = str(doc["_id"])
        documents.append(doc)
        
    return jsonify({"documents": documents}), 200

@knowledge_bp.route("/api/knowledge/<id>", methods=["GET"])
@firebase_required
def get_knowledge(id):
    """Fetches a single document in full, including content."""
    try:
        doc = knowledge_base_collection.find_one({"_id": ObjectId(id)})
        if doc:
            doc["_id"] = str(doc["_id"])
            return jsonify({"document": doc}), 200
        return jsonify({"error": "Document not found"}), 404
    except Exception as e:
        return jsonify({"error": "Invalid document ID"}), 400

@knowledge_bp.route("/api/knowledge/delete/<document_id>", methods=["DELETE"])
@firebase_required
def delete_knowledge(document_id):
    """Deletes a document from the Knowledge Vault."""
    user_id = g.current_user["uid"]
    try:
        # Delete from base collection
        result = knowledge_base_collection.delete_one({"_id": ObjectId(document_id), "user_id": user_id})
        # Delete associated chunks
        knowledge_chunks_collection.delete_many({"document_id": document_id, "user_id": user_id})
        
        if result.deleted_count == 1:
            return jsonify({"message": "Document deleted successfully"}), 200
        return jsonify({"error": "Document not found"}), 404
    except Exception as e:
        logger.error(f"Delete failed: {e}")
        return jsonify({"error": str(e)}), 500

@knowledge_bp.route("/api/rag/debug", methods=["GET"])
@firebase_required
def rag_debug():
    """Standalone diagnostic endpoint for the RAG engine."""
    user_id = g.current_user["uid"]
    try:
        # Get total chunks for the user
        total_chunks = knowledge_chunks_collection.count_documents({"user_id": user_id})
        
        # Get one sample chunk to inspect embedding
        sample_chunk = knowledge_chunks_collection.find_one({"user_id": user_id})
        
        chunk_info = {}
        if sample_chunk:
            embedding = sample_chunk.get("embedding", [])
            chunk_info = {
                "document_name": sample_chunk.get("document_name"),
                "chunk_text_length": len(sample_chunk.get("chunk_text", "")),
                "embedding_exists": bool(embedding),
                "embedding_dimensions": len(embedding) if embedding else 0
            }
            
        return jsonify({
            "status": "success",
            "total_chunks": total_chunks,
            "sample_chunk_data": chunk_info,
            "vector_index_name": "knowledge_vector_index",
            "required_dimensions": 384,
            "required_similarity": "cosine",
            "required_filter_type": "filter"
        }), 200
    except Exception as e:
        logger.error(f"RAG debug failed: {e}")
        return jsonify({"error": str(e)}), 500

@knowledge_bp.route("/api/knowledge/search", methods=["POST"])
@firebase_required
def search_knowledge():
    """Manual search endpoint for the Knowledge Vault."""
    data = request.get_json() or {}
    user_id = g.current_user["uid"]
    query = data.get("query")
    
    if not query:
        return jsonify({"error": "Query string is required"}), 400
        
    results = search_documents(user_id, query)
    
    # Convert ObjectIds for JSON serialization
    for r in results:
        r["_id"] = str(r["_id"])
        # Omit massive content field from search results array to save bandwidth
        r.pop("content", None)
        
    return jsonify({"results": results}), 200
