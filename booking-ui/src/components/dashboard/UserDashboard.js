import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  FlightTakeoff,
  BookOnline,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { GET_TRIPS, GET_BOOKINGS, GET_UNREAD_NOTIFICATIONS } from '../../graphql/queries';
import { useAuth } from '../../contexts/AuthContext';
import TripList from '../trips/TripList';

const StatCard = ({ title, value, icon, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
        <Box
          sx={{
            bgcolor: `${color}.light`,
            borderRadius: 2,
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const UserDashboard = () => {
  const { user } = useAuth();

  const { loading: tripsLoading, error: tripsError, data: tripsData } = useQuery(GET_TRIPS, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const { loading: bookingsLoading, error: bookingsError, data: bookingsData } = useQuery(GET_BOOKINGS, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const { loading: notificationsLoading, data: notificationsData } = useQuery(GET_UNREAD_NOTIFICATIONS, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const loading = tripsLoading || bookingsLoading || notificationsLoading;

  if (loading && !tripsData && !bookingsData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const trips = tripsData?.trips || [];
  const bookings = bookingsData?.bookings || [];
  const unreadNotifications = notificationsData?.unreadNotifications || [];

  const activeTrips = trips.filter(t => t.status === 'CONFIRMED' || t.status === 'PLANNING').length;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome back, {user?.firstName || user?.username}!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Here's what's happening with your trips
      </Typography>

      {(tripsError || bookingsError) && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading dashboard data
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Active Trips"
            value={activeTrips}
            icon={<FlightTakeoff sx={{ color: 'primary.main', fontSize: 32 }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Bookings"
            value={bookings.length}
            icon={<BookOnline sx={{ color: 'secondary.main', fontSize: 32 }} />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Unread Notifications"
            value={unreadNotifications.length}
            icon={<NotificationsIcon sx={{ color: 'info.main', fontSize: 32 }} />}
            color="info"
          />
        </Grid>
      </Grid>

      <TripList />
    </Box>
  );
};

export default UserDashboard;
