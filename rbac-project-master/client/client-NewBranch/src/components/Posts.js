import React, { useState, useEffect } from 'react'; 
import { Box, Typography, Card, CardContent, IconButton, useTheme } from '@mui/material';
import axios from 'axios';
import { Pencil, Trash2, Eye } from 'lucide-react';

const mockPosts = [
  { id: 1, title: 'First Post', content: 'This is the first post content' },
  { id: 2, title: 'Second Post', content: 'This is the second post content' },
  { id: 3, title: 'Third Post', content: 'This is the third post content' },
];

export function PostsPage({ id, isAuthenticated }) {
  const [user, setUser] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Posts
      </Typography>
      
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
        {mockPosts.map((post) => (
          <Card key={post.id} elevation={3} sx={{ backgroundColor: theme.palette.background.alt }}>
            <CardContent>
              <Typography variant="h5" component="div" mb={2}>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {post.content}
              </Typography>
              
              <Box display="flex" justifyContent="flex-end" gap={1}>
              {user?.permissions.includes('read') && (
                  <IconButton color="primary">
                    <Eye />
                  </IconButton>
                )}
                {user?.permissions.includes('edit') && (
                  <IconButton color="secondary">
                    <Pencil />
                  </IconButton>
                )}
                {user?.permissions.includes('delete') && (
                  <IconButton color="error">
                    <Trash2 />
                  </IconButton>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}