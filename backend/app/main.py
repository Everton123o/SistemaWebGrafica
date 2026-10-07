"""FastAPI application entry point."""

from fastapi import FastAPI

from app.api import api_router


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    application = FastAPI(title="Sistema Web para Gráfica")
    application.include_router(api_router)
    return application


app = create_app()
