# Quick Start Guide

Get the Travel Booking UI running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- GraphQL orchestrator running at `http://localhost:8080/graphql`

## Option 1: Development Mode (Recommended for Development)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start the Application

```bash
npm start
```

Or use the startup script:

```bash
./start.sh
```

The application will open automatically at `http://localhost:3000`

## Option 2: Docker (Recommended for Production)

### Step 1: Build Docker Image

```bash
./build-docker.sh
```

Or manually:

```bash
docker build -t booking-ui:latest .
```

### Step 2: Run Container

```bash
docker run -p 3000:80 \
  -e REACT_APP_GRAPHQL_URL=http://localhost:8080/graphql \
  booking-ui:latest
```

Or use docker-compose:

```bash
docker-compose up
```

## First Time Setup

### 1. Create a User Account

- Navigate to `http://localhost:3000`
- Click "Sign up" on the login page
- Fill in the registration form:
  - Username: `testuser`
  - Email: `test@example.com`
  - First Name: `Test`
  - Last Name: `User`
  - Password: `password123`
- Click "Sign Up"

### 2. Login

- You'll be redirected to the login page
- Enter your credentials
- Click "Sign In"

### 3. Create Your First Trip

- Click "Create Trip" button on the dashboard
- Fill in trip details:
  - Trip Name: `Summer Vacation 2026`
  - Destination: `Paris, France`
  - Description: `A wonderful trip to explore Paris`
  - Start Date: Select a future date
  - End Date: Select an end date after start date
  - Status: `PLANNING`
- Click "Create Trip"

### 4. Add a Booking

- On the trip details page, click "Add Booking"
- Select booking type (Hotel, Flight, or Activity)
- Fill in the booking details
- Click "Add Booking"

### 5. View Notifications

- Click the notification bell icon in the header
- You'll see notifications about your trips and bookings
- Click on a notification to mark it as read

## Testing the UI

### Manual Testing Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Dashboard displays correctly
- [ ] Can create a new trip
- [ ] Can view trip details
- [ ] Can add a hotel booking
- [ ] Can add a flight booking
- [ ] Can add an activity booking
- [ ] Notifications appear in the bell icon
- [ ] Can mark notifications as read
- [ ] Can logout

### Sample Test Data

#### Trip 1
```
Name: Beach Vacation
Destination: Maldives
Start Date: 2026-06-01
End Date: 2026-06-15
Status: PLANNING
```

#### Hotel Booking
```
Hotel Name: Paradise Resort
Check-in: 2026-06-01
Check-out: 2026-06-15
Guests: 2
Total Amount: 2500
Currency: USD
```

#### Flight Booking
```
Airline: Emirates
Flight Number: EK001
Departure: JFK
Arrival: MLE
Date: 2026-06-01
Time: 10:00
Total Amount: 1200
Currency: USD
```

## Troubleshooting

### Issue: Cannot connect to GraphQL server

**Solution:**
1. Make sure the GraphQL orchestrator is running
2. Check the URL in `.env` file
3. Verify CORS is enabled on the backend

```bash
# Check if GraphQL is accessible
curl http://localhost:8080/graphql
```

### Issue: Login fails

**Solution:**
1. Check browser console for errors
2. Verify user service is running
3. Check authentication token is being set

### Issue: Build errors

**Solution:**
```bash
# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force
```

### Issue: Docker build fails

**Solution:**
```bash
# Make sure you're in the correct directory
cd booking-ui

# Check Docker is running
docker info

# Try building with no cache
docker build --no-cache -t booking-ui:latest .
```

## Development Tips

### Hot Reload
The development server supports hot reload. Changes to source files will automatically refresh the browser.

### Browser DevTools
- Press F12 to open browser developer tools
- Check Console tab for JavaScript errors
- Check Network tab to see GraphQL requests
- Use React DevTools extension for component inspection

### GraphQL Queries
You can test GraphQL queries directly in GraphQL Playground:
- Navigate to `http://localhost:8080/graphql`
- Use the interface to test queries and mutations

### Debugging Authentication
Authentication tokens are stored in localStorage:
```javascript
// In browser console
localStorage.getItem('authToken')
localStorage.getItem('user')
```

## Next Steps

1. Explore all features in the UI
2. Try different booking types (hotel, flight, activity)
3. Test notification functionality
4. Review the README.md for detailed documentation
5. Check the component structure in `src/components/`

## Support

For issues or questions:
1. Check the README.md
2. Review the code comments
3. Check browser console for errors
4. Verify backend services are running

## Performance Tips

### Production Build
For optimal performance in production:

```bash
npm run build
npx serve -s build
```

This creates an optimized build with:
- Minified JavaScript
- Optimized assets
- Code splitting
- Compression

Happy coding!
