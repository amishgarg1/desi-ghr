const express = require('express');
const router = express.Router();
const { createRazorpayOrder, verifyPayment } = require('../controllers/paymentController');

router.post('/create-order', createRazorpayOrder);   // Step 1: create Razorpay order
router.post('/verify', verifyPayment);                // Step 2: verify & save after payment

module.exports = router;
