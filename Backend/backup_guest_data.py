import json
from bson.json_util import dumps
import logging

from database import chats_collection, messages_collection, memories_collection, knowledge_base_collection

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def backup_guest_data():
    """Backup all data belonging to 'guest_user' before migration."""
    logger.info("Starting backup of 'guest_user' data...")
    
    backup_data = {
        "chats": list(chats_collection.find({"user_id": "guest_user"})),
        "memories": list(memories_collection.find({"user_id": "guest_user"})),
        "knowledge_base": list(knowledge_base_collection.find({"user_id": "guest_user"}))
    }
    
    # Also fetch messages for the guest user's chats
    chat_ids = [c["_id"] for c in backup_data["chats"]]
    backup_data["messages"] = list(messages_collection.find({"chat_id": {"$in": chat_ids}}))
    
    with open("guest_backup.json", "w", encoding="utf-8") as f:
        f.write(dumps(backup_data, indent=4))
        
    logger.info("✅ Backup complete. Saved to 'guest_backup.json'.")

if __name__ == "__main__":
    backup_guest_data()
