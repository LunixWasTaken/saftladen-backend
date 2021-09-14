import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username is required",
  },
  password: {
    type: String,
    required: "Uhm... Account without password? Help?",
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  lastLoginDate: {
    type: Date,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Users', userSchema);
