from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))

db = client["aurabot_db"]

db.test.insert_one({
    "message": "AuraBot Connected"
})

print("Connected Successfully")
