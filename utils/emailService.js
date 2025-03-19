const nodemailer = require('nodemailer');

// Create a transporter
// NOTE: You'll need to replace these with your actual email service credentials
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail", // e.g., 'gmail'
    auth: {
      user: 'hoanghieufro@gmail.com',
      pass: 'vbji xder lyby znvy'

    }
  });
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset</h1>
        <p>You requested a password reset for your account.</p>
        <p>Please click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email: ', error);
    return false;
  }
};

module.exports = { sendPasswordResetEmail };
