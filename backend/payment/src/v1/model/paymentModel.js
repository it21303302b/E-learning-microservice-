const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  cardHolderEmail: {
    type: String,
    required: true
  },
  cardHolderName: {
    type: String,
    required: true
  },
  courseIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
