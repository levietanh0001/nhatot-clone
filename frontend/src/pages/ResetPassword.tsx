import { PageResetPasswordContent } from '~/components/auth/Auth';
import AuthLayout from '~/layouts/AuthLayout';

const ResetPasswordPage = () => {
  return <AuthLayout AuthComp={<PageResetPasswordContent />} />;
};

export default ResetPasswordPage;
