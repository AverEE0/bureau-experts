"""API for documents (upload and list)."""
import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
from models import Document
from schemas import DocumentResponse

router = APIRouter(prefix="/api/documents", tags=["documents"])

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.get("", response_model=List[DocumentResponse])
def list_documents(db: Session = Depends(get_db)):
    return db.query(Document).order_by(Document.id.desc()).all()


@router.post("", response_model=DocumentResponse)
async def upload_document(
    file: UploadFile = File(...),
    doc_type: Optional[str] = Form("Договор"),
    note: Optional[str] = Form(None),
    db: Session = Depends(get_db),
):
    ext = os.path.splitext(file.filename or "")[-1] or ".bin"
    safe_name = f"{uuid.uuid4().hex}{ext}"
    path = os.path.join(UPLOAD_DIR, safe_name)
    with open(path, "wb") as f:
        content = await file.read()
        f.write(content)
    name = file.filename or safe_name
    doc = Document(name=name, doc_type=doc_type, file_path=safe_name, note=note)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc


@router.get("/{doc_id}", response_model=DocumentResponse)
def get_document(doc_id: int, db: Session = Depends(get_db)):
    d = db.query(Document).filter(Document.id == doc_id).first()
    if not d:
        raise HTTPException(status_code=404, detail="Документ не найден")
    return d


@router.delete("/{doc_id}", status_code=204)
def delete_document(doc_id: int, db: Session = Depends(get_db)):
    d = db.query(Document).filter(Document.id == doc_id).first()
    if not d:
        raise HTTPException(status_code=404, detail="Документ не найден")
    if d.file_path and os.path.exists(os.path.join(UPLOAD_DIR, d.file_path)):
        try:
            os.remove(os.path.join(UPLOAD_DIR, d.file_path))
        except OSError:
            pass
    db.delete(d)
    db.commit()
    return None
