from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import api_key_routes
from database import connect_to_mongo, close_mongo_connection
import uvicorn

app = FastAPI(
    title="API Key Service",
    description="API Key Service",
    version="1.0.0",
)

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_key_routes, prefix="/api/api_keys")

@app.get("/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3002)


