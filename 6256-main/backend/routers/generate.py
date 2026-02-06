"""Генерация документа по шаблону с подстановкой данных сделки/клиента."""
import io
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from database import get_db
from models import Deal, Client

router = APIRouter(prefix="/api/generate", tags=["generate"])


class GenerateRequest(BaseModel):
    template_key: str  # kvartira, dom, dogovor, akt, ...
    deal_id: Optional[int] = None
    client_id: Optional[int] = None


def _make_text_doc(deal: Optional[Deal], client: Optional[Client], template_key: str) -> str:
    """Формирует текстовый документ (заглушка; в проде — docx с подстановкой)."""
    lines = [
        f"Документ по шаблону: {template_key}",
        "---",
        ""
    ]
    if client:
        lines.extend([
            f"Клиент: {client.name}",
            f"ИНН: {client.inn or '—'}",
            f"Телефон: {client.phone or '—'}",
            f"Email: {client.email or '—'}",
            ""
        ])
    if deal:
        lines.extend([
            f"Сделка №{deal.id}",
            f"Этап: {deal.stage}",
            f"Сумма: {deal.sum_rub} ₽" if deal.sum_rub else "Сумма: —",
            f"Дата: {deal.date or '—'}",
            ""
        ])
    lines.append("(Сгенерировано платформой БЮРО ЭКСПЕРТОВ)")
    return "\n".join(lines)


@router.post("/document")
def generate_document(body: GenerateRequest, db: Session = Depends(get_db)):
    deal, client = None, None
    if body.deal_id:
        deal = db.query(Deal).filter(Deal.id == body.deal_id).first()
        if deal and deal.client_id:
            client = db.query(Client).filter(Client.id == deal.client_id).first()
        elif deal:
            client = None
    if body.client_id and not client:
        client = db.query(Client).filter(Client.id == body.client_id).first()
    if not client and not deal:
        raise HTTPException(status_code=400, detail="Укажите deal_id или client_id")
    content = _make_text_doc(deal, client, body.template_key)
    filename = f"document_{body.template_key}.txt"
    return StreamingResponse(
        io.BytesIO(content.encode("utf-8")),
        media_type="text/plain; charset=utf-8",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
