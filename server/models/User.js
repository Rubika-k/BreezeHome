// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },

  address: {
    city: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    enum: ['user','admin'],
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});
const User = mongoose.model('User', userSchema);
export default User;

