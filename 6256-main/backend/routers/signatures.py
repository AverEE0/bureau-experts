"""Подписи КЭП/УКЭП (заглушка; реальная интеграция КриптоПро — отдельно)."""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/api/signatures", tags=["signatures"])


class SignRequest(BaseModel):
    document_id: int
    comment: Optional[str] = None


class SignStatusResponse(BaseModel):
    document_id: int
    status: str  # pending, signed, error
    message: str


@router.post("/request", response_model=SignStatusResponse)
def request_signature(body: SignRequest):
    """Заглушка: запрос подписи документа. В проде — интеграция с КриптоПро/сервером подписей."""
    return SignStatusResponse(
        document_id=body.document_id,
        status="pending",
        message="Запрос на подпись принят (заглушка). Для реальной подписи настройте КриптоПро.",
    )


@router.get("/status/{document_id}", response_model=SignStatusResponse)
def signature_status(document_id: int):
    """Статус подписи документа (заглушка)."""
    return SignStatusResponse(
        document_id=document_id,
        status="pending",
        message="Статус подписи (заглушка).",
    )
