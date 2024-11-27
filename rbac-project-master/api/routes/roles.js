import express from 'express';
import Role from '../models/Role.js';
import { authMiddleware, checkPermission } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, checkPermission('assign_roles'), async (req, res) => {
  try {
    const { name, permissions, level } = req.body;
    const role = new Role({ name, permissions, level });
    await role.save();
    res.status(201).json({ message: 'Role created successfully', role });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

