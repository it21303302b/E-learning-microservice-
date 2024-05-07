// userController.js

const User = require('../models/userModel');

class UserController {
  async registerUser(req, res) {
    try {
      const { firstName, lastName, mobileNumber, email, role } = req.body;
      const user = await User.create({
        firstName,
        lastName,
        mobileNumber,
        email,
        role,
      });
      res.json({ message: 'User registered successfully.', user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json({ user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updates = req.body;
      const options = { new: true }; // Return the updated user
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updates,
        options
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json({ message: 'User updated successfully.', user: updatedUser });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json({ message: 'User deleted successfully.' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new UserController();
