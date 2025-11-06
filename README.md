# Digma

This project is a **modern full-stack setup** designed for scalable web and mobile applications with **TypeScript**, **Jest testing**, and **Swagger documentation**.

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) ([Install Guide](https://docs.docker.com/desktop/install/)) – for Windows/Mac
- [Docker Engine](https://docs.docker.com/engine/install/) – for Linux
- [Node.js](https://nodejs.org/) ([Download](https://nodejs.org/en/download/)) – for local dev (optional)
- [VS Code](https://code.visualstudio.com/) ([Download](https://code.visualstudio.com/download)) – recommended editor

## Tech Stack

- 🌐 **Frontend (React)** — Public website and client portal
- 🧑‍💼 **Admin Panel (React)** — Data and user management
- ⚙️ **API Backend (Node.js/Express + TypeScript)** — REST API with GraphQL
- 🧪 **Testing (Jest)** — Comprehensive test suite with MongoDB Memory Server
- � **Documentation (Swagger/OpenAPI)** — Interactive API documentation
- 🔐 **Authentication (JWT + RBAC)** — Secure multi-tenant authentication
- 🐍 **Python Jobs** — Background jobs for Meta & Google APIs
- 📱 **Flutter App** — Mobile application
- 🐳 **Docker Compose** — Containerized development and deployment

## API Backend Features

The API backend is built with **TypeScript** and includes comprehensive testing and documentation:

### 🚀 **Development**
```bash
cd api
npm install          # Install dependencies
npm run dev         # Start development server with hot reload
npm run build       # Build TypeScript to JavaScript
npm start           # Start production server
```

### 🧪 **Testing**
```bash
npm test            # Run all Jest tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### 📚 **API Documentation**
- **Swagger UI**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- **GraphQL Playground**: [http://localhost:5000/graphql](http://localhost:5000/graphql)
- **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

### 🔐 **Authentication & Security**
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Multi-tenant architecture
- Password hashing with bcrypt

### 📋 **API Endpoints**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `GET /api/users` - List users (admin only)
- `GET /api/campaigns` - Campaign management
- `GET /api/billing` - Billing & subscriptions

## Local App Links

- [Frontend (React) – http://localhost:3000](http://localhost:3000)
- [Admin (CoreUI) – http://localhost:3001](http://localhost:3001)
- [API Swagger Docs – http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- [GraphQL Playground – http://localhost:5000/graphql](http://localhost:5000/graphql)

## Useful Commands

### Docker Commands
- Rebuild and start a single service (e.g., API):
  ```sh
  docker-compose up -d --build api
  ```
- View logs for all services:
  ```sh
  docker-compose logs -f
  ```
- Stop all services:
  ```sh
  docker-compose down
  ```

### Local Development (API)
- Run API locally (outside Docker):
  ```sh
  cd api && npm install && npm run dev
  ```
- Run tests:
  ```sh
  cd api && npm test
  ```
- Build TypeScript:
  ```sh
  cd api && npm run build
  ```

### Other Services
- Run Python jobs locally:
  ```sh
  cd python-jobs && pip install -r requirements.txt && python scheduler.py
  ```
