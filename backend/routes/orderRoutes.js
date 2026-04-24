const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus, getStats } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', createOrder);                                  // public – guest can order too
router.get('/mine', protect, getMyOrders);                      // logged-in user
router.get('/stats', protect, adminOnly, getStats);             // admin stats
router.get('/', protect, adminOnly, getAllOrders);               // admin all orders
router.patch('/:id/status', protect, adminOnly, updateOrderStatus); // admin update status

module.exports = router;
