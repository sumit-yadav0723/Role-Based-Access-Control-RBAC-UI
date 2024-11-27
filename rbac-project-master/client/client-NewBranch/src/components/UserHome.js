import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, useTheme, Card, CardContent, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';
import { User, Shield, Key, BookIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

function UserHome({id}) {
  const [user, setUser] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log(response.data.permissions)
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!user) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
        mb={4}
      >
        <Typography fontWeight="bold" fontSize="32px">
          User Dashboard
        </Typography>
      </Box>

      {/* User Information Card */}
      <Box
        width="100%"
        p="0 6%"
      >
        <Card 
          elevation={3}
          sx={{ 
            backgroundColor: theme.palette.background.alt,
            mb: 4
          }}
        >
          <CardContent>
            {/* User Info Section */}
            <Box display="flex" alignItems="center" mb={3}>
              <User size={24} style={{ marginRight: '12px' }} />
              <Typography variant="h5" component="div">
                User Information
              </Typography>
            </Box>
            
            <Box pl={4} mb={3}>
              <Typography variant="body1" mb={1}>
                <strong>Username:</strong> {user.username}
              </Typography>
              <Box display="flex" alignItems="center" mt={2}>
                <Shield size={20} style={{ marginRight: '8px' }} />
                <Typography variant="body1">
                  <strong>Role:</strong> {user.role.name}
                </Typography>
              </Box>
            </Box>

            {/* Permissions Section */}
            <Box display="flex" alignItems="center" mb={2}>
              <Key size={24} style={{ marginRight: '12px' }} />
              <Typography variant="h6">
                Your Permissions
              </Typography>
            </Box>

            <List sx={{ pl: 4 }}>
              {user.role.permissions.map((permission, index) => (
                <React.Fragment key={permission}>
                  <ListItem>
                    <ListItemText 
                      primary={permission}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: theme.palette.text.primary
                        }
                      }}
                    />
                  </ListItem>
                  {index < user.role.permissions.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
        <Link to='/posts'><BookIcon/></Link>
        
      </Box>
    </Box>
  );
}

export default UserHome;