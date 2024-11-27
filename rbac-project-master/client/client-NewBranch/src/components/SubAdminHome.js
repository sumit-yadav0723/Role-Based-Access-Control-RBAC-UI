import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Typography, TextField, Button, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, FormControlLabel, useTheme } from '@mui/material';

function SubAdminHome() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRolePermissions, setNewRolePermissions] = useState([]);
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

  const assignRole = async (userId, roleId) => {
    try {
      await axios.put(`/api/users/${userId}/role`, 
        { roleId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchUsers();
    } catch (error) {
      toast.error('Error assigning role.');
      console.error('Error assigning role:', error);
    }
  };

  const createCustomRole = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/roles', 
        { name: newRoleName, permissions: newRolePermissions, level: 2 },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setNewRoleName('');
      setNewRolePermissions([]);
      fetchRoles();
    } catch (error) {
      console.error('Error creating custom role:', error);
    }
  };

  const handlePermissionChange = (permission) => {
    setNewRolePermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={4}>Sub-Admin Dashboard</Typography>
      
      <form onSubmit={createCustomRole} style={{ marginBottom: '2rem' }}>
        <Typography variant="h6" mb={2}>Create Custom Role</Typography>
        <Box display="flex" flexDirection="column" gap={2} mb={2}>
          <TextField
            label="Role Name"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            required
          />
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newRolePermissions.includes('read')}
                  onChange={() => handlePermissionChange('read')}
                />
              }
              label="Read"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newRolePermissions.includes('write')}
                  onChange={() => handlePermissionChange('write')}
                />
              }
              label="Write"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newRolePermissions.includes('edit')}
                  onChange={() => handlePermissionChange('edit')}
                />
              }
              label="Edit"
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">Create Role</Button>
        </Box>
      </form>

      <Typography variant="h6" mb={2}>User List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Current Role</TableCell>
              <TableCell>Assign Role</TableCell>
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
                    onChange={(e) => assignRole(user._id, e.target.value)}
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

export default SubAdminHome;