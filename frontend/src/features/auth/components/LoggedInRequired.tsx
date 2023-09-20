import jwt_decode from "jwt-decode";
import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '@/contexts/auth/Auth.context';
import { getNewTokens } from '@/utils/cryptography.util';


const LoggedInRequired = (props) => {

  const { 
    children, 
    redirectPath='/login',
  } = props;

  const authContext = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {

    const abortController = new AbortController();

    async function checkLoggedIn() {  
  
      const accessToken = localStorage.getItem('accessToken');

      if(!authContext) {
        setLoggedIn(false);
      }
  
      const user = authContext?.user;
  
      if(user) {
        setLoggedIn(true);
      }

      if(!user || !accessToken) {

        console.log('checking user refresh token');
        const refreshToken = localStorage.getItem('refreshToken');
        const newTokens = await getNewTokens(refreshToken, abortController.signal);

        // console.log({ newTokens });

        if(!newTokens) {
          setLoggedIn(false);
          authContext?.setUser(null);
        }

        if(newTokens) {
          localStorage.setItem('accessToken', newTokens.accessToken);
          localStorage.setItem('refreshToken', newTokens.refreshToken);
          setLoggedIn(true);
          const payload = jwt_decode(newTokens.accessToken);
          authContext?.setUser(payload);
        }

      }

      setChecking(false);

    };

    checkLoggedIn();

    return () => {
      setLoggedIn(false);
      abortController.abort();
    }

  }, []);


  if(!checking && !loggedIn) {
    // alert('Người dùng cần đăng nhập để truy cập trang này');
    return <Navigate to={redirectPath} replace />;
  }
  
  if(checking) {
    return <></>;
  }

  if(!checking) {
    return children ? children : <Outlet />;
  }

}

export default LoggedInRequired
