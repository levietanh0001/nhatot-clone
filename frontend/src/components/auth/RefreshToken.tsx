import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import jwt_decode from "jwt-decode";
import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '~/contexts/auth/AuthContext';
import { IDecodedToken } from "~/interfaces/jwt.interface";
import { getNewTokens } from '~/utils/cryptography';


// if access token expires, refresh token
const RefreshToken = ({ children }) => {

  const authContext = useContext(AuthContext);
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {

    const abortController = new AbortController();

    async function refreshTokenIfExpired() {  
  
      const accessToken = localStorage.getItem('accessToken');
      const payload = jwtDecode(String(accessToken)) as IDecodedToken;
      const isExpired = dayjs.unix(Number(payload.exp)).diff(dayjs()) < 1;

      if(!isExpired) {
        console.log('access token still valid');
        setChecking(false);
        return;
      }

      console.log('access token is invalid');
      const refreshToken = localStorage.getItem('refreshToken');
      const newTokens = await getNewTokens(refreshToken, abortController.signal);

      console.log({ newTokens });

      if(!newTokens) {
        authContext?.setUser(null);
      }

      if(newTokens) {
        localStorage.setItem('accessToken', newTokens.accessToken);
        localStorage.setItem('refreshToken', newTokens.refreshToken);
        const payload = jwt_decode(newTokens.accessToken);
        authContext?.setUser(payload);
      }

      setChecking(false);

    };

    refreshTokenIfExpired();

    return () => {
      abortController.abort();
    }

  }, []);


  // if(!checking && !loggedIn) {
  //   // alert('Người dùng cần đăng nhập để truy cập trang này');
  //   return <Navigate to={redirectPath} replace />;
  // }
  
  if(checking) {
    return <></>;
  }

  if(!checking) {
    return children ? children : <Outlet />;
  }

}

export default RefreshToken
