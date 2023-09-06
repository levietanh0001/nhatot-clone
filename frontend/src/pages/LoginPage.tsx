import { PageLoginContent } from '~/components/features/auth';
import AuthLayout from '~/components/shared/layouts/AuthLayout';

const LoginPage = () => {
  return <AuthLayout AuthComp={<PageLoginContent />} />;
};

export default LoginPage;
