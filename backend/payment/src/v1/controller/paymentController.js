
const Payment = require('../model/paymentModel');

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
