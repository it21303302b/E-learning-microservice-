const Payment = require('../model/paymentModel');
const axios = require('axios');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { cardHolderEmail, cardHolderName, courseIds, userId } = req.body;

    // Create a new payment
    const payment = new Payment({
      cardHolderEmail,
      cardHolderName,
      courseIds,
      userId
    });

    // Save the payment to the database
    await payment.save();

    res.status(201).json({ success: true, data: payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get all purchased courses
exports.getUserPurchasedCourses = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Fetch courses purchased by the user
    const userPayments = await Payment.find({ userId });
    const courseIds = userPayments.flatMap(payment => payment.courseIds);

    // Make a request to the courses service to fetch course details
    const coursesResponse = await axios.get('http://localhost:4001/api/courses', {
      params: { courseIds }, // Pass courseIds as query parameter
    });

    // Extract courses data from the response
    const purchasedCourses = coursesResponse.data;

    res.status(200).json({ success: true, data: purchasedCourses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
