"""API for clients."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional

from database import get_db
from models import Client, Deal, Document, Communication
from schemas import ClientCreate, ClientUpdate, ClientResponse, ClientCardResponse, DealResponse, DocumentResponse, CommunicationResponse

router = APIRouter(prefix="/api/clients", tags=["clients"])


@router.get("", response_model=List[ClientResponse])
def list_clients(
    search: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
):
    q = db.query(Client)
    if search:
        q = q.filter(
            or_(
                Client.name.ilike(f"%{search}%"),
                Client.inn.ilike(f"%{search}%"),
                Client.phone.ilike(f"%{search}%"),
            )
        )
    if status:
        q = q.filter(Client.status == status)
    return q.order_by(Client.id.desc()).all()


@router.post("", response_model=ClientResponse)
def create_client(body: ClientCreate, db: Session = Depends(get_db)):
    c = Client(**body.model_dump())
    db.add(c)
    db.commit()
    db.refresh(c)
    return c


@router.get("/{client_id}", response_model=ClientResponse)
def get_client(client_id: int, db: Session = Depends(get_db)):
    c = db.query(Client).filter(Client.id == client_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Клиент не найден")
    return c


@router.get("/{client_id}/card", response_model=ClientCardResponse)
def get_client_card(client_id: int, db: Session = Depends(get_db)):
    c = db.query(Client).filter(Client.id == client_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Клиент не найден")
    deals = db.query(Deal).filter(Deal.client_id == client_id).order_by(Deal.id.desc()).all()
    documents = db.query(Document).filter(Document.client_id == client_id).order_by(Document.id.desc()).all()
    communications = db.query(Communication).filter(Communication.client_id == client_id).order_by(Communication.created_at.desc()).all()
    return ClientCardResponse(
        **ClientResponse.model_validate(c).model_dump(),
        deals=[DealResponse.model_validate(d) for d in deals],
        documents=[DocumentResponse.model_validate(d) for d in documents],
        communications=[CommunicationResponse.model_validate(x) for x in communications],
    )


@router.patch("/{client_id}", response_model=ClientResponse)
def update_client(client_id: int, body: ClientUpdate, db: Session = Depends(get_db)):
    c = db.query(Client).filter(Client.id == client_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Клиент не найден")
    for k, v in body.model_dump(exclude_unset=True).items():
        setattr(c, k, v)
    db.commit()
    db.refresh(c)
    return c


@router.delete("/{client_id}", status_code=204)
def delete_client(client_id: int, db: Session = Depends(get_db)):
    c = db.query(Client).filter(Client.id == client_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Клиент не найден")
    db.delete(c)
    db.commit()
    return None
