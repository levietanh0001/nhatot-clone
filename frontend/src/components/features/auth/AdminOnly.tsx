import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosPrivate } from '~/api/axios.api';

const AdminOnly = (props) => {

  const { children, redirectPath='/' } = props;
  const [asAdmin, setAsAdmin] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {

    const signal = new AbortController();

    async function verifyAdmin() {

      try {

        const response = await axiosPrivate.post('auth/verify-access-token', {
          signal
        });
  
        if(response.status === 200) {
  
          const data = response.data;
  
          const payload = data?.payload;
  
          if(payload?.role !== 'admin') {
            setAsAdmin(false);
            setChecking(false);
          }
  
          if(payload?.role === 'admin') {
            setAsAdmin(true);
            setChecking(false);
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