from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

class Database:
    client: AsyncIOMotorClient = None
    api_keys_collection = None

db = Database()

async def connect_to_mongo():
    db.client = AsyncIOMotorClient(
        DATABASE_URL,
        server_api=ServerApi('1')
    )
    db.api_keys_collection = db.client[DATABASE_NAME]["api_keys"]
    
    # Create indexes
    await db.api_keys_collection.create_index("api_key", unique=True)
    # Create compound text index for transactions
    try:
        await db.api_keys_collection.create_index([
            ("name", "text"),
            ("api_key", "text"),
            ("user_id", "text"),
            ("wallet_address", "text"),
            ("status", "text"),
            ("created_at", "text"),
            ("updated_at", "text")
        ])
    except Exception as e:
        print(f"Error creating indexes: {e}")

async def close_mongo_connection():
    if db.client:
        db.client.close()

def serialize_datetime(dt):
    return dt.isoformat() if isinstance(dt, datetime) else dt

def serialize_id(id):
    return str(id) if id else None 