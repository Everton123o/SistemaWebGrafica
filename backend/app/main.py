"""FastAPI application entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings

from app.api import api_router


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    application = FastAPI(title="Sistema Web para Gráfica")
    application.add_middleware(CORSMiddleware, allow_origins=get_settings().cors_origins,
                               allow_methods=["GET", "POST"],
                               allow_headers=["Authorization", "Content-Type"])
    application.include_router(api_router)
    return application


app = create_app()
