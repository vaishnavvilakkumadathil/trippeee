# Travel Booking System - React UI

A modern React-based user interface for the Travel Booking System, built with Material-UI and Apollo Client for GraphQL integration.

## Features

- User authentication (login/signup)
- Trip management (create, view, update, delete)
- Booking management (hotels, flights, activities)
- Real-time notifications
- Responsive Material-UI design
- Protected routes with authentication
- GraphQL integration with Apollo Client

## Tech Stack

- **React 18** - UI framework
- **Material-UI (MUI)** - Component library
- **Apollo Client** - GraphQL client
- **React Router v6** - Routing
- **GraphQL** - API communication

## Prerequisites

- Node.js 18+ and npm
- GraphQL Orchestrator running on `http://localhost:8080/graphql`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory:
```env
REACT_APP_GRAPHQL_URL=http://localhost:8080/graphql
```

## Development

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (irreversible)

## Docker

### Build Docker Image

```bash
docker build -t booking-ui:latest .
```

### Run Container

```bash
docker run -p 3000:80 -e REACT_APP_GRAPHQL_URL=http://localhost:8080/graphql booking-ui:latest
```

### Docker Compose

Add to your `docker-compose.yml`:

```yaml
  booking-ui:
    build: ./booking-ui
    ports:
      - "3000:80"
    environment:
      - REACT_APP_GRAPHQL_URL=http://graphql-orchestrator:8080/graphql
    depends_on:
      - graphql-orchestrator
```

## Project Structure

```
booking-ui/
├── public/                 # Static files
├── src/
│   ├── components/        # React components
│   │   ├── auth/         # Authentication components
│   │   ├── bookings/     # Booking components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── notifications/# Notification components
│   │   └── trips/        # Trip components
│   ├── contexts/         # React contexts
│   │   └── AuthContext.js
│   ├── graphql/          # GraphQL queries and mutations
│   │   ├── client.js     # Apollo Client configuration
│   │   ├── queries.js    # GraphQL queries
│   │   └── mutations.js  # GraphQL mutations
│   ├── pages/            # Page components
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point
│   └── theme.js          # Material-UI theme
├── Dockerfile            # Docker configuration
├── nginx.conf           # Nginx configuration
└── package.json         # Dependencies
```

## Component Overview

### Authentication
- **LoginForm** - User login
- **SignupForm** - User registration
- **ProtectedRoute** - Route guard for authenticated routes

### Trips
- **TripList** - Display all user trips
- **TripCard** - Individual trip card
- **TripDetails** - Detailed trip view with bookings
- **CreateTripForm** - Form to create new trips

### Bookings
- **BookingList** - Display all bookings
- **BookingCard** - Individual booking card
- **CreateBookingForm** - Form with variants for hotels/flights/activities

### Notifications
- **NotificationBell** - Header notification icon with dropdown
- **NotificationList** - Full notification list page

### Dashboard
- **UserDashboard** - Overview of trips, bookings, and notifications

## GraphQL Operations

### Queries
- User: `currentUser`, `user`
- Trips: `trips`, `trip`
- Bookings: `bookings`, `booking`, `bookingsByTrip`
- Notifications: `notifications`, `unreadNotifications`

### Mutations
- User: `registerUser`, `login`, `updateUser`
- Trips: `createTrip`, `updateTrip`, `deleteTrip`
- Bookings: `createBooking`, `updateBooking`, `cancelBooking`, `deleteBooking`
- Notifications: `markNotificationRead`, `markAllNotificationsRead`, `deleteNotification`

## Authentication Flow

1. User logs in via LoginForm
2. JWT token stored in localStorage
3. Apollo Client adds token to all requests
4. Protected routes check authentication status
5. User context provides auth state throughout app

## Key Features

### Real-time Updates
- Notification polling every 30 seconds
- Optimistic UI updates
- Automatic cache invalidation

### Responsive Design
- Mobile-first approach
- Breakpoints: xs, sm, md, lg, xl
- Touch-friendly UI elements

### Error Handling
- GraphQL error display
- Network error handling
- User-friendly error messages

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| REACT_APP_GRAPHQL_URL | GraphQL API endpoint | http://localhost:8080/graphql |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Production Build

Create an optimized production build:

```bash
npm run build
```

The build folder will contain the optimized production files.

### Serve Production Build Locally

```bash
npx serve -s build -p 3000
```

## Troubleshooting

### GraphQL Connection Issues
- Verify GraphQL orchestrator is running
- Check REACT_APP_GRAPHQL_URL is correct
- Check CORS settings on backend

### Authentication Issues
- Clear localStorage and try logging in again
- Check JWT token format and expiration
- Verify user service is running

### Build Issues
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`
- Check Node.js version (18+ required)

## License

Copyright 2026 - Travel Booking System
