![CI](https://github.com/kumar10248/infra-lab/actions/workflows/ci.yml/badge.svg)
# 🚀 Infra Lab

A production-like containerized platform built to learn backend infrastructure, scalability, caching, and observability.

![Node.js](https://img.shields.io/badge/Node.js-20-green)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)
![Nginx](https://img.shields.io/badge/Nginx-Reverse%20Proxy-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue)
![Redis](https://img.shields.io/badge/Redis-Cache-red)
![Prometheus](https://img.shields.io/badge/Prometheus-Monitoring-orange)
![Grafana](https://img.shields.io/badge/Grafana-Dashboard-orange)

## ✨ Features

* 🐳 Docker Compose based multi-container architecture
* 🌐 Nginx Reverse Proxy
* ⚡ Horizontally Scaled Node.js APIs
* 🐘 PostgreSQL persistence with Docker volumes
* 🔥 Redis caching layer
* ❤️ Health Check endpoint
* 📊 Prometheus metrics collection
* 📈 Grafana dashboards for observability
* 🔄 Round-robin load balancing and service discovery

---

## 🏗️ Architecture

![alt text](architecture.png)
---

## Endpoints

## 🌐 API Endpoints

```http
GET /api/health
GET /api/users
GET /api/metrics
```

---

## Monitoring Metrics

* Requests per second (RPS)
* CPU Usage
* Memory Usage
* Event Loop Lag
* Database Connectivity Status

---

## Tech Stack

* Node.js
* Docker & Docker Compose
* Nginx
* PostgreSQL
* Redis
* Prometheus
* Grafana
* Linux

---

## Learning Outcomes

* Container Networking
* Service Discovery
* Reverse Proxy Configuration
* Horizontal Scaling
* Caching Strategies
* Database Persistence
* Observability & Monitoring
* Production Debugging
* CI Automation using GitHub Actions

---
## 🚀 Getting Started

git clone https://github.com/kumar10248/infra-lab.git
cd infra-lab
docker compose up -d

## Demo

See screenshots and demo GIF below.

## 📸 Screenshots

### Grafana Dashboard

![alt text](Screenshot_20260620_125015.png)
### Prometheus Targets

![alt text](Screenshot_20260620_113743.png)

### Load Balancing Demo

![alt text](Screenshot_20260618_050608.png)

### Redis Cache Demo
![alt text](Screenshot_20260620_233143.png) 

* Database → Redis → Cache Hit workflow


Built for learning real-world backend infrastructure and DevOps concepts.

## Demo Video Clip

🎥 Demo Video: [Watch Here](./arch.mp4)
