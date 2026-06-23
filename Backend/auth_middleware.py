from functools import wraps
from flask import request, jsonify, g
from auth_service import verify_firebase_token
from database import users_collection
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

def firebase_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"error": "Missing Authorization header"}), 401

        # Verify token
        user_info = verify_firebase_token(auth_header)
        if not user_info:
            return jsonify({"error": "Invalid or expired Firebase token"}), 401

        uid = user_info["uid"]
        
        # Auto-create or update user in MongoDB (fault-tolerant — DB may be temporarily down)
        try:
            existing_user = users_collection.find_one({"firebase_uid": uid})
            now = datetime.utcnow()
            if not existing_user:
                users_collection.insert_one({
                    "firebase_uid": uid,
                    "email": user_info["email"],
                    "display_name": user_info["display_name"],
                    "photo_url": user_info["photo_url"],
                    "provider": user_info["provider"],
                    "created_at": now,
                    "last_login": now,
                    "is_active": True
                })
            else:
                users_collection.update_one(
                    {"firebase_uid": uid},
                    {"$set": {"last_login": now}}
                )
        except Exception as e:
            # Non-fatal: user is authenticated via Firebase, DB write is best-effort
            logger.warning(f"[WARN] Could not sync user to DB: {type(e).__name__} — continuing anyway")

        # Always assign user_info and proceed
        g.current_user = user_info
        return f(*args, **kwargs)
        
    return decorated_function
