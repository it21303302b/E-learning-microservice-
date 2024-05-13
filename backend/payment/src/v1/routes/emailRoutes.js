// routes/emailRoutes.js

const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controller/emailController');

// Endpoint to send emails
router.post('/send-email', sendEmail);

module.exports = router;
