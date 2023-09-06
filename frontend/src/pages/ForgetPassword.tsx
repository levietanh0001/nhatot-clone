import { PageForgetPasswordContent } from '~/components/features/auth/Auth';
import AuthLayout from '~/components/shared/layouts/AuthLayout';

const ForgetPasswordPage = () => {
  return <AuthLayout AuthComp={<PageForgetPasswordContent />} />;
};

export default ForgetPasswordPage;
