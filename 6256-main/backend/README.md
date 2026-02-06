# Бэкенд БЮРО ЭКСПЕРТОВ

FastAPI + SQLite. API для клиентов, сделок и документов.

## Установка и запуск

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
# или: source venv/bin/activate  # Linux/macOS
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API: http://localhost:8000  
Документация: http://localhost:8000/docs

## Эндпоинты

- `GET/POST /api/clients` — список и создание клиентов
- `GET/PATCH/DELETE /api/clients/{id}` — клиент по id
- `GET/POST /api/deals` — сделки
- `GET/POST /api/documents` — документы (POST — загрузка файла)
- `GET /api/health` — проверка работы

БД SQLite создаётся в `backend/bureau.db`. При первом запуске добавляются тестовые клиенты и сделки.
