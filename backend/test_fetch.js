const fetch = require('node-fetch');

const refreshToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoibGV3aWxsaWFtMDAwMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTAyMTAyODMsImV4cCI6MTcyMTc0NjI4M30.kZnB9T3CwD22M8Y8MSRHoDtXq0BieN4DjWp69jmwQCnZO_ZgO1PHfpXoMujFw1NSWNEQfTgJWCtr8zLs85tBPWfUr061WbzvNJSOLRLjMnZelBWYDSQP-CGBa89SC9VglFPvfyvHXSGICewq4nCXOtbNK0C0BpBjoUNd3kIkW8pZ2Ar6bhy-gs5WuRpxl6XRNoadA7hpohNc3LHkLKFL9Yu_6JfX3T7qZouL1XklnrOCQ9AulWjE1U6P2AdsEf5nEA3qto2geKtB6cSNrgQh7SJofmJCMcRVSP8WjF3WPPOHgfhlfylDuUoGuG1C3oZ9hxvgMx2v3eyv3a-XdcS5fA';

async function test() {

  const response = await fetch(new URL('auth/refresh', 'http://localhost:4000'), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${refreshToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken }),
  })

  const data = await response.json();

  console.log({ newTokens: data });
}

test();
