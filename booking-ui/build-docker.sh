#!/bin/bash

echo "=========================================="
echo "Building Docker Image for Booking UI"
echo "=========================================="

# Build the Docker image
docker build -t booking-ui:latest .

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Docker image built successfully!"
    echo ""
    echo "To run the container:"
    echo "  docker run -p 3000:80 -e REACT_APP_GRAPHQL_URL=http://localhost:8080/graphql booking-ui:latest"
    echo ""
    echo "Or use docker-compose:"
    echo "  docker-compose up"
else
    echo ""
    echo "✗ Docker build failed!"
    exit 1
fi
