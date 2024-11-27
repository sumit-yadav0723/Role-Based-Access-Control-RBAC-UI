import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Role from './models/Role.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

async function createAdminUser(username, password) {
  try {
    const adminRole = await Role.findOne({ name: 'Admin' });
    if (!adminRole) {
      throw new Error('Admin role not found. Please run initRoles.js first.');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('User already exists. Updating password...');
      existingUser.password = password; // This will trigger the pre-save hook
      await existingUser.save();
      console.log('Admin user password updated successfully.');
      return;
    }

    const adminUser = new User({
      username,
      password, // This will be hashed by the pre-save hook
      role: adminRole._id
    });

    await adminUser.save();
    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error creating/updating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
}

const username = 'admin';
const password = '123';

createAdminUser(username, password);

