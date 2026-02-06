"""OCR по документу (Tesseract при наличии)."""
import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Document

router = APIRouter(prefix="/api/ocr", tags=["ocr"])

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")


def _run_tesseract(file_path: str) -> str:
    try:
        import pytesseract
        from PIL import Image
        img = Image.open(file_path)
        return pytesseract.image_to_string(img, lang="rus+eng")
    except Exception as e:
        return f"[OCR недоступен: {e}. Установите pytesseract и Tesseract-OCR.]"


@router.get("/document/{doc_id}")
def ocr_document(doc_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Документ не найден")
    path = os.path.join(UPLOAD_DIR, doc.file_path or "")
    if not doc.file_path or not os.path.isfile(path):
        return {"text": "", "message": "Файл не найден на диске", "document_id": doc_id}
    text = _run_tesseract(path)
    doc.ocr_text = text
    db.commit()
    db.refresh(doc)
    return {"text": text, "document_id": doc_id}
