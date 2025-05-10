import mongoose from 'mongoose';

const cartSessionSchema = new mongoose.Schema({
  stripeSessionId: {
    type: String,
    required: true,
    unique: true
  },
  cartItems: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    excludeNuts: {
      type: Boolean,
      default: false
    }
  }],
  pickupDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // Document will be automatically deleted after 1 hour
  }
});

const CartSession = mongoose.model('CartSession', cartSessionSchema);

export default CartSession; 