# Включение GitHub Pages (чтобы сайт открывался, а не 404)

Если при открытии **https://averee0.github.io/bureau-experts/** вы видите **404 File not found**:

1. Откройте репозиторий на GitHub: **https://github.com/AverEE0/bureau-experts**
2. Перейдите в **Settings** → **Pages** (в левом меню).
3. В блоке **Build and deployment**:
   - **Source:** выберите **Deploy from a branch** (не "GitHub Actions" для источника — сам деплой уже через Actions).
   - **Branch:** выберите **gh-pages** (не main).
   - **Folder:** выберите **/ (root)**.
4. Нажмите **Save**.

Через 1–2 минуты сайт должен открываться по адресу:  
**https://averee0.github.io/bureau-experts/**

Важно: ветка **main** содержит только исходный код (папки 6256-main, .github и т.д.), в ней нет `index.html` в корне. Собранный сайт публикуется в ветку **gh-pages** workflow’ом при каждом push в main.
