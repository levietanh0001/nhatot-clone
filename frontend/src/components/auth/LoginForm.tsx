import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { AuthContext } from '~/contexts/auth/AuthContext';
import { FirebaseError } from 'firebase/app';
import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './LoginForm.module.scss';
import { loginFormSchema } from '~/schemas/auth';
import { Link, useNavigate } from 'react-router-dom';
import FloatingLabelInput from '../common/input/FloatingLabelInput';
import { promiseWrapper } from '~/utils/function.util';
import { backendBaseUrl } from '~/utils/variables.util';
import jwtDecode from 'jwt-decode';

type FormFieldValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<FormFieldValues>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginFormSchema),
  });

  const { handleSubmit } = form;
  const onSubmit = async (data: FormFieldValues, e) => {
    e.preventDefault();
    console.log({ data });

    setLoading(true);

    authContext
      ?.loginUser(email, password)
      .then((data) => {
        console.log({ loginData: data });

        if (data.code === 'USER_NOT_VERIFIED') {
          toast.error(
            'Vui lòng kiểm tra xác nhận tài khoản trong email trước khi đăng nhập'
          );
        }

        if (data.accessToken) {
          const payload = jwtDecode(data.accessToken);
          authContext.setUser(payload);
          authContext.setAuthenticated(true);

          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          console.log({
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
          });

          setLoading(false);
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Lỗi khi đăng nhập, vui lòng thử lại');
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* {JSON.stringify(error)} */}
      <ToastContainer
        position='top-right'
        hideProgressBar
        theme='colored'
        autoClose={5000}
      />

      <FormProvider {...form}>
        <form
          className={styles['form']}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h1 className={styles['main-title']}>Đăng nhập</h1>
          <FloatingLabelInput
            label='Email'
            name='email' // important for RHF to identify input field
            inputValue={email}
            onInputValueChange={(event) => setEmail(event.target.value)}
            autoComplete='email'
          />

          <FloatingLabelInput
            label='Password'
            name='password'
            type='password'
            inputValue={password}
            onInputValueChange={(event) => setPassword(event.target.value)}
            autoComplete='current-password'
          />

          <div className={styles['form-control']}>
            <Link to='/forget-password' className={styles['forget-password']}>
              Quên mật khẩu?
            </Link>
          </div>

          <div className={styles['form-control']}>
            <button
              className={styles['submit-btn']}
              type='submit'
              disabled={loading}
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default LoginForm;
