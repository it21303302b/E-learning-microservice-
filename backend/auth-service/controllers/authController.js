const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const mongoose = require('mongoose');

async function registerUser(req, res) {
  const { firstName, lastName, email, mobileNumber, password, role } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

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

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid User ID' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // if (req.body.password) {
    //   // Hash password if being updated
    //   const salt = await bcrypt.genSalt(10);
    //   const hash = await bcrypt.hash(req.body.password, salt);
    //   req.body.password = hash;
    // }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function logoutUser(req, res) {
  res.json({ message: 'Logged out successfully.' });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
};
