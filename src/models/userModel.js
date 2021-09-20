/* eslint-disable no-invalid-this */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username is required",
    unique: true,
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

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(userPassword, cb) {
  bcrypt.compare(userPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model('Users', userSchema);
