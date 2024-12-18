import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{
    type: String,
    enum: ['assign_roles', 'edit', 'read', 'write'],
  }],
  level: { type: Number, required: true },
});

export default mongoose.model('Role', roleSchema);

