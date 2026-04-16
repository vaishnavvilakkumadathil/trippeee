// Date formatting utilities
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '';

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };

  return new Date(dateString).toLocaleDateString('en-US', defaultOptions);
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';

  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
};

// Currency formatting
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return '';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

// Status color mapping
export const getStatusColor = (status) => {
  const statusColors = {
    // Trip statuses
    PLANNING: 'info',
    CONFIRMED: 'success',
    COMPLETED: 'default',
    CANCELLED: 'error',
    // Booking statuses
    PENDING: 'warning',
  };

  return statusColors[status] || 'default';
};

// Booking type color mapping
export const getBookingTypeColor = (type) => {
  const typeColors = {
    HOTEL: 'primary',
    FLIGHT: 'secondary',
    ACTIVITY: 'info',
  };

  return typeColors[type] || 'default';
};

// Notification type color mapping
export const getNotificationTypeColor = (type) => {
  const typeColors = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
  };

  return typeColors[type] || 'default';
};

// Validation helpers
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

export const isDateInFuture = (dateString) => {
  return new Date(dateString) > new Date();
};

export const isDateRangeValid = (startDate, endDate) => {
  return new Date(startDate) <= new Date(endDate);
};

// Error message formatting
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.graphQLErrors?.length > 0) {
    return error.graphQLErrors[0].message;
  }
  if (error?.networkError) {
    return 'Network error. Please check your connection.';
  }
  return 'An unexpected error occurred';
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
