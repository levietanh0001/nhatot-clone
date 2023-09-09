import { PageForgetPasswordContent } from '~/components/features/auth/Auth';
import AuthLayout from '~/components/ui/layouts/AuthLayout';

const ForgetPasswordPage = () => {
  return <AuthLayout AuthComp={<PageForgetPasswordContent />} />;
};

export default ForgetPasswordPage;
