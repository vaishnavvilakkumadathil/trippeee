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
  Hotel,
  Flight,
  LocalActivity,
  AttachMoney,
} from '@mui/icons-material';

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();

  const getIcon = (type) => {
    const icons = {
      HOTEL: <Hotel />,
      FLIGHT: <Flight />,
      ACTIVITY: <LocalActivity />,
    };
    return icons[type] || <LocalActivity />;
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'warning',
      CONFIRMED: 'success',
      CANCELLED: 'error',
      COMPLETED: 'default',
    };
    return colors[status] || 'default';
  };

  const getTypeColor = (type) => {
    const colors = {
      HOTEL: 'primary',
      FLIGHT: 'secondary',
      ACTIVITY: 'info',
    };
    return colors[type] || 'default';
  };

  const details = booking.bookingDetails ? JSON.parse(booking.bookingDetails) : {};

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {getIcon(booking.bookingType)}
            <Chip
              label={booking.bookingType}
              color={getTypeColor(booking.bookingType)}
              size="small"
            />
          </Box>
          <Chip
            label={booking.status}
            color={getStatusColor(booking.status)}
            size="small"
          />
        </Box>

        <Typography variant="h6" component="h3" gutterBottom>
          {details.hotelName || details.airline || details.activityName || 'Booking'}
        </Typography>

        {booking.bookingType === 'HOTEL' && (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Check-in: {details.checkInDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check-out: {details.checkOutDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Guests: {details.numberOfGuests}
            </Typography>
          </Box>
        )}

        {booking.bookingType === 'FLIGHT' && (
          <Box>
            <Typography variant="body2" color="text.secondary">
              From: {details.departureAirport}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              To: {details.arrivalAirport}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {details.departureDate}
            </Typography>
          </Box>
        )}

        {booking.bookingType === 'ACTIVITY' && (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Date: {details.activityDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Participants: {details.numberOfParticipants}
            </Typography>
            {details.location && (
              <Typography variant="body2" color="text.secondary">
                Location: {details.location}
              </Typography>
            )}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <AttachMoney sx={{ fontSize: 20, color: 'text.secondary' }} />
          <Typography variant="h6" color="primary">
            {booking.totalAmount} {booking.currency}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          onClick={() => navigate(`/bookings/${booking.id}`)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookingCard;
