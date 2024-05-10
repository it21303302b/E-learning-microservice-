const express = require('express');
const router = express.Router();
const { createPayment, getAllPayments, getUserPurchasedCourses } = require('../controller/paymentController');

// Create a new payment
router.post('/add', createPayment);

// Get all payments
// router.get('/', getAllPayments);

// Get purchased courses by user ID
router.get('/user/:userId', getUserPurchasedCourses);

module.exports = router;
