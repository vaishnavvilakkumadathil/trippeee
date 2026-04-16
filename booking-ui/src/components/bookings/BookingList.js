import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { GET_BOOKINGS } from '../../graphql/queries';
import { useAuth } from '../../contexts/AuthContext';
import BookingCard from './BookingCard';

const BookingList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loading, error, data } = useQuery(GET_BOOKINGS, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading bookings: {error.message}
      </Alert>
    );
  }

  const bookings = data?.bookings || [];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          My Bookings
        </Typography>
      </Box>

      {bookings.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No bookings yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create a trip first to add bookings
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/trips/new')}
          >
            Create Trip
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
    </Box>
  );
};

export default BookingList;
