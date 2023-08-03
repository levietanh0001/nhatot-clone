import PropTypes from 'prop-types';
import axios from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/contexts/auth/AuthContext";
import { IDecodedToken } from "~/interfaces/jwt.interface";
import { getNewAccessAndRefreshTokens } from "~/utils/cryptography";
import { backendBaseUrl } from "~/utils/variables.util";


const axiosAuth = axios.create({
  baseURL: backendBaseUrl,
  timeout: 5000, // allowed time for an open request before being canceled (milliseconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

// interface IAxiosAuth {
//   url: string;
//   method: string;
//   requestConfig: object;
// }

const useAxiosAuth = () => {

  const authContext = useContext(AuthContext);

  useEffect(() => {

    const sendRequest = async () => {

      try {

        axiosAuth.interceptors.request.use(
          async (req) => {

            const accessToken = localStorage.getItem('accessToken');
            req.headers.Authorization = `Bearer ${accessToken}`;

            const payload = jwtDecode(String(accessToken)) as IDecodedToken;
            const isExpired = dayjs.unix(Number(payload.exp)).diff(dayjs()) < 1;
            
            if(!isExpired) {
              return req;
            }

            const refreshToken = localStorage.getItem('refreshToken');

            if(!refreshToken || refreshToken === 'undefined') {
              throw new Error('INVALID_REFRESH_TOKEN');
            }

            const data = await getNewAccessAndRefreshTokens(refreshToken);
          
            if(!data) {
              throw new Error('refresh controller does not return anything');
            }

            console.log({ newTokenPair: data });
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            authContext?.setAuthenticated(true);

            req.headers.Authorization = `Bearer ${data.accessToken}`;

            return req;

          },
          (error) => {

            console.error(error);
            return Promise.reject(error);
          }
        );

      } catch(error) {

        console.error(error);

      }

    }

    sendRequest();

  }, []);

  return { axiosAuth };
}

// useAxiosAuth.PropTypes = {
//   url: PropTypes.string,
//   method: PropTypes.string,
//   requestConfig: PropTypes.object
// }

export default useAxiosAuth