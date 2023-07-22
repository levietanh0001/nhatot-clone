const nodemailer = require('nodemailer');
// require('dotenv').config('../../.env');


function sendConfimationEmail(recipientEmail, confirmationUrl) {

  console.log('[utils/mailer.js].sendConfimationEmail', 'recipientEmail', recipientEmail);
  console.log('[utils/mailer.js].sendConfimationEmail', 'confirmationUrl', confirmationUrl);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.HOST_EMAIL,
      pass: process.env.NODEMAILER_PASS
    }
  });

  const recipientName = recipientEmail.split('@')[0];
  const mailOptions = {
    from: process.env.HOST_EMAIL,
    to: recipientEmail,
    subject: 'Please confirm your email address',
    html: `
            <h1>Email Confirmation</h1>
            <h2>Dear ${recipientName}</h2>
            <p>Please click on the following <a href="${confirmationUrl}">link</a> to confirm your email address</p>
        `,
  };

  return transporter.sendMail(mailOptions);
}


module.exports = { sendConfimationEmail };