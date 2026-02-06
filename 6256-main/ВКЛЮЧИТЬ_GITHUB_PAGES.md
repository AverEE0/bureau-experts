# Включение GitHub Pages (чтобы сайт открывался, а не 404)

Если при открытии **https://averee0.github.io/bureau-experts/** вы видите **404 File not found**:

1. Откройте репозиторий: **https://github.com/AverEE0/bureau-experts**
2. Перейдите в **Settings** → **Pages** (в левом меню).
3. В блоке **Build and deployment**:
   - **Source:** выберите **GitHub Actions** (именно этот пункт, не "Deploy from a branch").
4. Сохранять ничего не нужно — источник уже выбран.

После этого при каждом push в **main** workflow сам соберёт проект и задеплоит его. Проверьте вкладку **Actions**: последний запуск должен завершиться зелёной галочкой.

Через 1–2 минуты после успешного деплоя сайт откроется по адресу:  
**https://averee0.github.io/bureau-experts/**
