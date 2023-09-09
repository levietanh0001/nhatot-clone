import { PageResetPasswordContent } from '~/components/features/auth/Auth';
import AuthLayout from '~/components/ui/layouts/AuthLayout';

const ResetPasswordPage = () => {
  return <AuthLayout AuthComp={<PageResetPasswordContent />} />;
};

export default ResetPasswordPage;
