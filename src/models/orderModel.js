import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: "User required.",
  },
  products: [],
  orderStatus: {
    type: String,
    default: "in progress",
    enum: ['in progress', 'done', 'canceled', 'delayed', 'please contact customer support'],
  },
});

export default mongoose.model('Orders', orderSchema);
