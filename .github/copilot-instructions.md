## Project layout (short)
project-root/
├── frontend/        # React public site & client
├── admin/           # React admin dashboard (CoreUI)
├── api/             # Node.js/Express backend (routes/controllers/models)
├── python-jobs/     # Python background jobs (meta/google)
├── flutter-app/     # Flutter mobile app
├── docker-compose.yml
├── .env
└── README.md

## Quick dev commands (PowerShell)
Start everything:

```powershell
docker-compose up -d --build
```

Follow logs:

```powershell
docker-compose logs -f
```

Start a single service (rebuild):

```powershell
docker-compose up -d --build api
```

Run locally from a service folder (if you prefer):

```powershell
cd api; npm install; npm run start
cd python-jobs; pip install -r requirements.txt; python scheduler.py
```

## Copilot prompts & guidance (use these directly)

Project structure & ports:

- Frontend (React) → port 3000
- Admin (React/CoreUI) → port 3001
- API (Node/Express) → port 5000
- Postgres → port 5432

Useful prompts (copy/paste):

Frontend (React)
```
# Add routes for public, login, and client dashboard pages
# Create a React context for authentication
# Fetch data from the API using Axios and display in dashboard
```

Admin (CoreUI)
```
# Generate a sidebar navigation with routes for Users, Reports, Settings
# Create a data table component with pagination and search
# Add form for creating new users connected to the API
```

API (Node.js/Express)
```
# Create CRUD routes for users
# Add JWT-based authentication middleware
# Connect Express to PostgreSQL using Prisma or Sequelize
# Add route for Flutter to fetch user dashboard data
```

Python Jobs
```
# Implement cron job to fetch campaign metrics from Meta API
# Schedule job to run every 15 minutes
# Log all job results to PostgreSQL via API endpoint
```

Flutter App
```
# Add login screen connected to API
# Fetch user data and show in dashboard
# Implement offline caching using Hive
```

## Where to make changes (examples)

- Web apps: `frontend/` and `admin/` — React sources live under each `src/` folder. Add pages under `src/pages/` and wire routes in `src/App.*`.
- API: `api/src/` — look for `app.js`, `routes/`, `controllers/`, `models/`, `middlewares/`, and `config/`.
  - When adding an endpoint: add `api/src/routes/<name>.js`, implement `api/src/controllers/<name>Controller.js`, and mount in `api/src/app.js`.
- Python jobs: `python-jobs/` — use `scheduler.py` to compose `meta_jobs.py` and `google_jobs.py`.

## Environment & integration points

- Root `.env` contains `POSTGRES_*` and `PORT`. Each service may have its own `.env`.
- Python jobs rely on Meta & Google credentials via env vars; prefer calling the API to persist results (keep jobs idempotent).

## If something isn't discoverable

- Check service folders for `package.json`, `requirements.txt`, and `Dockerfile`.
- If tests or lint configs are needed, inspect `package.json` scripts for `test`/`lint` entries.

---
If you want a separate markup file (full structure + Copilot prompts) I added `copilot-markup.md` at the repo root — review and tell me if you'd like specific examples (e.g., JWT middleware snippet, sample route+controller patch, or a Dockerfile per service).
