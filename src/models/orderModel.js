import mongoose from 'mongoose';
import productSchema from './productModel';

const orderSchema = new mongoose.Schema({
  _id: {
    type: UUID,
    default: uuidv4
  },
  products: [{
    type: productSchema,
    required: "Order cannot be Empty!"
  }],
  orderStatus: {
    type: String,
    required: "Status",
    default: "In Progress"
  }
});

module.exports = Orders = mongoose.model('Orders', orderSchema);