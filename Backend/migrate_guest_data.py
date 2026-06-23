import sys
import logging
from database import chats_collection, memories_collection, knowledge_base_collection

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def migrate_guest_data(new_firebase_uid):
    """Migrate all 'guest_user' data to the authenticated Firebase UID."""
    if not new_firebase_uid:
        logger.error("❌ A valid Firebase UID is required.")
        return

    logger.info(f"Starting migration from 'guest_user' to '{new_firebase_uid}'...")
    
    chats_result = chats_collection.update_many(
        {"user_id": "guest_user"},
        {"$set": {"user_id": new_firebase_uid}}
    )
    logger.info(f"Updated {chats_result.modified_count} chat sessions.")
    
    memories_result = memories_collection.update_many(
        {"user_id": "guest_user"},
        {"$set": {"user_id": new_firebase_uid}}
    )
    logger.info(f"Updated {memories_result.modified_count} memories.")
    
    knowledge_result = knowledge_base_collection.update_many(
        {"user_id": "guest_user"},
        {"$set": {"user_id": new_firebase_uid}}
    )
    logger.info(f"Updated {knowledge_result.modified_count} knowledge base documents.")
    
    logger.info("✅ Migration complete!")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python migrate_guest_data.py <FIREBASE_UID>")
        sys.exit(1)
        
    uid = sys.argv[1]
    migrate_guest_data(uid)
