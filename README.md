# Calculator Microservice
# 🧮 Calculator Microservice

A simple Node.js-based calculator microservice with logging using Winston, Dockerized for deployment.

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/sit737-2025-prac4p.git
cd sit737-2025-prac4p

```
2️⃣Install Dependencies:
```sh
npm install
```
3️⃣ Run Locally (Without Docker):
```sh
node server.js
```

🐳 Docker Instructions
4️⃣Build the Docker Image:
```sh
docker build -t rayudu1889/calculator-microservice:latest .
```
5️⃣ Run the Docker Container           
```sh
docker run -p 3000:3000 --name calculator -d rayudu1889/calculator-microservice:latest
```
Now, visit http://localhost:3000/operations

📝 Docker Compose (Recommended):
6️⃣ Run with Docker Compose:
```sh
docker-compose up --build
```
7️⃣ Stop the Containers
```sh
docker-compose down
```
Pushing Docker Image to Docker Hub
```sh
docker login
docker tag rayudu1889/calculator-microservice:latest rayudu1889/calculator-microservice:latest
docker push rayudu1889/calculator-microservice:latest
```
Health Check:
```sh
version: '3.8'

services:
  calculator:
    image: rayudu1889/calculator-microservice:latest
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/operations"]
      interval: 30s
      timeout: 10s
      retries: 3
```
