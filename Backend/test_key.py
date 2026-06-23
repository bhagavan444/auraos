import os, sys
from dotenv import load_dotenv
load_dotenv()

key = os.getenv('GEMINI_API_KEY', '').strip('"').strip("'")
print('Key prefix:', key[:15], '...')

# Try new SDK first
try:
    from google import genai as new_genai
    client = new_genai.Client(api_key=key)
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents='Say hello in one word'
    )
    print('NEW SDK SUCCESS with gemini-2.0-flash:', response.text[:80])
    sys.exit(0)
except ImportError:
    print('New google.genai SDK not installed')
except Exception as e:
    print('New SDK error:', type(e).__name__, str(e)[:200])

# Try old SDK with different model names
import google.generativeai as genai
genai.configure(api_key=key)

for model_name in ['gemini-2.0-flash', 'gemini-2.0-flash-001', 'gemini-1.5-flash-latest', 'gemini-pro']:
    try:
        model = genai.GenerativeModel(model_name)
        r = model.generate_content('hi')
        print(f'OLD SDK SUCCESS with {model_name}:', r.text[:80])
        break
    except Exception as e:
        print(f'  {model_name}: {type(e).__name__} - {str(e)[:100]}')
