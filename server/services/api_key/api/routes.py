from fastapi import APIRouter, Depends
from model import ApiKeyCreate, ApiKeyResponse, ApiKeyUpdate
from controller import *
from ..auth import get_current_user

api_key_routes = APIRouter()

@api_key_routes.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "api_key"}

@api_key_routes.post("/generate", response_model=ApiKeyResponse)
async def generate_api_key_for_user(api_key_data: ApiKeyCreate, current_user: dict = Depends(get_current_user)):
    """Generate a new API key for the current user"""
    return await create_api_key(api_key_data, current_user)

@api_key_routes.put("/{api_key_id}", response_model=ApiKeyResponse)
async def update_api_key_route(api_key_id: str, api_key_data: ApiKeyUpdate, current_user: dict = Depends(get_current_user)):
    """Update an existing API key"""
    return await update_api_key(api_key_id, api_key_data, current_user)

