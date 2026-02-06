"""Архив: сроки хранения, экспорт в XML/PDF (метаданные)."""
import io
from datetime import datetime
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import Document, Deal, Client

router = APIRouter(prefix="/api/archive", tags=["archive"])

# Сроки хранения по типу документа (лет), ФЗ-125, Приказ №558
RETENTION_BY_TYPE = {
    "Договор": 5,
    "Счет": 5,
    "Акт": 5,
    "Отчет об оценке": 10,
    "Заключение эксперта": 75,
    "Заключение судебного эксперта": 75,
    "Другое": 5,
}
DEFAULT_RETENTION = 5


def _retention_years(doc: Document) -> int:
    return doc.retention_years or RETENTION_BY_TYPE.get(doc.doc_type) or DEFAULT_RETENTION


@router.get("/retention")
def retention_policy():
    """Справочник сроков хранения по типам."""
    return {"retention_by_type": RETENTION_BY_TYPE, "default_years": DEFAULT_RETENTION}


@router.get("/export/xml")
def export_xml(db: Session = Depends(get_db)):
    """Экспорт реестра документов в XML для госархива (метаданные)."""
    docs = db.query(Document).order_by(Document.id).all()
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        "<archive_register>",
        f"  <export_date>{datetime.utcnow().isoformat()}Z</export_date>",
        "  <documents>",
    ]
    for d in docs:
        years = _retention_years(d)
        lines.append("    <document>")
        lines.append(f"      <id>{d.id}</id>")
        lines.append(f"      <name>{d.name}</name>")
        lines.append(f"      <doc_type>{d.doc_type}</doc_type>")
        lines.append(f"      <created_at>{d.created_at.isoformat() if d.created_at else ''}</created_at>")
        lines.append(f"      <retention_years>{years}</retention_years>")
        lines.append("    </document>")
    lines.append("  </documents>")
    lines.append("</archive_register>")
    content = "\n".join(lines)
    return StreamingResponse(
        io.BytesIO(content.encode("utf-8")),
        media_type="application/xml; charset=utf-8",
        headers={"Content-Disposition": 'attachment; filename="archive_register.xml"'},
    )


@router.get("/export/csv")
def export_csv(db: Session = Depends(get_db)):
    """Экспорт реестра в CSV."""
    docs = db.query(Document).order_by(Document.id).all()
    rows = ["id;name;doc_type;created_at;retention_years"]
    for d in docs:
        years = _retention_years(d)
        created = d.created_at.strftime("%Y-%m-%d %H:%M") if d.created_at else ""
        rows.append(f"{d.id};{d.name};{d.doc_type};{created};{years}")
    content = "\n".join(rows)
    return StreamingResponse(
        io.BytesIO(content.encode("utf-8-sig")),
        media_type="text/csv; charset=utf-8-sig",
        headers={"Content-Disposition": 'attachment; filename="archive_register.csv"'},
    )
