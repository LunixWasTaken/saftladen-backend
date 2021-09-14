import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  _id: {
    type: UUID,
    default: uuidv4
  },
  name: {
    type: String,
    required: "Name is required"
  },
  price: {
    type: String,
    required: "Price is required"
  },
  description: {
    type: String,
    required: "Description is required"
  },
  img: {
    type: Buffer,
    contentType: String,
    // required: "No Image?"
  },
  available: {
    type: Boolean,
    default: true
  }
});

module.exports = Products = mongoose.model('Products', productSchema);