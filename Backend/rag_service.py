import logging
from database import knowledge_chunks_collection
from embedding_service import generate_embedding

logger = logging.getLogger(__name__)

def retrieve_rag_context(user_id, question, top_k=3):
    """
    Embeds the user question and performs Atlas Vector Search to retrieve 
    the most semantically relevant document chunks.
    """
    if not question:
        logger.warning("🔍 rag_service: No question provided for RAG retrieval.")
        return "", []
        
    try:
        logger.info(f"🔍 rag_service: Generating embedding for RAG query: '{question}'")
        # 1. Generate Query Embedding
        query_embedding = generate_embedding(question)
        if not query_embedding:
            logger.warning("🔍 rag_service: Failed to generate embedding for RAG query.")
            return "", []
            
        logger.info(f"🔍 rag_service: Query embedding generated. Dimensions: {len(query_embedding)}")
        logger.info(f"🔍 rag_service: Performing Atlas Vector Search on index 'knowledge_vector_index' in collection 'knowledge_chunks' for user {user_id} with top_k={top_k}")
        # 2. Atlas Vector Search Pipeline
        pipeline = [
            {
                "$vectorSearch": {
                    "index": "knowledge_vector_index",
                    "path": "embedding",
                    "queryVector": query_embedding,
                    "numCandidates": 100,
                    "limit": top_k,
                    "filter": {
                        "user_id": {"$eq": user_id}
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "document_name": 1,
                    "chunk_index": 1,
                    "chunk_text": 1,
                    "score": {"$meta": "vectorSearchScore"}
                }
            }
        ]
        
        results = list(knowledge_chunks_collection.aggregate(pipeline))
        
        logger.info(f"🔍 rag_service: Atlas Vector Search executed. Number of hits: {len(results)}")
        
        if not results:
            logger.info("🔍 rag_service: No matching chunks found in Atlas Vector Search.")
            return "", []
            
        logger.info(f"🔍 rag_service: Found {len(results)} relevant chunks. Formatting context...")
        # 3. Format Context String with Source Attribution
        formatted_context = "## Retrieved Context:\n\n"
        for i, chunk in enumerate(results):
            doc_name = chunk.get("document_name", "Unknown Document")
            chunk_idx = chunk.get("chunk_index", "?")
            text = chunk.get("chunk_text", "")
            score = chunk.get("score", 0.0)
            
            logger.info(f"🔍 rag_service: Hit {i+1} | Score: {score:.4f} | Document: {doc_name} | Chunk: {chunk_idx}")
            
            formatted_context += f"Source:\n{doc_name}\n"
            formatted_context += f"Chunk: {chunk_idx}\n"
            formatted_context += f"{text}\n\n"
            
        return formatted_context.strip(), results
        
    except Exception as e:
        logger.error(f"Vector Retrieval Error: {e}")
        return "", []
