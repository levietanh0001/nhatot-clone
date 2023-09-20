import { lazy } from 'react';
import { SuspenseWrapper } from '@/components/suspense/SuspenseWrapper';

const ForgetPasswordPage = lazy(() => import('@/pages/ForgetPassword.page'));
const LoginPage = lazy(() => import('@/pages/Login.page'));
const RegisterPage = lazy(() => import('@/pages/Register.page'));
const ResetPasswordPage = lazy(() => import('@/pages/ResetPassword.page'));


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
