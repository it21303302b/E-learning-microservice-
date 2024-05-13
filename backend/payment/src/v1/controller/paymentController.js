const Payment = require('../model/paymentModel');
const mongoose = require('mongoose');
const axios = require('axios');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { cardHolderEmail, cardHolderName, courseIds, userId, totalAmount } = req.body;

    // Create a new payment
    const payment = new Payment({
      cardHolderEmail,
      cardHolderName,
      courseIds,
      userId,
      totalAmount
    });

    // Save the payment to the database
    await payment.save();

    // Send email notification
    try {
      await axios.post('http://localhost:8003/api/send-email', {
        to: cardHolderEmail,
        subject: 'Purchase Successful',
        body: `Dear ${cardHolderName},\n\nYour purchase was successful.\n\nTotal Amount: ${totalAmount} LKR\n\nThank you for your purchase.`,
      });
    } catch (error) {
      console.error('Error sending email notification:', error);
    }

    res.status(201).json({ success: true, data: payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json({ success: true, data: payments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get purchased courses by user ID
exports.getUserPurchasedCourses = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from URL parameter

    // Ensure the user ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }

    // Fetch courses purchased by the user based on userId
    const userPayments = await Payment.findOne({ userId: req.params.userId }); // Find payment record for the specific userId
    if (!userPayments) {
      return res.status(404).json({ success: false, error: 'User has not purchased any courses' });
    }

    // Filter purchased course IDs (assuming Courses API doesn't filter)
    const purchasedCourseIds = await Promise.all(
      userPayments.courseIds.map(async (courseId) => {
        try {
          const response = await axios.get(`http://localhost:4001/api/courses/${courseId}`); 
          return response.data.exists; // Assuming the response contains an 'exists' property
        } catch (error) {
          console.error('Error checking course existence:', error);
          // Handle potential errors (e.g., course service unavailable)
          return false; // Or return another default value
        }
      })
    );

    // Make a request to the courses service to fetch course details for the valid courseIds
    const validCoursesResponse = await axios.get('http://localhost:4001/api/courses', {
      params: { courseIds: purchasedCourseIds.filter(id => id) }, // Filter out potentially invalid IDs
    });

    // Extract courses data from the response
    const purchasedCourses = validCoursesResponse.data;

    res.status(200).json({ success: true, data: purchasedCourses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get all payments for a specific user
exports.getUserPayments = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from URL parameter

    // Ensure the user ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }

    // Fetch payments for the user
    const userPayments = await Payment.find({ userId });

    if (userPayments.length === 0) {
      return res.status(404).json({ success: false, error: 'No payments found for this user' });
    }

    res.status(200).json({ success: true, data: userPayments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
