# Booking Application - Microservices Implementation

A full-stack booking application using Java 17, Spring Boot, React, MongoDB, GraphQL, and gRPC.

## Architecture

- **Eureka Server** (8761): Service Discovery
- **User Service** (8081/9081): User management and authentication
- **Trip Service** (8082/9082): Trip management
- **Booking Service** (8083/9083): Multi-type booking system
- **Notification Service** (8084/9084): Notifications with geolocation
- **GraphQL Orchestrator** (8080): API Gateway
- **React UI** (3000): Frontend application

## Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+
- MongoDB 6+
- Docker & Docker Compose (optional)

## Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Option 2: Local Development

```bash
# 1. Start MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:6

# 2. Build all services
mvn clean install

# 3. Start Eureka Server
cd eureka-server && mvn spring-boot:run &

# 4. Start microservices
cd user-service && mvn spring-boot:run &
cd trip-service && mvn spring-boot:run &
cd booking-service && mvn spring-boot:run &
cd notification-service && mvn spring-boot:run &

# 5. Start GraphQL Orchestrator
cd graphql-orchestrator && mvn spring-boot:run &

# 6. Start React UI
cd booking-ui && npm install && npm start
```

## Access Points

- **React UI**: http://localhost:3000
- **GraphQL Playground**: http://localhost:8080/graphiql
- **Eureka Dashboard**: http://localhost:8761
- **User Service**: http://localhost:8081
- **Trip Service**: http://localhost:8082
- **Booking Service**: http://localhost:8083
- **Notification Service**: http://localhost:8084

## Features

- User registration and JWT authentication
- Trip creation and management
- Multi-type bookings (Hotel, Flight, Activity)
- Real-time notifications with IP geolocation
- Service discovery with Eureka
- GraphQL API for efficient data fetching
- gRPC for inter-service communication

## Project Structure

```
booking-application/
├── common-lib/              # Shared utilities and DTOs
├── eureka-server/           # Service discovery
├── user-service/            # User management
├── trip-service/            # Trip management
├── booking-service/         # Booking management
├── notification-service/    # Notification handling
├── graphql-orchestrator/    # API Gateway
├── booking-ui/              # React frontend
├── docker-compose.yml       # Docker setup
└── pom.xml                  # Parent POM
```

## API Examples

### Register User
```bash
curl -X POST http://localhost:8081/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:8081/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### GraphQL Query
```graphql
query {
  trips(userId: "user-id-here") {
    tripId
    destination
    startDate
    endDate
    bookings {
      bookingId
      bookingType
      providerName
    }
  }
}
```

## Documentation

See the `/docs` directory for:
- Architecture diagrams
- API specifications
- Development guides
- Deployment instructions

## License

MIT License
