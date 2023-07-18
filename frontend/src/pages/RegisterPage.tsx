import { PageRegisterContent } from '~/components/auth';
import AuthLayout from '~/layouts/AuthLayout';

const RegisterPage = () => {
  return <AuthLayout AuthComp={<PageRegisterContent />} />;
};

export default RegisterPage;
