# Quick Start Guide

Get the booking application running in 5 minutes!

## Prerequisites

Choose one of these options:

### Option 1: Docker (Recommended)
- Docker Desktop
- 8GB RAM minimum
- 10GB disk space

### Option 2: Local Development
- Java 17+
- Maven 3.8+
- Node.js 18+
- MongoDB 6+

## Quick Start with Docker

```bash
# 1. Navigate to project directory
cd /Users/A-203315/booking-application

# 2. Build and start all services
docker-compose up -d

# 3. Wait for services to start (2-3 minutes)
docker-compose logs -f

# 4. Access the application
open http://localhost:3000
```

That's it! The application is now running.

## Quick Start - Local Development

```bash
# 1. Start MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:6

# 2. Build all services
./build-all.sh

# 3. Start all services
./run-all.sh

# 4. Access the application
open http://localhost:3000
```

## Access Points

Once running, access these URLs:

| Service | URL | Description |
|---------|-----|-------------|
| **React UI** | http://localhost:3000 | Main application |
| **GraphQL Playground** | http://localhost:8080/graphiql | API testing |
| **Eureka Dashboard** | http://localhost:8761 | Service registry |

## Test the Application

### 1. Create an Account
1. Open http://localhost:3000
2. Click "Sign Up"
3. Fill in the form:
   - Email: test@example.com
   - Password: password123
   - First Name: John
   - Last Name: Doe
4. Click "Sign Up"

### 2. Login
1. Enter credentials
2. Click "Login"
3. You'll be redirected to the dashboard

### 3. Create a Trip
1. Click "Trips" in navigation
2. Click "Create Trip" button
3. Fill in trip details:
   - Destination: Paris, France
   - Start Date: 2026-06-01
   - End Date: 2026-06-10
   - Description: Summer vacation
4. Click "Create Trip"

### 4. Add a Booking
1. Click on the trip you just created
2. Click "Add Booking"
3. Select booking type (Hotel/Flight/Activity)
4. Fill in details
5. Click "Create Booking"

### 5. View Notifications
1. Click the bell icon in the top-right
2. See the notification for your booking
3. Click to mark as read

## Test with API

### Register User (cURL)
```bash
curl -X POST http://localhost:8081/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login (cURL)
```bash
curl -X POST http://localhost:8081/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### GraphQL Query
```bash
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "query": "query { me { userId email firstName lastName } }"
  }'
```

## Verify Services

### Check Eureka Dashboard
1. Open http://localhost:8761
2. You should see all services registered:
   - USER-SERVICE
   - TRIP-SERVICE
   - BOOKING-SERVICE
   - NOTIFICATION-SERVICE
   - GRAPHQL-ORCHESTRATOR

### Check Service Health
```bash
curl http://localhost:8081/actuator/health  # User Service
curl http://localhost:8082/actuator/health  # Trip Service
curl http://localhost:8083/actuator/health  # Booking Service
curl http://localhost:8084/actuator/health  # Notification Service
curl http://localhost:8080/actuator/health  # GraphQL Orchestrator
```

## Stop Services

### Docker
```bash
docker-compose down
```

### Local
```bash
./stop-all.sh
```

## Troubleshooting

### Services not starting?
```bash
# Check logs
docker-compose logs -f

# Or for specific service
docker-compose logs user-service
```

### Port already in use?
```bash
# Find and kill process using port
lsof -ti:8080 | xargs kill -9

# Or stop all services
./stop-all.sh
docker-compose down
```

### MongoDB connection issues?
```bash
# Check if MongoDB is running
docker ps | grep mongo

# Restart MongoDB
docker restart mongodb
```

### Eureka not showing services?
- Wait 30-60 seconds for services to register
- Check service logs for errors
- Verify EUREKA_CLIENT_SERVICEURL_DEFAULTZONE is set correctly

### React UI not connecting?
- Verify GraphQL Orchestrator is running (port 8080)
- Check browser console for errors
- Verify REACT_APP_GRAPHQL_URL in .env file

## Development Tips

### View Logs (Docker)
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f user-service
```

### View Logs (Local)
```bash
# Logs are in ./logs/ directory
tail -f logs/user-service.log
```

### Rebuild a Service
```bash
# Docker
docker-compose up -d --build user-service

# Local
cd user-service && mvn clean package -DskipTests
```

### Reset Database
```bash
# Docker
docker-compose down -v
docker-compose up -d

# Local (if using Docker MongoDB)
docker exec -it mongodb mongosh booking_db --eval "db.dropDatabase()"
```

## Next Steps

- Explore the GraphQL Playground at http://localhost:8080/graphiql
- Read the full README.md for architecture details
- Check API_DESIGN.md in the docs folder for API specifications
- Review ARCHITECTURE.md for system design details

## Support

If you encounter issues:
1. Check service logs
2. Verify all prerequisites are installed
3. Ensure all ports are available
4. Review the troubleshooting section above

## Production Deployment

For production deployment:
1. Use Kubernetes instead of Docker Compose
2. Set up proper secrets management (not environment variables)
3. Enable HTTPS/TLS
4. Configure MongoDB authentication
5. Set up monitoring (Prometheus + Grafana)
6. Configure proper logging (ELK stack)
7. Set up CI/CD pipeline

See DEPLOYMENT.md (create separately) for production deployment guide.
