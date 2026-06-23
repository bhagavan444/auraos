import firebase_admin
from firebase_admin import credentials
import os
import sys

# Force UTF-8 output on Windows
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Path to your Firebase service account key
SERVICE_ACCOUNT_PATH = os.path.join(os.path.dirname(__file__), "serviceAccountKey.json")

def initialize_firebase():
    """Initialize the Firebase Admin SDK if not already initialized."""
    if not firebase_admin._apps:
        try:
            cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
            firebase_admin.initialize_app(cred)
            print("[OK] Firebase Admin SDK Initialized Successfully")
        except Exception as e:
            print(f"[ERROR] Failed to initialize Firebase Admin SDK: {e}")

# Initialize immediately when imported
initialize_firebase()
