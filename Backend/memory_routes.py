from flask import Blueprint, request, jsonify, g
from auth_middleware import firebase_required
from datetime import datetime
from bson.objectid import ObjectId
import logging

from database import memories_collection
from memory_service import generate_memory_hash

logger = logging.getLogger(__name__)

memory_bp = Blueprint('memory_bp', __name__)

@memory_bp.route("/api/memory/create", methods=["POST"])
@firebase_required
def create_memory():
    """Manually create a new memory for a user."""
    data = request.get_json() or {}
    user_id = g.current_user["uid"]
    memory_text = data.get("memory")
    category = data.get("category", "personal")
    importance = data.get("importance", 5)

    if not memory_text:
        return jsonify({"error": "memory text is required"}), 400

    mem_hash = generate_memory_hash(memory_text, user_id)
    
    # Check for duplicates
    if memories_collection.find_one({"user_id": user_id, "memory_hash": mem_hash}):
        return jsonify({"message": "Memory already exists for this user"}), 200

    new_memory = {
        "user_id": user_id,
        "memory": memory_text,
        "memory_hash": mem_hash,
        "category": category,
        "importance": importance,
        "created_at": datetime.utcnow(),
        "last_accessed": datetime.utcnow()
    }
    
    result = memories_collection.insert_one(new_memory)
    return jsonify({
        "message": "Memory successfully created", 
        "id": str(result.inserted_id)
    }), 201

@memory_bp.route("/api/memory/list", methods=["GET"])
@firebase_required
def list_memories():
    """List all memories for a user, optionally filtered by category."""
    user_id = g.current_user["uid"]
    category = request.args.get("category")
        
    query = {"user_id": user_id}
    if category:
        query["category"] = category
        
    # Sort by highest importance first, then newest first
    cursor = memories_collection.find(query).sort(
        [("importance", -1), ("created_at", -1)]
    )
    
    memories = []
    for m in cursor:
        m["_id"] = str(m["_id"])  # Convert ObjectId to string for JSON serialization
        memories.append(m)
        
    return jsonify({"memories": memories}), 200

@memory_bp.route("/api/memory/delete/<id>", methods=["DELETE"])
@firebase_required
def delete_memory(id):
    """Delete a memory by its ObjectId."""
    try:
        result = memories_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count > 0:
            return jsonify({"message": "Memory deleted successfully"}), 200
        return jsonify({"error": "Memory not found"}), 404
    except Exception as e:
        logger.error(f"Error deleting memory: {e}")
        return jsonify({"error": "Invalid memory ID format"}), 400
