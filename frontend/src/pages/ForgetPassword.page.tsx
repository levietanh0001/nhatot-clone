import { PageForgetPasswordContent } from '@/features/auth/components/Auth';
import AuthLayout from '@/components/layouts/AuthLayout';


const ForgetPasswordPage = () => {
  return <AuthLayout AuthComp={<PageForgetPasswordContent />} />;
};

export default ForgetPasswordPage;
