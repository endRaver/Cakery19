import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return String(Math.floor(100000000 + Math.random() * 900000000));
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      variant: {
        type: Object,
        required: true,
        size: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        portionSize: {
          type: Object,
          required: true,
        },
      },
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'cancelled', 'finished'],
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cash', 'card', 'twint'],
  },
  pickupDate: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  stripeSessionId: {
    type: String,
    default: null,
    unique: true,
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;