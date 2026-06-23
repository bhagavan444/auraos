import sys
import logging
from sentence_transformers import SentenceTransformer

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_embeddings():
    """Validates that the sentence-transformers model is working locally."""
    logger.info("Loading model...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    question1 = "What is supervised learning?"
    question2 = "How do machines learn from labeled data?"
    question3 = "What is a banana?"
    
    emb1 = model.encode(question1)
    emb2 = model.encode(question2)
    emb3 = model.encode(question3)
    
    # Calculate cosine similarity
    from numpy import dot
    from numpy.linalg import norm
    
    def cosine_sim(a, b):
        return dot(a, b)/(norm(a)*norm(b))
        
    sim_1_2 = cosine_sim(emb1, emb2)
    sim_1_3 = cosine_sim(emb1, emb3)
    
    logger.info(f"Similarity ('{question1}', '{question2}'): {sim_1_2:.4f} (Should be HIGH)")
    logger.info(f"Similarity ('{question1}', '{question3}'): {sim_1_3:.4f} (Should be LOW)")
    
    if sim_1_2 > sim_1_3:
        logger.info("✅ Semantic Embedding validation passed!")
    else:
        logger.error("❌ Semantic Embedding validation failed!")

if __name__ == "__main__":
    test_embeddings()
