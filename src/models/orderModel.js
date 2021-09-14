import mongoose from 'mongoose';
import productSchema from './productModel';

const orderSchema = new mongoose.Schema({
  products: [{
    type: productSchema,
    required: "Order cannot be Empty!",
  }],
  orderStatus: {
    type: String,
    required: "Status",
    default: "In Progress",
  },
});

export default mongoose.model('Orders', orderSchema);
