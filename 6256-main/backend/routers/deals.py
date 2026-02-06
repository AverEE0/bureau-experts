"""API for deals."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
from models import Deal
from schemas import DealCreate, DealUpdate, DealResponse

router = APIRouter(prefix="/api/deals", tags=["deals"])


@router.get("", response_model=List[DealResponse])
def list_deals(
    stage: Optional[str] = None,
    db: Session = Depends(get_db),
):
    q = db.query(Deal)
    if stage:
        q = q.filter(Deal.stage == stage)
    return q.order_by(Deal.id.desc()).all()


@router.post("", response_model=DealResponse)
def create_deal(body: DealCreate, db: Session = Depends(get_db)):
    d = Deal(**body.model_dump())
    db.add(d)
    db.commit()
    db.refresh(d)
    return d


@router.get("/{deal_id}", response_model=DealResponse)
def get_deal(deal_id: int, db: Session = Depends(get_db)):
    d = db.query(Deal).filter(Deal.id == deal_id).first()
    if not d:
        raise HTTPException(status_code=404, detail="Сделка не найдена")
    return d


@router.patch("/{deal_id}", response_model=DealResponse)
def update_deal(deal_id: int, body: DealUpdate, db: Session = Depends(get_db)):
    d = db.query(Deal).filter(Deal.id == deal_id).first()
    if not d:
        raise HTTPException(status_code=404, detail="Сделка не найдена")
    for k, v in body.model_dump(exclude_unset=True).items():
        setattr(d, k, v)
    db.commit()
    db.refresh(d)
    return d


@router.delete("/{deal_id}", status_code=204)
def delete_deal(deal_id: int, db: Session = Depends(get_db)):
    d = db.query(Deal).filter(Deal.id == deal_id).first()
    if not d:
        raise HTTPException(status_code=404, detail="Сделка не найдена")
    db.delete(d)
    db.commit()
    return None
