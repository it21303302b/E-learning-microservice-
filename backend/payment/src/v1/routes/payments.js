// routes/paymentRoutes.js

const express = require('express');
const router = express.Router();
const { createPayment } = require('../controller/paymentController');

// Create a new payment
router.post('/add', createPayment);

module.exports = router;
