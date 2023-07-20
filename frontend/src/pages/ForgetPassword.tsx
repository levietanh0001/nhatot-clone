import { PageForgetPasswordContent } from '~/components/auth/Auth';
import AuthLayout from '~/layouts/AuthLayout';

const ForgetPasswordPage = () => {
  return <AuthLayout AuthComp={<PageForgetPasswordContent />} />;
};

export default ForgetPasswordPage;
