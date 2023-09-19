import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '~/contexts/auth/Auth.context';
import { backendBaseUrl } from '~/utils/constants.util';


const UpdateUserProfile = ({ children, redirectPath='/login' }) => {

  const authContext = useContext(AuthContext);

  if(!authContext) {
    alert('Người dùng cần đăng nhập để truy cập trang này');
    return <Navigate to={redirectPath} replace />;
  }

  const user = authContext.user;

  if (!user) {
    alert('Người dùng cần đăng nhập để truy cập trang này');
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

  fetch(new URL('api/user', backendBaseUrl), {
    method: 'POST'
  })
    .then(response => response.json())
    .then(data => {

      return children ? children : <Outlet />;
    })
    .catch(error => {
      console.error(error);
      alert('Có lỗi xảy ra, vui lòng thử lại');
      return <Navigate to='/' replace />;
    })

}

export default UpdateUserProfile