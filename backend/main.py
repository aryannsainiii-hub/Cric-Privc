"""
Cric Privé API — Phase 2 backend.

Run locally with:
    uvicorn main:app --reload
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from core.config import get_settings
from api import teams, players, venues, matches, predictions, tournament

settings = get_settings()

app = FastAPI(
    title="Cric Privé API",
    description="The Private Intelligence of IPL — Phase 2 backend (FastAPI + PostgreSQL).",
    version="0.2.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------
# Consistent error envelope for every failure mode, matching the
# { success, data, message } shape used by successful responses.
# ---------------------------------------------------------------------
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": str(exc.detail)},
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    first_error = exc.errors()[0] if exc.errors() else None
    message = "Validation error"
    if first_error:
        loc = ".".join(str(p) for p in first_error.get("loc", []) if p != "body")
        message = f"{loc}: {first_error.get('msg')}" if loc else first_error.get("msg", message)
    return JSONResponse(status_code=422, content={"success": False, "message": message})


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "An unexpected error occurred. Please try again."},
    )


@app.get("/health", tags=["System"], summary="Health check")
def health_check():
    return {"status": "healthy", "service": settings.app_name}


app.include_router(teams.router)
app.include_router(players.router)
app.include_router(players.teams_nested_router)
app.include_router(venues.router)
app.include_router(matches.router)
app.include_router(predictions.router)
app.include_router(tournament.router)
