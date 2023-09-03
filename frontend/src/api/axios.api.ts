import axios, { AxiosInstance } from 'axios';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import { IDecodedToken } from '~/interfaces/jwt.interface';
import { getNewAccessAndRefreshTokens } from '~/utils/cryptography';
import { backendBaseUrl } from '~/utils/variables.util';

export const axiosPublic = axios.create({
  baseURL: backendBaseUrl,
  timeout: 5000, // allowed time for an open request before being canceled (milliseconds)
  headers: {
    'Content-Type': 'application/json',
  },
}) as AxiosInstance;

axiosPublic.interceptors.request.use(function (config) {
  
  // console.log(config)
  return config;
}, function (error) {
  
  return Promise.reject(error);
});


export const axiosPrivate = axios.create({
  baseURL: backendBaseUrl,
  timeout: 5000, // allowed time for an open request before being canceled (milliseconds)
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${accessToken}`
  },
}) as AxiosInstance;

// refresh before request
axiosPrivate.interceptors.request.use(
  async (req) => {
    const accessToken = localStorage.getItem('accessToken');
    req.headers.Authorization = `Bearer ${accessToken}`;

    const payload = jwtDecode(String(accessToken)) as IDecodedToken;
    const isExpired = dayjs.unix(Number(payload.exp)).diff(dayjs()) < 1;

    if (!isExpired) {
      return req;
    }

    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken || refreshToken === 'undefined') {
      const e = new Error();
      e.name = 'InvalidRefreshToken';
      e.message = 'Refresh token is invalid';
      throw e;
    }

    const data = await getNewAccessAndRefreshTokens(refreshToken);

    if (!data) {
      const e = new Error();
      e.name = 'NoReponseFromServer';
      e.message = 'Refresh controller does not return anything';
      throw e;
    }

    console.log({ newTokenPair: data });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    req.headers.Authorization = `Bearer ${data.accessToken}`;

    return req;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// // refresh on response
// axiosPrivate.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (error) => {

//     const { response, config } = error;
//     // const status = response?.status;

//     // if not logging in and received response
//     if(config.url !== '/auth/login' && response) {

//       // if error Unauthorized
//       if ((response.status === 401 || response.status === 403) && !config._retry) {
//         config._retry = true;

//         try {

//           // get new access token and refresh token, set to header and save in localstorage
//           const currentRefreshToken = localStorage.getItem('refreshToken');
//           const data = await getNewAccessAndRefreshTokens(currentRefreshToken);

//           if(!data) {
//             throw new Error('refresh controller does not return anything');
//           }

//           if(data.code === 'USER_NOT_FOUND') {
//             const e = new Error();
//             e.name = 'USER_NOT_FOUND';
//             e.message = 'Please register';
//             throw e;
//           }

//           if(data.code === 'REFRESH_TOKEN_INVALID' || data.code === 'REFRESH_TOKEN_NOT_ALLOWED') {
//             const e = new Error();
//             e.name = 'REFRESH_TOKEN_INVALID';
//             e.message = 'Please login';
//             throw e;
//           }

//           axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
//           localStorage.setItem('accessToken', data.accessToken);
//           localStorage.setItem('refreshToken', data.refreshToken);

//           return axiosPrivate(config);

//         } catch(_error) {

//           console.error(_error);
//           return Promise.reject(_error);
//         }
//       }

//     }

//     return Promise.reject(error);
//   }
// );
