import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  price: {
    type: String,
    required: "Price is required",
  },
  description: {
    type: String,
    required: "Description is required",
  },
  img: {
    type: Buffer,
    contentType: String,
    // required: "No Image?"
  },
  available: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    required: "Category required.",
  },
});

export default mongoose.model('Products', productSchema);
