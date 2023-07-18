import { PageLoginContent } from '~/components/auth';
import AuthLayout from '~/layouts/AuthLayout';

const LoginPage = () => {
  return <AuthLayout AuthComp={<PageLoginContent />} />;
};

export default LoginPage;
