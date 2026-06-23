import requests

url = 'http://127.0.0.1:5000/api/chat'
headers = {
    'Content-Type': 'application/json'
}
data = {
    'message': 'hello',
    'chat_id': 'test1234'
}
try:
    response = requests.post(url, json=data, headers=headers)
    print('Status:', response.status_code)
except Exception as e:
    print('Error:', e)
