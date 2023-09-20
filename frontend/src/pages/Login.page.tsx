import { PageLoginContent } from '@/features/auth/components';
import AuthLayout from '@/components/layouts/AuthLayout';

const LoginPage = () => {
  return <AuthLayout AuthComp={<PageLoginContent />} />;
};

export default LoginPage;
