"""FastAPI backend for БЮРО ЭКСПЕРТОВ."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base, SessionLocal
from models import Client, Deal, Document
from routers import clients, deals, documents

Base.metadata.create_all(bind=engine)


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
            for d in [
                {"client_name": "Иванов Иван Иванович", "stage": "Подписание договора", "sum_rub": 45000.0, "date": "2025-02-01"},
                {"client_name": 'ООО "Ромашка"', "stage": "Исполнение услуг", "sum_rub": 120000.0, "date": "2025-01-28"},
            ]:
                db.add(Deal(**d))
            db.commit()
    finally:
        db.close()


seed_if_empty()

app = FastAPI(title="БЮРО ЭКСПЕРТОВ API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(clients.router)
app.include_router(deals.router)
app.include_router(documents.router)


@app.get("/")
def root():
    return {"message": "БЮРО ЭКСПЕРТОВ API", "docs": "/docs"}


@app.get("/api/health")
def health():
    return {"status": "ok"}
