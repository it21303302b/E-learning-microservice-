const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const mongoose = require('mongoose');

async function registerUser(req, res) {
  const { firstName, lastName, email, mobileNumber, password, role } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      role,
    });
    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: '1h',
    });
    res.header('authorization', `Bearer ${token}`).json({
      message: 'User registered successfully.',
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: 'Invalid email or password.' });
    } else {
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, config.jwtSecret, {
          expiresIn: '1h',
        });
        res.header('authorization', `Bearer ${token}`).json({
          message: 'Logged in successfully.',
          user,
          token,
        });
      } else {
        res.status(400).json({ error: 'Invalid email or password.' });
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function logoutUser(req, res) {
  res.json({ message: 'Logged out successfully.' });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
