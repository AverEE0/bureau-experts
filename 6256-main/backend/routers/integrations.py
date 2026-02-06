"""Конфиг интеграций (заглушки: ФНС, ГАС, Росреестр, ОФД, ЭДО, 1С, банки, мессенджеры)."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel

from database import get_db
from models import IntegrationConfig
from schemas import IntegrationConfigResponse

router = APIRouter(prefix="/api/integrations", tags=["integrations"])

DEFAULT_KEYS = [
    "fns", "gas", "rosreestr", "ofd", "edo", "1c", "bank",
    "telegram", "max", "bip", "sms", "email", "webrtc",
]


class IntegrationUpdate(BaseModel):
    enabled: bool
    config_json: Optional[str] = None


@router.get("", response_model=List[IntegrationConfigResponse])
def list_integrations(db: Session = Depends(get_db)):
    items = db.query(IntegrationConfig).all()
    if not items:
        for key in DEFAULT_KEYS:
            db.add(IntegrationConfig(key=key, enabled=0))
        db.commit()
        items = db.query(IntegrationConfig).order_by(IntegrationConfig.key).all()
    return [IntegrationConfigResponse(id=i.id, key=i.key, enabled=bool(i.enabled), config_json=i.config_json, updated_at=i.updated_at) for i in items]


@router.patch("/{key}")
def update_integration(key: str, body: IntegrationUpdate, db: Session = Depends(get_db)):
    i = db.query(IntegrationConfig).filter(IntegrationConfig.key == key).first()
    if not i:
        i = IntegrationConfig(key=key, enabled=1 if body.enabled else 0, config_json=body.config_json)
        db.add(i)
    else:
        i.enabled = 1 if body.enabled else 0
        if body.config_json is not None:
            i.config_json = body.config_json
    db.commit()
    db.refresh(i)
    return {"key": i.key, "enabled": bool(i.enabled)}
