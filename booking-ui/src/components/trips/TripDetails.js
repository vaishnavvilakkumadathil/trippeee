import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Edit,
  Delete,
  LocationOn,
  CalendarToday,
  Add,
} from '@mui/icons-material';
import { GET_TRIP, GET_TRIPS, GET_BOOKINGS_BY_TRIP } from '../../graphql/queries';
import { DELETE_TRIP } from '../../graphql/mutations';
import { useAuth } from '../../contexts/AuthContext';
import BookingCard from '../bookings/BookingCard';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_TRIP, {
    variables: { id },
  });

  const { data: bookingsData } = useQuery(GET_BOOKINGS_BY_TRIP, {
    variables: { tripId: id },
  });

  const [deleteTrip] = useMutation(DELETE_TRIP, {
    refetchQueries: [{ query: GET_TRIPS, variables: { userId: user?.id } }],
  });

  const handleDelete = async () => {
    try {
      await deleteTrip({ variables: { id } });
      navigate('/dashboard');
    } catch (err) {
      console.error('Error deleting trip:', err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading trip: {error.message}
      </Alert>
    );
  }

  const trip = data?.trip;
  const bookings = bookingsData?.bookingsByTrip || [];

  if (!trip) {
    return <Alert severity="error">Trip not found</Alert>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      PLANNING: 'info',
      CONFIRMED: 'success',
      COMPLETED: 'default',
      CANCELLED: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {trip.name}
              </Typography>
              <Chip
                label={trip.status}
                color={getStatusColor(trip.status)}
                sx={{ mb: 2 }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => navigate(`/trips/${id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="h6" color="text.secondary">
              {trip.destination}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body1" color="text.secondary">
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </Typography>
          </Box>

          {trip.description && (
            <Typography variant="body1" paragraph>
              {trip.description}
            </Typography>
          )}
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Bookings
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate(`/trips/${id}/bookings/new`)}
        >
          Add Booking
        </Button>
      </Box>

      {bookings.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No bookings yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Add hotels, flights, or activities to your trip
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate(`/trips/${id}/bookings/new`)}
          >
            Add Your First Booking
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking.id}>
              <BookingCard booking={booking} />
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Trip</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this trip? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TripDetails;
