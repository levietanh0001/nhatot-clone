import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '~/contexts/auth/AuthContext';


const AuthRequired = ({ children, redirectPath='/login' }) => {

  const authContext = useContext(AuthContext);

  if(!authContext) {
    alert('No auth context');
    return <Navigate to={redirectPath} replace />;
  }

  const user = authContext.user;

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  user.reload();

  console.log({
    user,
    isVerified: user?.emailVerified
  })

  if(user && !user?.emailVerified) {
    alert('Tài khoản chưa được kích hoạt, vui lòng kiểm tra email ' + user.email);
    return <Navigate to='/' replace />;
  }

  return children ? children : <Outlet />;
}

export default AuthRequired