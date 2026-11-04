"""API route aggregation."""

from fastapi import APIRouter

from app.api.routes.clients import router as clients_router
from app.api.routes.users import router as users_router
from app.api.routes.auth import router as auth_router

router = APIRouter()
router.include_router(users_router)
router.include_router(clients_router)
router.include_router(auth_router)
