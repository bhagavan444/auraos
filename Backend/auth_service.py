import firebase_admin_config  # This ensures SDK is initialized
from firebase_admin import auth
import logging

logger = logging.getLogger(__name__)

def verify_firebase_token(auth_header):
    """
    Extracts and verifies the Firebase ID token from the Authorization header.
    Returns the decoded token dictionary if valid, or None if invalid.
    """
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
        
    id_token = auth_header.split(" ")[1]
    
    try:
        # Verify the ID token while checking if the token is revoked
        decoded_token = auth.verify_id_token(id_token, check_revoked=True)
        
        # Structure the user information
        user_info = {
            "uid": decoded_token.get("uid"),
            "email": decoded_token.get("email", ""),
            "display_name": decoded_token.get("name", ""),
            "photo_url": decoded_token.get("picture", ""),
            "provider": decoded_token.get("firebase", {}).get("sign_in_provider", "unknown")
        }
        return user_info
        
    except auth.RevokedIdTokenError:
        logger.warning("Revoked Firebase token used.")
        return None
    except auth.ExpiredIdTokenError:
        logger.warning("Expired Firebase token used.")
        return None
    except auth.InvalidIdTokenError:
        logger.warning("Invalid Firebase token used.")
        return None
    except Exception as e:
        logger.error(f"Error verifying Firebase token: {e}")
        return None
