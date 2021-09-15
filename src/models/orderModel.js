import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  products: [],
  orderStatus: {
    type: String,
    default: "in progress",
    enum: ['in progress', 'done', 'canceled', 'delayed', 'please contact customer support'],
  },
});

export default mongoose.model('Orders', orderSchema);
