// controller/emailController.js

const nodemailer = require('nodemailer');

// Function to send email
exports.sendEmail = async (req, res) => {
  const { to, subject, body } = req.body;

  try {
    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.elasticemail.com',
        port: 8003,
        secure: true, // Set to true if using SSL/TLS
        auth: {
          user: 'coursemate01@gmail.com',
          pass: 'AB11408803446F9CFD5CB6003581D5789467',
      },
    });

    // Define email options
    const mailOptions = {
      from: 'coursemate01@gmail.com',
      to,
      subject,
      text: body,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
};
