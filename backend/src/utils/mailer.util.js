const nodemailer = require('nodemailer');
const { createAccessTokenAsync } = require('./cryptography.util');
const { constructUrlWithQueryParams } = require('./url.util');


function sendConfimationEmail(recipientEmail, confirmationUrl, purpose='để xác nhận email của bạn') {

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
    subject: 'Xác nhận email cho tài khoản nhatot-clone',
    html: `
      <h1>Dear ${recipientName}</h1>
      <p>Vui lòng bấm vào <a href="${confirmationUrl}">link</a> ${purpose}</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}


async function resendConfirmationEmail(res, email, userId) {

  const token = await createAccessTokenAsync({ email });

  const verifyRegisterUrl = constructUrlWithQueryParams(
    '/auth/verify-register', { token, userId }
  );

  // const verifyRegisterUrl = await constructUrlWithQueryParamsAsync(
  //   '/auth/verify-register', { token, userId }
  // );

  res.status(401).json({
    code: 'USER_NOT_VERIFIED',
    message: 'Tài khoản người dùng chưa được kích hoạt, đã gửi lại email xác nhận'
  })

  return sendConfimationEmail(recipientEmail = email, confirmationUrl = verifyRegisterUrl);

}


module.exports = { sendConfimationEmail, resendConfirmationEmail };