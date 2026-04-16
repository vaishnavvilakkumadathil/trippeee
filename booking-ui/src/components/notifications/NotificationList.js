import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Delete, Circle } from '@mui/icons-material';
import { GET_NOTIFICATIONS } from '../../graphql/queries';
import { MARK_NOTIFICATION_READ, DELETE_NOTIFICATION } from '../../graphql/mutations';
import { useAuth } from '../../contexts/AuthContext';

const NotificationList = () => {
  const { user } = useAuth();
  const { loading, error, data, refetch } = useQuery(GET_NOTIFICATIONS, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const [markRead] = useMutation(MARK_NOTIFICATION_READ);
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION);

  const handleMarkRead = async (id) => {
    try {
      await markRead({ variables: { id } });
      refetch();
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification({ variables: { id } });
      refetch();
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      INFO: 'info',
      SUCCESS: 'success',
      WARNING: 'warning',
      ERROR: 'error',
    };
    return colors[type] || 'default';
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
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading notifications: {error.message}
      </Alert>
    );
  }

  const notifications = data?.notifications || [];

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        All Notifications
      </Typography>

      {notifications.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="body1" color="text.secondary" align="center">
              No notifications
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <List sx={{ bgcolor: 'background.paper' }}>
          {notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem
                sx={{
                  bgcolor: notification.isRead ? 'transparent' : 'action.hover',
                  borderRadius: 1,
                  mb: 1,
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(notification.id)}
                  >
                    <Delete />
                  </IconButton>
                }
              >
                <Box
                  sx={{ mr: 2, cursor: 'pointer' }}
                  onClick={() => !notification.isRead && handleMarkRead(notification.id)}
                >
                  <Circle
                    sx={{
                      fontSize: 12,
                      color: notification.isRead ? 'transparent' : 'primary.main',
                    }}
                  />
                </Box>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="subtitle1">
                        {notification.title}
                      </Typography>
                      <Chip
                        label={notification.type}
                        color={getTypeColor(notification.type)}
                        size="small"
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        {notification.message}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                      >
                        {formatDate(notification.createdAt)}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default NotificationList;
