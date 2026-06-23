import requests

url = 'http://127.0.0.1:5000/api/chat'
headers = {
    'Origin': 'http://localhost:5173',
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'Authorization, Content-Type'
}
try:
    response = requests.options(url, headers=headers)
    print('Status:', response.status_code)
    print('Headers:', response.headers)
    print('Body:', response.text)
except Exception as e:
    print('Error:', e)
