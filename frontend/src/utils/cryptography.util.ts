import axios from "axios";


async function getNewTokens(refreshToken, signal) {

  try {

    const response = await fetch(new URL('auth/refresh', process.env.REACT_APP_BACKEND_BASE_URL), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken }),
      signal
    })

    const data = await response.json();

    console.log({ newTokens: data });

    if(!data.refreshToken) {
      return null;
    }

    return data;

  } catch(error) {

    return null;
  }

}


export async function getNewAccessAndRefreshTokens(refreshToken) {

  try {

    const response = await axios.post(new URL('auth/refresh', process.env.REACT_APP_BACKEND_BASE_URL).toString(), 
      { refreshToken },
      {
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
          'Content-Type': 'application/json'
        },
      }
    )

    const data = response.data;

    return data;

  } catch(error) {

    return null;
  }

}


async function verifyAccessToken(token, signal) {

  try {

    const response = await fetch(new URL('auth/verify-access-token', process.env.REACT_APP_BACKEND_BASE_URL), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      signal
    })

    const data = await response.json();

    if(!data.payload) {
      return null;
    }

    return data.payload;

  } catch(error) {
    return null;
  }

}


// async function verifyCurrentAccessToken(token) {

//   try {

//     const response = await fetch(new URL('auth/verify-access-token', process.env.REACT_APP_BACKEND_BASE_URL), {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })

//     const data = await response.json();

//     if(!data.payload) {
//       return null;
//     }

//     return data.payload;

//   } catch(error) {
//     return null;
//   }

// }


export { verifyAccessToken, getNewTokens };