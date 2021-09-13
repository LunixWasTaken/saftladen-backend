import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: {
    type: UUID,
    default: uuidv4
  },
  username: {
    type: String,
    required: "Username is required"
  },
  password: {
    type: String,
    required: "Uhm... Account without password? Help?"
  },
  creationDate: {
    type: Date,
    default: Date.now()
  },
  lastLoginDate: {
    type: Date,
    default: 0
  }
});

module.exports = Users = mongoose.model('Users', userSchema);