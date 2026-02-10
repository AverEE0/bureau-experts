"""Auth: login, register (first user), current user (roles)."""
import hashlib
import uuid
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import Optional

from database import get_db
from models import User
from schemas import UserLogin, UserRegister, UserResponse, TokenResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])

# In-memory tokens for demo (в проде — Redis или JWT)
_tokens: dict = {}


def _hash(p: str) -> str:
    return hashlib.sha256(p.encode()).hexdigest()


@router.post("/register", response_model=TokenResponse)
def register(body: UserRegister, db: Session = Depends(get_db)):
    """Регистрация: если в БД 0 пользователей — создаётся админ; иначе новый пользователь с ролью manager."""
    if db.query(User).filter(User.email == body.email).first():
        raise HTTPException(status_code=400, detail="Пользователь с таким логином уже есть")
    first_user = db.query(User).count() == 0
    role = "admin" if first_user else "manager"
    u = User(
        email=body.email,
        password_hash=_hash(body.password),
        role=role,
        full_name=body.full_name or body.email,
        is_active=1,
    )
    db.add(u)
    db.commit()
    db.refresh(u)
    token = uuid.uuid4().hex
    _tokens[token] = u.id
    return TokenResponse(access_token=token, user=UserResponse.model_validate(u))


@router.get("/can-register")
def can_register(db: Session = Depends(get_db)):
    """Регистрация всегда доступна (новые пользователи получают роль manager, если уже есть пользователи)."""
    return {"can_register": True}


@router.post("/login", response_model=TokenResponse)
def login(body: UserLogin, db: Session = Depends(get_db)):
    u = db.query(User).filter(User.email == body.email).first()
    if not u:
        raise HTTPException(status_code=401, detail="Неверный email или пароль")
    if getattr(u, "is_active", 1) != 1:
        raise HTTPException(status_code=403, detail="Учётная запись заблокирована. Обратитесь к администратору.")
    if u.password_hash != _hash(body.password):
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
