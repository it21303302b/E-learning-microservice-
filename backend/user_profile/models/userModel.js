const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['learner', 'instructor', 'admin'],
    required: true,
  },
});

// Additional properties like timestamps can be added if needed
userSchema.set('timestamps', true);

module.exports = mongoose.model('UserDetails', userSchema);
