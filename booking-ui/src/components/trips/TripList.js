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
import { GET_TRIPS } from '../../graphql/queries';
import { useAuth } from '../../contexts/AuthContext';
import TripCard from './TripCard';

const TripList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loading, error, data } = useQuery(GET_TRIPS, {
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
        Error loading trips: {error.message}
      </Alert>
    );
  }

  const trips = data?.trips || [];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          My Trips
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/trips/new')}
        >
          Create Trip
        </Button>
      </Box>

      {trips.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No trips yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Start planning your next adventure
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/trips/new')}
          >
            Create Your First Trip
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {trips.map((trip) => (
            <Grid item xs={12} sm={6} md={4} key={trip.id}>
              <TripCard trip={trip} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TripList;
