#!/bin/bash

echo "=========================================="
echo "Travel Booking System - UI Startup"
echo "=========================================="

# Check if .env exists, if not copy from example
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Starting development server..."
echo "The application will be available at http://localhost:3000"
echo "Make sure GraphQL orchestrator is running at http://localhost:8080/graphql"
echo ""

npm start
