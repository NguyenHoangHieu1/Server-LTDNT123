const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const ResetToken = require('../models/resetTokenModel');
const { sendPasswordResetEmail } = require('../utils/emailService');

// @desc    Request password reset
// @route   POST /api/password-reset/request
// @access  Public
router.post('/request', asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Delete any existing tokens for this user
  await ResetToken.deleteMany({ userId: user._id });

  // Create a new reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash the token before saving it
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Save the token to the database
  await ResetToken.create({
    userId: user._id,
    token: hashedToken
  });

  // Create reset URL
  const resetUrl = `http://localhost:5000/reset-password/${resetToken}`;

  // Send email
  const emailSent = await sendPasswordResetEmail(user.email, resetUrl);

  if (emailSent) {
    res.status(200).json({ message: 'Password reset email sent' });
  } else {
    // If email sending fails, delete the token
    await ResetToken.deleteMany({ userId: user._id });
    res.status(500);
    throw new Error('Email could not be sent');
  }
}));

// @desc    Reset password
// @route   POST /api/password-reset/reset
// @access  Public
router.post('/reset', asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  // Hash the token from the URL
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  // Find the token in the database
  const resetToken = await ResetToken.findOne({ token: hashedToken });

  if (!resetToken) {
    res.status(400);
    throw new Error('Invalid or expired token');
  }

  // Find the user
  const user = await User.findById(resetToken.userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update the password
  user.password = password;
  await user.save();

  // Delete the token
  await ResetToken.deleteMany({ userId: user._id });

  res.status(200).json({ message: 'Password reset successful' });
}));

// @desc    Validate reset token
// @route   GET /api/password-reset/validate/:token
// @access  Public
router.get('/validate/:token', asyncHandler(async (req, res) => {
  const { token } = req.params;

  // Hash the token from the URL
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  // Find the token in the database
  const resetToken = await ResetToken.findOne({ token: hashedToken });

  if (!resetToken) {
    res.status(400);
    throw new Error('Invalid or expired token');
  }

  res.status(200).json({ valid: true });
}));

module.exports = router;
