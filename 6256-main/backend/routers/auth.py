"""Auth: login and current user (roles)."""
import hashlib
import uuid
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import Optional

from database import get_db
from models import User
from schemas import UserLogin, UserResponse, TokenResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])

# In-memory tokens for demo (в проде — Redis или JWT)
_tokens: dict = {}


def _hash(p: str) -> str:
    return hashlib.sha256(p.encode()).hexdigest()


@router.post("/login", response_model=TokenResponse)
def login(body: UserLogin, db: Session = Depends(get_db)):
    u = db.query(User).filter(User.email == body.email, User.is_active == 1).first()
    if not u or u.password_hash != _hash(body.password):
        raise HTTPException(status_code=401, detail="Неверный email или пароль")
    token = uuid.uuid4().hex
    _tokens[token] = u.id
    return TokenResponse(access_token=token, user=UserResponse.model_validate(u))


@router.post("/logout")
def logout(token: str):
    _tokens.pop(token, None)
    return {"ok": True}


def get_current_user_id(token: Optional[str]) -> Optional[int]:
    if not token:
        return None
    return _tokens.get(token)


async def get_optional_user(
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    """Authorization: Bearer <token>."""
    token = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization[7:]
    uid = get_current_user_id(token)
    if not uid:
        return None
    return db.query(User).filter(User.id == uid).first()


@router.get("/me", response_model=Optional[UserResponse])
def me(user: Optional[User] = Depends(get_optional_user)):
    return UserResponse.model_validate(user) if user else None
