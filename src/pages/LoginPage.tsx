import LoginModalContent from "~/components/auth/LoginModalContent"
import AuthLayout from "~/layouts/AuthLayout"

const LoginPage = () => {
  return (
    <>
      <AuthLayout AuthComp={<LoginModalContent />} />
    </>
  )
}

export default LoginPage