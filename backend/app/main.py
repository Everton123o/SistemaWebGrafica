"""FastAPI application entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
import hmac
from app.core.config import get_settings

from app.api import api_router
from app.core.database import Base, engine
from app.core.security import jwt_key
from app.models.service import Service


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    application = FastAPI(title="Sistema Web para Gráfica")
    settings = get_settings()
    application.add_middleware(TrustedHostMiddleware, allowed_hosts=settings.trusted_hosts)

    @application.middleware("http")
    async def security_headers(request, call_next):
        if request.method not in {"GET", "HEAD", "OPTIONS"} and request.url.path not in {"/auth/login", "/auth/register"}:
            access_cookie = request.cookies.get("printpro_access")
            if access_cookie:
                csrf_cookie = request.cookies.get("printpro_csrf", "")
                csrf_header = request.headers.get("x-csrf-token", "")
                if not csrf_cookie or not csrf_header or not hmac.compare_digest(csrf_cookie, csrf_header):
                    from fastapi.responses import JSONResponse
                    return JSONResponse({"detail": "Token CSRF inválido."}, status_code=403)
        response = await call_next(request)
        if response.status_code == 401:
            response.delete_cookie("printpro_access", path="/", samesite="strict")
            response.delete_cookie("printpro_csrf", path="/", samesite="strict")
        response.headers["Content-Security-Policy"] = "default-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        if request.url.scheme == "https" or request.headers.get("x-forwarded-proto", "").lower() == "https":
            response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        return response
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PATCH", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type", "X-CSRF-Token", "ngrok-skip-browser-warning"],
    )
    application.include_router(api_router)
    @application.on_event("startup")
    def validate_security_configuration():
        jwt_key()

    if engine is not None:
        @application.on_event("startup")
        def create_service_table():
            Base.metadata.create_all(bind=engine, tables=[Service.__table__])
    return application


app = create_app()
