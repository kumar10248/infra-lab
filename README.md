# Infra Lab

A mini production-like infrastructure setup built using Docker, Docker Compose, Nginx, Node.js, and PostgreSQL.

## Architecture

```text
Client (Kali)
      │
      ▼
   Nginx Proxy
      │
      ├── /api   → Node.js API (3 Replicas)
      └── /admin → Admin Service
                      │
                      ▼
                PostgreSQL
                      │
                      ▼
              Docker Volume (Persistent Storage)
```

## Features

* Containerized Node.js services using Docker
* Multi-container orchestration with Docker Compose
* Nginx reverse proxy configuration
* Path-based routing:

  * `/api` → API Service
  * `/admin` → Admin Service
* PostgreSQL integration with Node.js API
* Persistent database storage using Docker Volumes
* Horizontal scaling of API containers
* Round-Robin Load Balancing with Nginx
* Docker Service Discovery using service names instead of hardcoded IPs
* Basic High Availability demonstration

## Tech Stack

* Docker
* Docker Compose
* Nginx
* Node.js
* PostgreSQL
* Linux

## Project Structure

```text
infra-lab/
├── api-server/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── admin-server/
│   ├── Dockerfile
│   └── server.js
├── nginx/
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
cd infra-lab
```

### Start Services

```bash
docker compose up -d --build
```

### Scale API Replicas

```bash
docker compose up -d --scale api=3
```

### Verify Running Containers

```bash
docker compose ps
```

## API Endpoints

### API Service

```bash
curl http://localhost/api/users
```

Example Response:

```json
{
  "container": "e98af7c07323",
  "users": [
    {
      "id": 1,
      "name": "Kumar Devashish"
    }
  ]
}
```

### Admin Service

```bash
curl http://localhost/admin
```

## Database Persistence Demo

Create data:

```sql
INSERT INTO users(name)
VALUES ('Kumar Devashish');
```

Stop and restart:

```bash
docker compose down
docker compose up -d
```

Data remains available because PostgreSQL uses a Docker Volume for persistent storage.

## Key Learnings

* Docker Networking
* Reverse Proxy Configuration
* Service Discovery
* Container Scaling
* Load Balancing
* Persistent Storage
* Debugging with Logs and Container Inspection
* Multi-container Application Architecture

---

Built as a hands-on infrastructure lab to understand how modern containerized applications communicate, scale, and persist data in production-like environments.
