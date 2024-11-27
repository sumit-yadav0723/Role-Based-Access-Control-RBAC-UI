import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@mui/material';

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('');
  const theme = useTheme();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', 
        { username: newUsername, password: newPassword, roleId: newRole },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setNewUsername('');
      setNewPassword('');
      setNewRole('');
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const changeUserRole = async (userId, roleId) => {
    try {
      await axios.put(`/api/users/${userId}/role`, 
        { roleId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchUsers();
    } catch (error) {
      console.error('Error changing user role:', error);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={4}>Admin Dashboard</Typography>
      
      <form onSubmit={createUser} style={{ marginBottom: '2rem' }}>
        <Typography variant="h6" mb={2}>Create New User</Typography>
        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            displayEmpty
            required
          >
            <MenuItem value="" disabled>Select Role</MenuItem>
            {roles.map(role => (
              <MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>
            ))}
          </Select>
          <Button type="submit" variant="contained" color="primary">Create User</Button>
        </Box>
      </form>

      <Typography variant="h6" mb={2}>User List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role.name}</TableCell>
                <TableCell>
                  <Select
                    value={user.role._id}
                    onChange={(e) => changeUserRole(user._id, e.target.value)}
                  >
                    {roles.map(role => (
                      <MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AdminHome;