import mongoose from 'mongoose';
import dotenv from "dotenv"
import Role from './models/Role.js';


dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

const roles = [
  { name: 'Admin', permissions: ['assign_roles', 'edit', 'read', 'write'], level: 1 },
  { name: 'SubAdmin', permissions: ['edit', 'read', 'write'], level: 2 },
  { name: 'User', permissions: ['read'], level: 3 },
];

async function initRoles() {
  for (let role of roles) {
    try {
      await Role.findOneAndUpdate({ name: role.name }, role, { upsert: true });
      console.log(`Role ${role.name} initialized`);
    } catch (error) {
      console.error(`Error initializing role ${role.name}:`, error);
    }
  }
  mongoose.connection.close();
}

initRoles();