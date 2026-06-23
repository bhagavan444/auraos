from pymongo import MongoClient
from dotenv import load_dotenv
import os
import logging

logger = logging.getLogger(__name__)

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "")

# Timeouts so MongoDB failures fail fast instead of blocking for 10-30s
FAST_TIMEOUT = 5000  # ms

import certifi

try:
    client = MongoClient(
        MONGODB_URI,
        tls=True,
        tlsCAFile=certifi.where(),
        serverSelectionTimeoutMS=FAST_TIMEOUT,
        connectTimeoutMS=FAST_TIMEOUT,
        socketTimeoutMS=FAST_TIMEOUT,
    )
    client.admin.command('ping')
    logger.info("[OK] MongoDB connected successfully")
except Exception as e:
    logger.warning(f"[WARN] Primary MongoDB connection failed: {type(e).__name__} — {str(e)}")
    try:
        # Try once more without certifi just in case it was a certifi issue
        client = MongoClient(
            MONGODB_URI,
            tls=True,
            tlsAllowInvalidCertificates=True,
            serverSelectionTimeoutMS=FAST_TIMEOUT,
            connectTimeoutMS=FAST_TIMEOUT,
            socketTimeoutMS=FAST_TIMEOUT,
        )
    except Exception as fallback_e:
        logger.error(f"[ERROR] Fallback MongoDB connection also failed: {fallback_e}. Starting with dummy client.")
        # Provide a dummy client so app doesn't crash on import
        client = MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS=100)

db = client["aurabot_db"]

users_collection = db["users"]
chats_collection = db["chats"]
messages_collection = db["messages"]
files_collection = db["files"]
memories_collection = db["memories"]
knowledge_base_collection = db["knowledge_base"]
knowledge_chunks_collection = db["knowledge_chunks"]

def init_db():
    try:
        knowledge_base_collection.create_index(
            [
                ("document_name", "text"),
                ("summary", "text"),
                ("tags", "text"),
                ("content", "text")
            ],
            name="knowledge_text_index"
        )
        users_collection.create_index("firebase_uid", unique=True)
        chats_collection.create_index("user_id")
        messages_collection.create_index("user_id")
        messages_collection.create_index([("chat_id", 1), ("timestamp", 1)])
        memories_collection.create_index([("user_id", 1), ("importance", -1), ("created_at", -1)])
        knowledge_base_collection.create_index("user_id")
        knowledge_base_collection.create_index([("user_id", 1), ("uploaded_at", -1)])
        knowledge_chunks_collection.create_index("user_id")
        knowledge_chunks_collection.create_index("document_id")
        logger.info("[OK] MongoDB Indexes Initialized")
    except Exception as e:
        logger.warning(f"[WARN] Could not create MongoDB index: {type(e).__name__}")

init_db()
