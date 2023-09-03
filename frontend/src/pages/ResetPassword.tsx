import { PageResetPasswordContent } from '~/components/features/auth/Auth';
import AuthLayout from '~/components/layouts/AuthLayout';

const ResetPasswordPage = () => {
  return <AuthLayout AuthComp={<PageResetPasswordContent />} />;
};

export default ResetPasswordPage;
