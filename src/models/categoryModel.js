import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: "User required.",
  },
  displayName: {
    type: String,
    required: "User required.",
  },
  description: {
    type: String,
    required: "User required.",
  },
  img: {
    type: String,
    required: "No Image?",
  },
});

export default mongoose.model('Category', categorySchema);
