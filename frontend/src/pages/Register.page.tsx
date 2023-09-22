import { PageRegisterContent } from '@/features/auth/components';
import AuthLayout from '@/components/layouts/AuthLayout';


const RegisterPage = () => {
  return <AuthLayout AuthComp={<PageRegisterContent />} />;
};


export default RegisterPage;
