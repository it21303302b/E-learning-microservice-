const express = require('express');
const router = express.Router();
const { createPayment, getAllPayments, getUserPurchasedCourses, getUserPayments } = require('../controller/paymentController');

// Create a new payment
router.post('/add', createPayment);

// Get all payments
router.get('/', getAllPayments);

// Get purchased courses by user ID
router.get('/user/:userId', getUserPurchasedCourses);

// Get all payments for a specific user
router.get('/user/:userId/payments', getUserPayments);

module.exports = router;
