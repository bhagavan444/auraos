import uuid
import logging

logger = logging.getLogger(__name__)

def chunk_text(text, chunk_size=400, overlap=50):
    """
    Splits text into chunks of `chunk_size` words with `overlap` words.
    Returns a list of dictionaries with chunk metadata.
    """
    if not text:
        return []

    words = text.split()
    total_words = len(words)
    logger.info(f"🧩 chunking_service: Starting to chunk text. Total words: {total_words}, Target chunk size: {chunk_size}, Overlap: {overlap}")
    chunks = []
    
    if total_words == 0:
        logger.warning("🧩 chunking_service: Received empty text for chunking.")
        return []
        
    step = chunk_size - overlap
    if step <= 0:
        step = chunk_size # Fallback if overlap is somehow >= chunk_size
        
    for i in range(0, len(words), step):
        chunk_words = words[i:i + chunk_size]
        chunk_text = " ".join(chunk_words)
        
        chunks.append({
            "chunk_id": uuid.uuid4().hex,
            "chunk_text": chunk_text,
            "chunk_index": len(chunks) + 1
        })
        
        # Break if we've reached the end
        if i + chunk_size >= len(words):
            break
            
    logger.info(f"🧩 chunking_service: Finished chunking. Generated {len(chunks)} chunks.")
    return chunks
