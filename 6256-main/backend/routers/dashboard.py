"""API for dashboard aggregated data."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Client, Communication

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/last-clients")
def get_last_clients(limit: int = 10, db: Session = Depends(get_db)):
    """Последние N клиентов с каналами связи (уникальные channel из communications)."""
    clients = db.query(Client).order_by(Client.id.desc()).limit(limit).all()
    result = []
    for c in clients:
        channels = (
            db.query(Communication.channel)
            .filter(Communication.client_id == c.id)
            .distinct()
            .all()
        )
        channel_list = [ch[0] for ch in channels]
        result.append({
            "id": c.id,
            "name": c.name,
            "phone": c.phone or None,
            "email": c.email or None,
            "status": c.status or "—",
            "channels": channel_list,
        })
    return result
