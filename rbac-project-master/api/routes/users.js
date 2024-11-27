import express from 'express';
import User from '../models/User.js';
import Role from '../models/Role.js';
import { authMiddleware, checkPermission } from '../middleware/auth.js';

const router = express.Router();
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findById(userId).populate('role');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract permissions from the user's role
    const userWithPermissions = {
      ...user.toObject(),
      permissions: user.role ? user.role.permissions : []
    };

    res.status(200).json(userWithPermissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user and permissions', error });
  }
};

router.post('/', authMiddleware, checkPermission('assign_roles'), async (req, res) => {
  try {
    const { username, password, roleId } = req.body;
    const role = await Role.findById(roleId);
    if (!role) return res.status(400).json({ message: 'Invalid role' });
    const user = new User({ username, password, role: role._id });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/', authMiddleware, checkPermission('read'), async (req, res) => {
  try {
    const users = await User.find().populate('role');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/:id/role', authMiddleware, checkPermission('assign_roles'), async (req, res) => {
  try {
    const { roleId } = req.body;
    const user = await User.findById(req.params.id);
    const role = await Role.findById(roleId);
    if (!user || !role) return res.status(400).json({ message: 'Invalid user or role' });
    user.role = role._id;
    await user.save();
    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', getUser);

export default router;

