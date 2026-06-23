from dotenv import load_dotenv
import os
load_dotenv()

key = os.getenv("GEMINI_API_KEY", "").strip('"').strip("'")
print(f"Key starts with: {key[:10]}...")
print(f"Key length: {len(key)}")

from google import genai
try:
    client = genai.Client(api_key=key)
    resp = client.models.generate_content(model="gemini-2.0-flash", contents="Say hello in one word")
    print("SUCCESS:", resp.text[:100])
except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")
