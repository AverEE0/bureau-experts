# Как включить GitHub Pages (чтобы сайт открывался по ссылке)

Сейчас настроен деплой через **ветку gh-pages**. Сделайте три шага:

---

## Шаг 1. Запустить workflow вручную (один раз)

1. Откройте: **https://github.com/AverEE0/bureau-experts/actions**
2. Слева выберите workflow **"Build and deploy to gh-pages"**.
3. Справа нажмите **"Run workflow"** → **"Run workflow"**.
4. Подождите 1–2 минуты, пока зелёная галочка не появится (успех).

Так создастся ветка **gh-pages** с собранным сайтом.

---

## Шаг 2. Включить GitHub Pages в настройках

1. Откройте: **https://github.com/AverEE0/bureau-experts/settings/pages**
2. В блоке **"Build and deployment"**:
   - **Source:** выберите **"Deploy from a branch"**.
   - **Branch:** выберите **gh-pages** и папку **/ (root)**.
3. Нажмите **Save**.

---

## Шаг 3. Подождать 1–2 минуты

Через минуту сайт должен открыться по адресу:

**https://averee0.github.io/bureau-experts/**

Если по-прежнему 404 — подождите ещё 2–3 минуты или проверьте в **Settings → Pages**, что выбран источник **Deploy from a branch** и ветка **gh-pages**.

---

## Дальше

При каждом новом **push в main** workflow будет автоматически пересобирать сайт и обновлять ветку **gh-pages** — обновление отобразится на сайте через 1–2 минуты.
