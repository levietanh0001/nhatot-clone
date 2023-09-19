import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '@api/axios.api';
import { IDecodedToken } from '~/interfaces/jwt.interface';
import { getNewTokens } from '~/utils/cryptography.util';


const AdminOnly = (props) => {

  const { children, redirectPath='/' } = props;
  const [asAdmin, setAsAdmin] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);
  const navigate = useNavigate();

  async function checkAdminRole(signal) {

    const response = await axiosPrivate.post('auth/verify-access-token', {
      signal
    });

    if(response.status === 200) {

      const data = response.data;

      console.log({ data });
      const payload = data?.payload;

      if(payload?.role !== 'admin') {
        setAsAdmin(false);
        setChecking(false);
      }

      if(payload?.role === 'admin') {
        setAsAdmin(true);
        setChecking(false);
      }
    } else {

      setAsAdmin(false);
      setChecking(false);
    }

  }

  useEffect(() => {

    const signal = new AbortController();

    async function verifyAdmin() {

      try {

        const accessToken = localStorage.getItem('accessToken');
        const payload = jwtDecode(String(accessToken)) as IDecodedToken;
        const isExpired = dayjs.unix(Number(payload.exp)).diff(dayjs()) < 1;

        if (!isExpired) {
          await checkAdminRole(signal);
          
        } else {
          
          const refreshToken = localStorage.getItem('refreshToken');
  
          if(!refreshToken) {
            setAsAdmin(false);
            setChecking(false);
          }
  
          const newTokens = await getNewTokens(refreshToken, signal);
  
          if(!newTokens) {
            setAsAdmin(false);
            setChecking(false);
          }
  
          if(newTokens) {
  
            localStorage.setItem('accessToken', newTokens.accessToken);
            localStorage.setItem('refreshToken', newTokens.refreshToken);
  
            await checkAdminRole(signal);
          }
        }


      } catch(error) {

        console.error(error);
        navigate('/login');
      }

    }

    verifyAdmin();

    return () => {

      setAsAdmin(false);
      setChecking(false);
      signal.abort();
    }

  }, []);

  if(!checking && !asAdmin) {
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

export default AdminOnly