# ToDo App (Node.js + TypeScript / React + PostgreSQL with Docker)

A minimal, full‑stack ToDo application designed for local development **and** containerised deployment.\
Features:

- Add & list ToDo items (no login/auth yet)
- API written in TypeScript (Express)
- UI built with React + TypeScript (CRA template)
- Data persisted in PostgreSQL
- One‑command spin‑up with **Docker Compose**

---

## 📁 Project structure

```text
.
├── backend/           # Node.js + TS API
│   ├── src/
│   ├── Dockerfile
│   └── …
├── frontend/          # React app
│   ├── src/
│   ├── Dockerfile
│   └── …
├── db/
│   └── init.sql       # DB schema
├── docker-compose.yml
└── postgres_data/     # Named volume (created on first run)
```

---

## 🖥 Prerequisites

| Tool                        | Dev version tested |
| --------------------------- | ------------------ |
| **Docker Engine / Desktop** | 25.0+              |
| **Docker Compose**          | v2.x               |
| **Node.js** (optional\*)    | 18 LTS             |

> *You only need Node.js locally if you choose the hybrid workflow (running code outside of containers).*

---

## 🚀 Quick start (full Docker)

```bash
# 1 – Build & start all services in detached mode
$ docker compose up -d --build

# 2 – Watch logs (optional)
$ docker compose logs -f
```

| Service  | URL                                                        |
| -------- | ---------------------------------------------------------- |
| Frontend | [http://localhost:3000](http://localhost:3000)             |
| API      | [http://localhost:5000/todos](http://localhost:5000/todos) |
| DB       | `localhost:5432` (user: `postgres`, pass: `password`)      |

Stop everything:

```bash
$ docker compose down         # removes containers but keeps DB data
$ docker compose down -v      # removes containers **and** DB volume
```

---

## ⚡ Hybrid workflow (faster local dev)

```bash
# Start DB only
$ docker compose up -d db

# In another terminal – backend hot‑reload
$ cd backend && npm install && npm run dev

# In another terminal – frontend hot‑reload
$ cd frontend && npm install && npm start
```

### Proxy set‑up (optional)

Add to `frontend/package.json` so CORS isn’t an issue:

```json
"proxy": "http://localhost:5000"
```

---

## 🔑 Environment variables

| Variable       | Default                                        | Description                         |
| -------------- | ---------------------------------------------- | ----------------------------------- |
| `DATABASE_URL` | `postgres://postgres:password@db:5432/todoapp` | Connection string for API container |
| `PORT`         | `5000`                                         | API port (inside container)         |
| `HOST`         | `0.0.0.0`                                      | Dev‑server bind address (frontend)  |

> In production, create a `.env` file at project root or supply `docker compose --env-file`.

---

## 💻 Key npm scripts

### Backend (`backend/package.json`)

| Script          | Action                                            |
| --------------- | ------------------------------------------------- |
| `npm run dev`   | Starts API with **ts-node-dev** (watch + restart) |
| `npm run build` | Compiles TypeScript to `dist/`                    |
| `npm start`     | Runs compiled JS (used in production image)       |

### Frontend (`frontend/package.json`)

| Script          | Action                         |
| --------------- | ------------------------------ |
| `npm start`     | CRA dev server with HMR        |
| `npm run build` | Production build into `build/` |

---

## 🐳 Docker images (dev vs prod)

| Stage                 | Tag                                                       | Notes                                                 |
| --------------------- | --------------------------------------------------------- | ----------------------------------------------------- |
| Development           | `todoapps-frontend-1`, `todoapps-backend-1`               | Installs devDependencies + mounts source (hot‑reload) |
| Production (optional) | Build with `docker build -f backend/Dockerfile.prod` etc. | Copy static assets to nginx / compile TS to JS        |

---

## 🛠 Troubleshooting

| Issue                                    | Checks                                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------------------------- |
| *Port 3000/5000 already in use*          | `lsof -i:3000` and kill, or change host port in compose.                               |
| *EAI\_AGAIN db*                          | API running outside Compose – use `localhost` or start API in container.               |
| *Permission denied /var/run/docker.sock* | Add user to `docker` group: `sudo usermod -aG docker $USER` → restart shell.           |
| *White screen*                           | Open DevTools console; ensure `frontend` container logs show `Compiled successfully!`. |

---

## 📜 License

MIT © 2025   Your Name

