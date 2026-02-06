"""API for client communications (log for card)."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import Communication
from schemas import CommunicationCreate, CommunicationResponse

router = APIRouter(prefix="/api/communications", tags=["communications"])


@router.get("", response_model=List[CommunicationResponse])
def list_communications(client_id: int, db: Session = Depends(get_db)):
    return db.query(Communication).filter(Communication.client_id == client_id).order_by(Communication.created_at.desc()).all()


@router.post("", response_model=CommunicationResponse)
def create_communication(body: CommunicationCreate, db: Session = Depends(get_db)):
    c = Communication(**body.model_dump())
    db.add(c)
    db.commit()
    db.refresh(c)
    return c


@router.get("/{comm_id}", response_model=CommunicationResponse)
def get_communication(comm_id: int, db: Session = Depends(get_db)):
    c = db.query(Communication).filter(Communication.id == comm_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Запись не найдена")
    return c
