"""HTTP API package."""

from fastapi import APIRouter

from app.api.routes import router as routes_router

api_router = APIRouter(prefix="/api")
api_router.include_router(routes_router)
