from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional, Any
from bson import ObjectId
from pydantic_core import CoreSchema
from pydantic.json_schema import JsonSchemaValue
import secrets
import string

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)
    
    @classmethod
    def __get_pydantic_json_schema__(cls, _schema: CoreSchema, _handler: Any) -> JsonSchemaValue:
        return {"type": "string"}
            
def generate_api_key(length: int = 32) -> str:
    """Generate a random API key"""
    alphabet = string.ascii_letters + string.digits
    return 'cryptopay_' + ''.join(secrets.choice(alphabet) for _ in range(length))

class ApiKeyCreate(BaseModel):
    name: Optional[str] = None

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
        "json_schema_extra": {
            "examples": [
                {
                    "name": "My API Key"
                }
            ]
        }
    }

class ApiKeyUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[str] = None
    
    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }
    
class ApiKeyInDB(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str
    name: str
    api_key: str
    wallet_address: str
    status: str
    created_at: datetime
    updated_at: datetime
    
    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
        }

class APIKeyResponse(BaseModel):
    id: str
    user_id: str
    name: str
    api_key: str
    wallet_address: str
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }
    
