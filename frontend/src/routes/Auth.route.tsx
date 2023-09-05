import React from 'react';
import { SuspenseWrapper } from '~/components/common/suspense/SuspenseWrapper';

const ForgetPasswordPage = React.lazy(() => import('~/pages/ForgetPassword'));
const LoginPage = React.lazy(() => import('~/pages/LoginPage'));
const RegisterPage = React.lazy(() => import('~/pages/RegisterPage'));
const ResetPasswordPage = React.lazy(() => import('~/pages/ResetPassword'));


const authRoutes = [
  {
    path:'/login',
    element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>
  },
  {
    path:'/register',
    element: <SuspenseWrapper><RegisterPage /></SuspenseWrapper>
  },
  {
    path:'/forget-password',
    element: <SuspenseWrapper><ForgetPasswordPage /></SuspenseWrapper>
  },
  {
    path:'/reset-password',
    element: <SuspenseWrapper><ResetPasswordPage /></SuspenseWrapper>
  },
]


export default authRoutes;
