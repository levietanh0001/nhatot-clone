import { PageRegisterContent } from '~/components/features/auth';
import AuthLayout from '~/components/layouts/AuthLayout';

const RegisterPage = () => {
  return <AuthLayout AuthComp={<PageRegisterContent />} />;
};

export default RegisterPage;
