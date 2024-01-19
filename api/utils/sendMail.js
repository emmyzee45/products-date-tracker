const nodemailer = require('nodemailer');

// Function to send a notification
module.exports = function sendNotification(product) {
    // Configure nodemailer with your email provider's details
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  
    // Email content
    const mailOptions = {
      from: process.env.USER_MAIL,
      to: product.creatorEmail,
      subject: 'Product Expiration Notification',
      text: `Your product "${product.title}" is about to expire on ${product.expiredAt}. Please take necessary actions.`,
    };
  
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }