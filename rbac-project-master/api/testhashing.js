import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

async function testHashing(username, password) {
  try {
    // Fetch user from database
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return;
    }

    console.log('Stored hashed password:', user.password);

    // Generate new hash
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(password, salt);
    console.log('Newly generated hash:', newHashedPassword);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Do passwords match?', isMatch);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Replace 'admin' and 'yourpassword' with the actual username and password
testHashing('admin', '123');

