import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '~/contexts/auth/AuthContext';


const AuthRequired = ({ children, redirectPath='/login' }) => {

  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default AuthRequired