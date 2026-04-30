const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

const getRazorpay = () => new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payment/create-order
// Creates a Razorpay order and returns order_id to frontend
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees
    if (!amount) return res.status(400).json({ message: 'Amount is required' });

    const razorpay = getRazorpay();
    const options = {
      amount: Math.round(amount * 100), // Razorpay needs paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    console.error('Razorpay order error:', err.message);
    res.status(500).json({ message: 'Payment initiation failed: ' + err.message });
  }
};

// POST /api/payment/verify
// Verifies Razorpay payment signature, then saves order to DB
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerInfo,
      items,
      total,
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed. Invalid signature.' });
    }

    // Save order to MongoDB
    const order = await Order.create({
      user: req.user?._id || null,
      customerInfo,
      items,
      total,
      paymentMethod: 'online',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      status: 'confirmed', // already paid
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error('Verify payment error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createRazorpayOrder, verifyPayment };
