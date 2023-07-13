import { PageLoginContent } from "~/components/auth/LoginContent"
import AuthLayout from "~/layouts/AuthLayout"

const LoginPage = () => {
  return (
    <>
      <AuthLayout AuthComp={
        <PageLoginContent />
      } />
    </>
  )
}

export default LoginPage