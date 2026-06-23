import hashlib
import json
from datetime import datetime
import logging
from database import memories_collection
from google import genai as _genai
from config import GEMINI_MODEL
import os

logger = logging.getLogger(__name__)

_GEMINI_KEY = os.getenv("GEMINI_API_KEY", "").strip('"').strip("'")
_memory_client = _genai.Client(api_key=_GEMINI_KEY)

def _call_gemini(prompt):
    resp = _memory_client.models.generate_content(model=GEMINI_MODEL, contents=prompt)
    return resp.text

def generate_memory_hash(memory_text, user_id):
    """Generate a unique hash for a memory string per user to prevent duplicates."""
    hash_input = f"{user_id}:{memory_text.lower().strip()}"
    return hashlib.sha256(hash_input.encode('utf-8')).hexdigest()

def extract_memory(user_id, message):
    """Synchronously extract memories from a user message using Gemini."""
    prompt = f"""
You are the Aura Memory Extraction Engine.
Analyze the user's message and extract any important, persistent facts about the user.
Ignore conversational filler, greetings, or temporary tasks.
Categories allowed: personal, preferences, goals, skills, career, projects, education, work.

User Message: "{message}"

Output ONLY a valid JSON array of objects with the following schema:
[
  {{
    "memory": "string (the fact extracted, written in 3rd person or neutral perspective, e.g. 'User is a Python developer')",
    "category": "string (one of the allowed categories)",
    "importance": integer (1-10, where 10 is core identity/goals, 1 is trivial preference)
  }}
]
If there are no memories to extract, output an empty array [].
Do NOT wrap in a markdown block. Just output the raw JSON array.
"""
    try:
        text = _call_gemini(prompt).strip()
        
        # Handle cases where the model wraps the output in markdown block despite instructions
        if text.startswith("```json"):
            text = text[7:-3].strip()
        elif text.startswith("```"):
            text = text[3:-3].strip()
        
        try:
            extracted_facts = json.loads(text)
        except json.JSONDecodeError:
            logger.error(f"Failed to parse memory JSON: {text}")
            return
            
        if not isinstance(extracted_facts, list):
            return

        for fact in extracted_facts:
            memory_text = fact.get("memory")
            category = fact.get("category", "personal")
            importance = fact.get("importance", 5)
            
            if not memory_text:
                continue
                
            mem_hash = generate_memory_hash(memory_text, user_id)
            
            # Deduplication: Check if memory hash already exists for this user
            existing = memories_collection.find_one({"user_id": user_id, "memory_hash": mem_hash})
            if existing:
                logger.info(f"⏭️  Skipped duplicate memory: {memory_text}")
                continue
                
            # Insert new memory
            memories_collection.insert_one({
                "user_id": user_id,
                "memory": memory_text,
                "memory_hash": mem_hash,
                "category": category,
                "importance": importance,
                "created_at": datetime.utcnow(),
                "last_accessed": datetime.utcnow()
            })
            logger.info(f"✅ Extracted and saved new memory for {user_id}: {memory_text}")
            
    except Exception as e:
        logger.error(f"Failed during memory extraction: {e}")

def retrieve_relevant_memories(user_id):
    """Retrieve top 10 memories sorted by importance and last_accessed."""
    try:
        # Sort by importance (DESC), then last_accessed (DESC)
        cursor = memories_collection.find({"user_id": user_id}).sort(
            [("importance", -1), ("last_accessed", -1)]
        ).limit(10)
        
        memories = list(cursor)
        
        if not memories:
            return ""
            
        # Update last_accessed timestamp for the retrieved memories
        memory_ids = [m["_id"] for m in memories]
        memories_collection.update_many(
            {"_id": {"$in": memory_ids}},
            {"$set": {"last_accessed": datetime.utcnow()}}
        )
        
        # Format as a bulleted string
        formatted_memories = "Relevant User Memories:\n"
        for m in memories:
            formatted_memories += f"* {m['memory']}\n"
            
        return formatted_memories.strip()
        
    except Exception as e:
        logger.error(f"Failed to retrieve memories: {e}")
        return ""
