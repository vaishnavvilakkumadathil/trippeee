import { gql } from '@apollo/client';

// User Queries
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      username
      email
      firstName
      lastName
      createdAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
      firstName
      lastName
      createdAt
    }
  }
`;

// Trip Queries
export const GET_TRIPS = gql`
  query GetTrips($userId: ID!) {
    trips(userId: $userId) {
      id
      name
      description
      destination
      startDate
      endDate
      status
      userId
      createdAt
      updatedAt
    }
  }
`;

export const GET_TRIP = gql`
  query GetTrip($id: ID!) {
    trip(id: $id) {
      id
      name
      description
      destination
      startDate
      endDate
      status
      userId
      createdAt
      updatedAt
    }
  }
`;

// Booking Queries
export const GET_BOOKINGS = gql`
  query GetBookings($userId: ID!) {
    bookings(userId: $userId) {
      id
      tripId
      userId
      bookingType
      status
      totalAmount
      currency
      bookingDetails
      createdAt
      updatedAt
    }
  }
`;

export const GET_BOOKING = gql`
  query GetBooking($id: ID!) {
    booking(id: $id) {
      id
      tripId
      userId
      bookingType
      status
      totalAmount
      currency
      bookingDetails
      createdAt
      updatedAt
    }
  }
`;

export const GET_BOOKINGS_BY_TRIP = gql`
  query GetBookingsByTrip($tripId: ID!) {
    bookingsByTrip(tripId: $tripId) {
      id
      tripId
      userId
      bookingType
      status
      totalAmount
      currency
      bookingDetails
      createdAt
      updatedAt
    }
  }
`;

// Notification Queries
export const GET_NOTIFICATIONS = gql`
  query GetNotifications($userId: ID!) {
    notifications(userId: $userId) {
      id
      userId
      type
      title
      message
      isRead
      relatedEntityType
      relatedEntityId
      createdAt
    }
  }
`;

export const GET_UNREAD_NOTIFICATIONS = gql`
  query GetUnreadNotifications($userId: ID!) {
    unreadNotifications(userId: $userId) {
      id
      userId
      type
      title
      message
      isRead
      relatedEntityType
      relatedEntityId
      createdAt
    }
  }
`;

export const GET_NOTIFICATION = gql`
  query GetNotification($id: ID!) {
    notification(id: $id) {
      id
      userId
      type
      title
      message
      isRead
      relatedEntityType
      relatedEntityId
      createdAt
    }
  }
`;
