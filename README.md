# Digma


This project is a **modern full-stack setup** designed for scalable web and mobile applications.


## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) ([Install Guide](https://docs.docker.com/desktop/install/)) – for Windows/Mac
- [Docker Engine](https://docs.docker.com/engine/install/) – for Linux
- [Node.js](https://nodejs.org/) ([Download](https://nodejs.org/en/download/)) – for local dev (optional)
- [VS Code](https://code.visualstudio.com/) ([Download](https://code.visualstudio.com/download)) – recommended editor

## First-Time Setup

1. **Clone the repo:**
	```sh
	git clone git@e2e-git:E2ETechnology/digma_master.git
	cd digma_master
	```
2. **Start all services with Docker Compose:**
	```sh
	docker-compose up -d --build
	```
3. **Check logs (optional):**
	```sh
	docker-compose logs -f
	```
4. **Access the apps:**
	- [Frontend (React)](http://localhost:3000)
	- [Admin (CoreUI)](http://localhost:3001)

## Useful Commands

- Rebuild and start a single service (e.g., API):
  ```sh
  docker-compose up -d --build api
  ```
- Run a service locally (outside Docker):
  ```sh
  cd api && npm install && npm run start
  cd python-jobs && pip install -r requirements.txt && python scheduler.py
  ```

It includes:
- 🌐 **Frontend (React)** — for the public website and client portal  
- 🧑‍💼 **Admin Panel (React)** — for managing data and users  
- ⚙️ **API Backend (Node.js/Express)** — shared between web and Flutter app  
- 🐍 **Python Jobs** — cron jobs to fetch data from Meta & Google APIs  
- 📱 **Flutter App** — the main mobile application  
- 🐳 **Docker Compose** — for containerized development and deployment  


## Local App Links

- [Frontend (React) – http://localhost:3000](http://localhost:3000)
- [Admin (CoreUI) – http://localhost:3001](http://localhost:3001)
