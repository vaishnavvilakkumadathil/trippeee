import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  MenuItem,
  Grid,
} from '@mui/material';
import { CREATE_BOOKING } from '../../graphql/mutations';
import { GET_BOOKINGS, GET_BOOKINGS_BY_TRIP } from '../../graphql/queries';
import { useAuth } from '../../contexts/AuthContext';

const CreateBookingForm = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const { user } = useAuth();
  const [createBooking] = useMutation(CREATE_BOOKING, {
    refetchQueries: [
      { query: GET_BOOKINGS, variables: { userId: user?.id } },
      { query: GET_BOOKINGS_BY_TRIP, variables: { tripId } },
    ],
  });

  const [bookingType, setBookingType] = useState('HOTEL');
  const [formData, setFormData] = useState({
    status: 'PENDING',
    totalAmount: '',
    currency: 'USD',
    // Hotel fields
    hotelName: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    // Flight fields
    airline: '',
    flightNumber: '',
    departureAirport: '',
    arrivalAirport: '',
    departureDate: '',
    departureTime: '',
    // Activity fields
    activityName: '',
    activityDate: '',
    activityTime: '',
    numberOfParticipants: 1,
    location: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let bookingDetails = {};

      if (bookingType === 'HOTEL') {
        bookingDetails = {
          hotelName: formData.hotelName,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate,
          numberOfGuests: parseInt(formData.numberOfGuests),
        };
      } else if (bookingType === 'FLIGHT') {
        bookingDetails = {
          airline: formData.airline,
          flightNumber: formData.flightNumber,
          departureAirport: formData.departureAirport,
          arrivalAirport: formData.arrivalAirport,
          departureDate: formData.departureDate,
          departureTime: formData.departureTime,
        };
      } else if (bookingType === 'ACTIVITY') {
        bookingDetails = {
          activityName: formData.activityName,
          activityDate: formData.activityDate,
          activityTime: formData.activityTime,
          numberOfParticipants: parseInt(formData.numberOfParticipants),
          location: formData.location,
        };
      }

      const { data } = await createBooking({
        variables: {
          input: {
            tripId,
            userId: user.id,
            bookingType,
            status: formData.status,
            totalAmount: parseFloat(formData.totalAmount),
            currency: formData.currency,
            bookingDetails: JSON.stringify(bookingDetails),
          },
        },
      });

      if (data?.createBooking) {
        navigate(`/trips/${tripId}`);
      }
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Add Booking
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              select
              label="Booking Type"
              value={bookingType}
              onChange={(e) => setBookingType(e.target.value)}
              margin="normal"
              required
            >
              <MenuItem value="HOTEL">Hotel</MenuItem>
              <MenuItem value="FLIGHT">Flight</MenuItem>
              <MenuItem value="ACTIVITY">Activity</MenuItem>
            </TextField>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Total Amount"
                  name="totalAmount"
                  type="number"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  margin="normal"
                  required
                  inputProps={{ step: '0.01', min: '0' }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  select
                  label="Currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  margin="normal"
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                  <MenuItem value="JPY">JPY</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <TextField
              fullWidth
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="CONFIRMED">Confirmed</MenuItem>
              <MenuItem value="CANCELLED">Cancelled</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </TextField>

            {bookingType === 'HOTEL' && (
              <>
                <TextField
                  fullWidth
                  label="Hotel Name"
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Check-in Date"
                      name="checkInDate"
                      type="date"
                      value={formData.checkInDate}
                      onChange={handleChange}
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Check-out Date"
                      name="checkOutDate"
                      type="date"
                      value={formData.checkOutDate}
                      onChange={handleChange}
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label="Number of Guests"
                  name="numberOfGuests"
                  type="number"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  margin="normal"
                  required
                  inputProps={{ min: '1' }}
                />
              </>
            )}

            {bookingType === 'FLIGHT' && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Airline"
                      name="airline"
                      value={formData.airline}
                      onChange={handleChange}
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Flight Number"
                      name="flightNumber"
                      value={formData.flightNumber}
                      onChange={handleChange}
                      margin="normal"
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Departure Airport"
                      name="departureAirport"
                      value={formData.departureAirport}
                      onChange={handleChange}
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Arrival Airport"
                      name="arrivalAirport"
                      value={formData.arrivalAirport}
                      onChange={handleChange}
                      margin="normal"
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Departure Date"
                      name="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={handleChange}
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Departure Time"
                      name="departureTime"
                      type="time"
                      value={formData.departureTime}
                      onChange={handleChange}
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                </Grid>
              </>
            )}

            {bookingType === 'ACTIVITY' && (
              <>
                <TextField
                  fullWidth
                  label="Activity Name"
                  name="activityName"
                  value={formData.activityName}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  margin="normal"
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Activity Date"
                      name="activityDate"
                      type="date"
                      value={formData.activityDate}
                      onChange={handleChange}
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Activity Time"
                      name="activityTime"
                      type="time"
                      value={formData.activityTime}
                      onChange={handleChange}
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label="Number of Participants"
                  name="numberOfParticipants"
                  type="number"
                  value={formData.numberOfParticipants}
                  onChange={handleChange}
                  margin="normal"
                  required
                  inputProps={{ min: '1' }}
                />
              </>
            )}

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                fullWidth
              >
                {loading ? 'Creating...' : 'Add Booking'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(`/trips/${tripId}`)}
                fullWidth
              >
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateBookingForm;
