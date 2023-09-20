import { PageResetPasswordContent } from '@/features/auth/components/Auth';
import AuthLayout from '@/components/layouts/AuthLayout';


const ResetPasswordPage = () => {
  return <AuthLayout AuthComp={<PageResetPasswordContent />} />;
};


export default ResetPasswordPage;
