import { stripe } from "../lib/stripe.js";

import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import { sendOrderSuccessEmail } from "../lib/mailtrap/emails.js";

// Helper function to convert CHF to rappen (smallest currency unit)
const chfToRappen = (amount) => Math.round(amount * 100);

// Helper function to convert rappen to CHF
const rappenToChf = (amount) => amount / 100;

export const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems, pickupDate } = req.body;
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    // Calculate total amount for all products
    const lineItems = cartItems.map(item => {
      const amount = Math.round(Number(item.variant.price));
      if (isNaN(amount)) {
        throw new Error(`Invalid price for product: ${item.product.name}`);
      }
      totalAmount += amount * (item.quantity || 1);

      return {
        price_data: {
          currency: 'chf',
          product_data: {
            name: item.product.name + " (" + item.variant.size + ")",
            images: item.product.imageUrl && item.product.imageUrl.length > 0 ? [item.product.imageUrl[0]] : [],
          },
          unit_amount: chfToRappen(amount),
        },
        quantity: item.quantity || 1,
      }
    });

    // Create checkout session with at most one coupon
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'twint'],
      line_items: lineItems,
      mode: 'payment',
      currency: 'chf',
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        userId: req.user._id.toString(),
        cartItems: JSON.stringify(
          cartItems.map((item) => ({
            id: item.product._id,
            quantity: item.quantity,
            variant: item.variant
          }))
        ),
        pickupDate: pickupDate,
      }
    });

    // Send response with session ID and amounts
    res.status(200).json({
      id: session.id,
      totalAmount: totalAmount,
      url: session.url
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
}

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required"
      });
    }

    // Check if order already exists for this session
    const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
    if (existingOrder) {
      // console.log(`Order already exists for session ${sessionId}`);
      return res.status(200).json({
        success: true,
        message: "Order already processed",
        orderId: existingOrder._id,
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Additional check to ensure session is paid
    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    // Convert amount from rappen to CHF
    const totalAmountInChf = rappenToChf(session.amount_total);

    const user = await User.findById(session.metadata.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const cartItems = JSON.parse(session.metadata.cartItems);
    const storeProducts = await Product.find({ _id: { $in: cartItems.map(product => product.id) } });

    // Create a new Order
    const newOrder = new Order({
      user: user,
      products: cartItems.map((product) => ({
        product: storeProducts.find(p => p._id.equals(product.id)),
        quantity: product.quantity,
        variant: product.variant
      })),
      status: 'confirmed',
      paymentMethod: session.payment_method_types[0],
      totalAmount: totalAmountInChf,
      pickupDate: session.metadata.pickupDate,
      stripeSessionId: sessionId,
    });

    await newOrder.save();

    await sendOrderSuccessEmail(user.email, newOrder);

    res.status(200).json({
      success: true,
      message: "Payment successful, order created",
      order: newOrder,
    });
  } catch (error) {
    // console.error("Error processing successful checkout:", error);
    res.status(500).json({
      success: false,
      message: "Error processing successful checkout",
      error: error.message
    });
  }
};

export const createCashOrder = async (req, res) => {
  try {
    const { products, shippingDate, shippingPrice, shippingDiscount, totalAmount } = req.body;
    const user = req.user;

    const storeProducts = await Product.find({ _id: { $in: products.map(product => product._id) } });

    const orderProducts = products.map((product) => {
      const storeProduct = storeProducts.find(p => p._id.toString() === product._id);
      if (!storeProduct) {
        throw new Error(`Product with ID ${product.id} not found`);
      }
      return {
        product: storeProduct,
        quantity: product.quantity,
        price: storeProduct.current_seller.price,
      };
    });

    const newOrder = new Order({
      user: user,
      products: orderProducts,
      status: 'pending',
      shippingPrice: shippingPrice,
      shippingDate: shippingDate,
      shippingDiscount: shippingDiscount,
      paymentMethod: 'cash',
      totalAmount: totalAmount,
      stripeSessionId: Math.random().toString(36).substring(2, 15),
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Payment successful, order created, and email sent.",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      success: false,
      message: "Error processing successful checkout",
      error: error.message
    });
  }
}

// Create new coupon
async function createNewCoupon(userId) {
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discount: 10,
    discountType: 'percentage',
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),  // 30 days from now
    userId: userId,
  });

  await newCoupon.save();
  return newCoupon;
}

// Create Stripe coupon
async function createStripeCoupon(discount) {
  try {
    // Validate inputs
    if (!discount || isNaN(discount)) {
      throw new Error('Invalid discount value');
    }

    // Convert discount to appropriate format for Stripe
    let couponData = {
      duration: 'once',
      currency: 'chf',
    };
    // For fixed amount discounts (discountType === 'fixed' or 'amount')
    const amountOff = Math.round(discount);
    if (amountOff < 1) {
      throw new Error('Amount discount must be greater than 0');
    }
    couponData.amount_off = amountOff;

    const coupon = await stripe.coupons.create(couponData);
    return coupon.id;
  } catch (error) {
    console.error('Error creating Stripe coupon:', error);
    throw error;
  }
}
