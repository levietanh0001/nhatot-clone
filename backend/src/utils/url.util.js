// require('dotenv').config('../../.env');

const baseUrl = process.env.BASE_URL;

function constructUrlWithQueryParams(route, data) {

  const url = new URL(
    route,
    baseUrl
  );

  url.search = new URLSearchParams(data);
  
  return url;

  // url.searchParams.set('verify-token', token);
  // const verifyRegisterUrl = url.toString();

  // return mailer.sendConfimationEmail(
  //   recipientEmail,
  //   confirmationUrl=verifyRegisterUrl
  // )
}

module.exports = {
  constructUrlWithQueryParams
}