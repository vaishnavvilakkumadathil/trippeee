import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from '@mui/material';
import {
  FlightTakeoff,
  CalendarToday,
  LocationOn,
} from '@mui/icons-material';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Typography variant="h6" component="h3">
            {trip.name}
          </Typography>
          <Chip
            label={trip.status}
            color={getStatusColor(trip.status)}
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {trip.destination}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CalendarToday sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </Typography>
        </Box>

        {trip.description && (
          <Typography variant="body2" color="text.secondary">
            {trip.description.length > 100
              ? `${trip.description.substring(0, 100)}...`
              : trip.description}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button
          size="small"
          startIcon={<FlightTakeoff />}
          onClick={() => navigate(`/trips/${trip.id}`)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default TripCard;
