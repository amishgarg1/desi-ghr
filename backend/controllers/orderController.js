const Order = require('../models/Order');
const twilio = require('twilio');

const sendWhatsApp = async (to, message) => {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID || process.env.TWILIO_ACCOUNT_SID === 'your_twilio_account_sid') return;
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${to}`
    });
    console.log(`✅ WhatsApp sent to ${to}`);
  } catch (err) {
    console.log(`⚠️ WhatsApp not sent: ${err.message}`);
  }
};

// POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { customerInfo, items, total, paymentMethod } = req.body;
    if (!customerInfo || !items || !total || !paymentMethod)
      return res.status(400).json({ message: 'Missing required order fields' });

    const order = await Order.create({
      user: req.user?._id || null,
      customerInfo, items, total, paymentMethod
    });

    // Send WhatsApp notification
    const itemList = items.map(i => `• ${i.quantity}x ${i.name} — ₹${i.price * i.quantity}`).join('\n');
    const msg = `🍛 *New Order from Desi Ghr!*\n\nHello *${customerInfo.name}*,\n\nYour order has been placed:\n${itemList}\n\n*Total: ₹${total}*\nDelivery to: ${customerInfo.city}\n\nEstimated time: 30–45 mins. Thank you! 🙏`;
    
    if (customerInfo.phone) {
      await sendWhatsApp(customerInfo.phone, msg);
      order.whatsappSent = true;
      await order.save();
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/mine (logged-in user's orders)
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders (admin: all orders)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/orders/:id/status (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/stats (admin)
const getStats = async (req, res) => {
  try {
    const total = await Order.countDocuments();
    const revenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]);
    const pending = await Order.countDocuments({ status: 'pending' });
    const delivered = await Order.countDocuments({ status: 'delivered' });
    res.json({ totalOrders: total, totalRevenue: revenue[0]?.total || 0, pending, delivered });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus, getStats };
