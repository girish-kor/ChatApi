# chatApi

[![Version](https://img.shields.io/badge/Version-4.0.0-0a58ca?style=for-the-badge&logo=semanticrelease&logoColor=white)](https://github.com/girish-kor/chatApi)
[![License](https://img.shields.io/badge/License-MIT-0a58ca?style=for-the-badge&logo=open-source-initiative&logoColor=white)](https://opensource.org/licenses/MIT)
[![Build](https://img.shields.io/badge/Build-Stable-157347?style=for-the-badge&logo=checkmarx&logoColor=white)](https://github.com/girish-kor/chatApi/actions)
[![Coverage](https://img.shields.io/badge/Coverage-95%25-157347?style=for-the-badge&logo=codecov&logoColor=white)](https://codecov.io/)
[![API Status](https://img.shields.io/badge/API-Online-a11d1d?style=for-the-badge&logo=vercel&logoColor=white)](https://chatapi-girish-kor.vercel.app)
[![Issues](https://img.shields.io/github/issues/girish-kor/chatApi?style=for-the-badge&logo=github&color=6f42c1)](https://github.com/girish-kor/chatApi/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/girish-kor/chatApi?style=for-the-badge&logo=github&color=6f42c1)](https://github.com/girish-kor/chatApi/pulls)
[![Last Commit](https://img.shields.io/github/last-commit/girish-kor/chatApi?style=for-the-badge&logo=git&color=157347)](https://github.com/girish-kor/chatApi/commits)

A scalable, real-time messaging and matchmaking platform built with Spring Boot, WebSocket (STOMP), WebRTC signaling, and MongoDB.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [WebSocket Integration](#websocket-integration)
- [Testing](#testing)
- [Monitoring](#monitoring)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time messaging with WebSocket/STOMP
- Intelligent matchmaking queue system
- WebRTC signaling for peer-to-peer connections
- Session management and persistence
- Comprehensive API for chat operations

## Technology Stack

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.5-6db33f?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java Version](https://img.shields.io/badge/Java-17-6db33f?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-a11d1d?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![MongoDB Atlas](https://img.shields.io/badge/Service-Atlas-a11d1d?style=for-the-badge\&logo=mongodb\&logoColor=white)](https://www.mongodb.com/cloud/atlas)
[![CI/CD](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-157347?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/girish-kor/chatApi/actions)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=white)](https://vercel.com)

## Installation

### Prerequisites

- Java 17+
- Maven 3.8+
- MongoDB (local instance or Atlas)
- Web browser with WebRTC support

### Quick Start

```bash
git clone https://github.com/girish-kor/chatApi.git
cd chatApi
mvn clean install
mvn spring-boot:run
```

## Configuration

### Required Properties

```properties
# Server configuration
server.port=8080

# MongoDB configuration
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# WebSocket configuration
websocket.enabled=true
```

### Environment Variables

```bash
export MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
export JWT_SECRET=your-secure-jwt-secret
export SERVER_PORT=8080
```

## Usage

```bash
# Start the application
mvn spring-boot:run
# or
java -jar target/chatApi-4.0.0.jar
```

Access at:
- API: `http://localhost:8080/api/...`
- WebSocket: `ws://localhost:8080/ws`

## API Documentation

### Chat Endpoints

| Method | Endpoint            | Description      | Auth  |
| ------ | ------------------- | ---------------- | ----- |
| POST   | `/api/chat`         | Send a message   | Token |
| GET    | `/api/chat/{id}`    | Get a message    | Token |
| GET    | `/api/chat/history` | Get chat history | Token |
| PUT    | `/api/chat/{id}`    | Edit message     | Token |
| DELETE | `/api/chat/{id}`    | Delete message   | Token |

### Queue Endpoints

| Method | Endpoint                 | Description            | Auth  |
| ------ | ------------------------ | ---------------------- | ----- |
| POST   | `/api/queue`             | Join matchmaking queue | Token |
| GET    | `/api/queue/{sessionId}` | Check queue status     | Token |
| GET    | `/api/queue`             | View all (admin only)  | Admin |
| PUT    | `/api/queue/{sessionId}` | Update queue entry     | Token |
| DELETE | `/api/queue/{sessionId}` | Leave queue            | Token |

### Session Endpoints

| Method | Endpoint             | Description                | Auth  |
| ------ | -------------------- | -------------------------- | ----- |
| POST   | `/api/sessions`      | Start a session            | Token |
| GET    | `/api/sessions/{id}` | Get session info           | Token |
| GET    | `/api/sessions`      | List sessions (admin only) | Admin |
| PUT    | `/api/sessions/{id}` | Modify session             | Token |
| DELETE | `/api/sessions/{id}` | End session                | Token |

## WebSocket Integration

### STOMP Endpoints

| Destination           | Description       | Payload          |
| --------------------- | ----------------- | ---------------- |
| `/session.message`    | Chat message      | ChatMessage      |
| `/session.signal`     | WebRTC signaling  | SignalingMessage |
| `/session.disconnect` | Leave session     | String           |
| `/queue.join`         | Enter matchmaking | String           |
| `/queue.leave`        | Exit matchmaking  | String           |

### Data Models

#### ChatMessage

```json
{
  "_id": "UUID",
  "fromSessionId": "String",
  "toSessionId": "String",
  "content": "String",
  "sentAt": "ISODate",
  "signature": "String"
}
```

#### QueueUser

```json
{
  "_id": "String",
  "sessionId": "String",
  "joinedAt": "ISODate",
  "matched": "Boolean",
  "weight": "Float"
}
```

#### ActiveSession

```json
{
  "_id": "UUID",
  "userSessionId1": "String",
  "userSessionId2": "String",
  "startedAt": "ISODate",
  "active": "Boolean"
}
```

## Testing

```bash
# Run all tests
mvn test

# Run with coverage report
mvn verify
```

## Monitoring

Spring Boot Actuator endpoints:

- `/actuator/health`
- `/actuator/metrics`
- `/actuator/loggers`

## Deployment

### Docker

```bash
# Build Docker image
docker build -t chatapi:latest .

# Run container
docker run -p 8080:8080 -e MONGODB_URI=<connection-string> chatapi:latest
```

### Vercel

- Production URL: https://chatapi-girish-kor.vercel.app

## Security

- JWT-based authentication
- Token validation for WebSocket handshake
- CORS configuration
- Rate limiting and input validation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Engineered with care using Spring Boot and WebSocket technology.*  
© 2025 Girish Kor | [MIT License](https://opensource.org/licenses/MIT)
