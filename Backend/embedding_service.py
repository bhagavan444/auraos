import logging
from sentence_transformers import SentenceTransformer

logger = logging.getLogger(__name__)

# Initialize the model globally so it only loads into memory once.
# "all-MiniLM-L6-v2" is a small, fast model generating 384-dimensional embeddings.
try:
    model = SentenceTransformer('all-MiniLM-L6-v2')
    logger.info("✅ SentenceTransformer model loaded successfully.")
except Exception as e:
    logger.error(f"Failed to load SentenceTransformer model: {e}")
    model = None

def generate_embedding(text):
    """
    Generates a 384-dimensional vector embedding for a single string of text.
    """
    if not model:
        raise RuntimeError("Embedding model is not loaded.")
        
    if not text or not text.strip():
        return []
        
    # encode() returns a numpy array. Convert to a standard Python list of floats.
    embedding = model.encode(text).tolist()
    return embedding

def generate_document_embeddings(chunks):
    """
    Takes a list of chunk dictionaries, generates embeddings in batch, 
    and appends the 'embedding' field to each chunk.
    """
    if not model or not chunks:
        logger.warning("🧠 embedding_service: No model loaded or no chunks provided. Skipping embeddings.")
        return chunks

    logger.info(f"🧠 embedding_service: Generating embeddings for {len(chunks)} chunks...")
    texts = [chunk["chunk_text"] for chunk in chunks]
    
    # Batch encode is significantly faster than a loop
    embeddings = model.encode(texts).tolist()
    
    for idx, chunk in enumerate(chunks):
        chunk["embedding"] = embeddings[idx]
        
    logger.info("🧠 embedding_service: Successfully generated and attached embeddings to chunks.")
    return chunks
