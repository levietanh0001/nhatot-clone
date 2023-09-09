import React from 'react';
import { SuspenseWrapper } from '~/components/ui/suspense/SuspenseWrapper';

const ForgetPasswordPage = React.lazy(() => import('~/pages/ForgetPassword.page'));
const LoginPage = React.lazy(() => import('~/pages/Login.page'));
const RegisterPage = React.lazy(() => import('~/pages/Register.page'));
const ResetPasswordPage = React.lazy(() => import('~/pages/ResetPassword.page'));


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
