import Login from "~/components/auth/Login"
import AuthLayout from "~/layouts/AuthLayout"

const LoginPage = () => {
  return (
    <>
      <AuthLayout AuthComp={<Login />} />
    </>
  )
}

export default LoginPage