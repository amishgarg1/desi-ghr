const Order = require('../models/Order');
const twilio = require('twilio');

const OWNER_PHONE = process.env.OWNER_WHATSAPP_NUMBER || '+918655205735';

// Twilio WhatsApp sender (only works if Twilio is configured)
const sendWhatsApp = async (to, message) => {
  try {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    if (!sid || sid === 'your_twilio_account_sid') {
      console.log(`ℹ️  Twilio not configured — WhatsApp skipped for ${to}`);
      return;
    }
    const client = twilio(sid, process.env.TWILIO_AUTH_TOKEN);
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${to}`
    });
    console.log(`✅ WhatsApp sent to ${to}`);
  } catch (err) {
    console.log(`⚠️  WhatsApp send failed: ${err.message}`);
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

    const orderId = order._id.toString().slice(-6).toUpperCase();
    const itemList = items
      .map(i => `• ${i.quantity}x ${i.name} — ₹${i.price * i.quantity}`)
      .join('\n');

    // ── Message to OWNER ────────────────────────────────────────
    const ownerMsg =
      `🍛 *New Order — Desi Ghr!*\n\n` +
      `📋 Order ID: #${orderId}\n` +
      `👤 Customer: ${customerInfo.name}\n` +
      `📞 Phone: ${customerInfo.phone}\n` +
      `📧 Email: ${customerInfo.email}\n\n` +
      `📦 *Items:*\n${itemList}\n\n` +
      `💰 *Total: ₹${total}*\n` +
      `💳 Payment: ${paymentMethod.toUpperCase()}\n\n` +
      `🏠 *Address:*\n${customerInfo.address},\n${customerInfo.city} - ${customerInfo.pincode}\n\n` +
      `⏰ Please confirm & prepare!`;

    await sendWhatsApp(OWNER_PHONE, ownerMsg);

    // ── Message to CUSTOMER ──────────────────────────────────────
    if (customerInfo.phone) {
      const customerMsg =
        `✅ *Order Confirmed — Desi Ghr!*\n\n` +
        `Hello *${customerInfo.name}* 🙏\n\n` +
        `Order #${orderId} placed successfully!\n\n` +
        `🍽️ *Your items:*\n${itemList}\n\n` +
        `💰 *Total: ₹${total}*\n` +
        `📍 Delivery to: ${customerInfo.city}\n\n` +
        `⏱ Estimated: 30–45 mins\n` +
        `Thank you for ordering! ❤️`;

      await sendWhatsApp(customerInfo.phone, customerMsg);
    }

    order.whatsappSent = true;
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/mine
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders (admin)
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
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
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
