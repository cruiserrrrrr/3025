# url checker

сервис асинхронной проверки ссылок. бэкенд — nestjs, фронтенд — next.js.

## запуск через docker

```bash
docker compose up --build
```

открыть http://localhost:3000 (бэкенд на http://localhost:3001/api).

## запуск вручную

бэкенд:

```bash
cd backend
npm install
npm run start:dev
```

фронтенд (в другом терминале):

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

открыть http://localhost:3000.

порты 3000 и 3001 должны быть свободны.
