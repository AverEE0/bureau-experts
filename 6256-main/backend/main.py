"""FastAPI backend for БЮРО ЭКСПЕРТОВ."""
import hashlib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base, SessionLocal, _ensure_document_columns, _ensure_deal_columns
from models import Client, Deal, Document, Communication, User, IntegrationConfig
from routers import clients, deals, documents, communications, auth, fns, ocr, generate, archive, integrations, signatures, dashboard

Base.metadata.create_all(bind=engine)
try:
    _ensure_document_columns()
except Exception:
    pass
try:
    _ensure_deal_columns()
except Exception:
    pass


def _hash(p: str) -> str:
    return hashlib.sha256(p.encode()).hexdigest()


def seed_if_empty():
    db = SessionLocal()
    try:
        if db.query(Client).count() == 0:
            for c in [
                {"name": "Иванов Иван Иванович", "type": "Физ. лицо", "inn": "770512345678", "phone": "+7 (900) 111-22-33", "email": "ivanov@example.ru", "status": "Активный", "segment": "VIP", "manager": "Петрова Н.В."},
                {"name": 'ООО "Ромашка"', "type": "Юр. лицо", "inn": "7708123456", "phone": "+7 (900) 222-33-44", "email": "info@romashka.ru", "status": "Новый", "segment": "Корпоративный", "manager": "Иванов С.А."},
                {"name": "Петров Петр Петрович", "type": "Физ. лицо", "inn": "781012345678", "phone": "+7 (900) 333-44-55", "email": "petrov@example.ru", "status": "В работе", "segment": "Частный", "manager": "Сидорова Л.М."},
            ]:
                db.add(Client(**c))
            db.commit()
        if db.query(Deal).count() == 0:
            clients = {c.name: c.id for c in db.query(Client).all()}
            for d in [
                {"client_name": "Иванов Иван Иванович", "stage": "В работе", "sum_rub": 45000.0, "date": "2025-02-01", "client_id": clients.get("Иванов Иван Иванович")},
                {"client_name": 'ООО "Ромашка"', "stage": "Акт", "sum_rub": 120000.0, "date": "2025-01-28", "client_id": clients.get('ООО "Ромашка"')},
            ]:
                db.add(Deal(**d))
            db.commit()
        if db.query(User).count() == 0:
            db.add(User(email="admin@bureau.ru", password_hash=_hash("admin"), role="admin", full_name="Администратор"))
            db.add(User(email="manager@bureau.ru", password_hash=_hash("manager"), role="manager", full_name="Менеджер"))
            db.commit()
    finally:
        db.close()


seed_if_empty()

app = FastAPI(title="БЮРО ЭКСПЕРТОВ API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "https://averee0.github.io",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(clients.router)
app.include_router(deals.router)
app.include_router(documents.router)
app.include_router(communications.router)
app.include_router(auth.router)
app.include_router(fns.router)
app.include_router(ocr.router)
app.include_router(generate.router)
app.include_router(archive.router)
app.include_router(integrations.router)
app.include_router(signatures.router)
app.include_router(dashboard.router)


@app.get("/")
def root():
    return {"message": "БЮРО ЭКСПЕРТОВ API", "docs": "/docs"}


@app.get("/api/health")
def health():
    return {"status": "ok"}
