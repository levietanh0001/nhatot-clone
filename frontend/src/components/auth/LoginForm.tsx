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
import FloatingLabelInput from '../input/FloatingLabelInput';
import { promiseWrapper } from '~/utils/function.util';
import { backendBaseUrl } from '~/utils/variables.util';


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
    toast.promise(promiseWrapper(authContext?.loginUser(email, password)), 
    {
      pending: 'Đang thực hiện yêu cầu...',
      success: 'Đăng nhập thành công',
      error: {
        render({ data }) {
          if(data instanceof FirebaseError && data.code === 'auth/invalid-email') {
            return `Lỗi: Email không hợp lệ`;
          } else if(data instanceof FirebaseError && data.code === 'auth/invalid-email-verified') {
            return `Lỗi: Email chưa được xác nhận`;
          } else if(data instanceof FirebaseError && data.code === 'auth/user-not-found') {
            return `Lỗi: Tài khoản này không tồn tại, vui lòng đăng ký mới`;
          } else if(data instanceof FirebaseError && data.code === 'auth/wrong-password') {
            return `Lỗi: Mật khẩu sai`;
          } else {
            console.log(data);
            return `Lỗi: ${JSON.stringify((data))}`;
          }
        }
      },
    }).then(() => {

      setLoading(false);
      navigate('/');
    }).catch(e => {
      console.error(e);
    }).finally(() => {
      setLoading(false);
    });

  };

  return (
    <>
      {/* {JSON.stringify(error)} */}
      <ToastContainer position='top-center' hideProgressBar theme='colored' autoClose={5000} />

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
            <Link to='/forget-password' className={styles['forget-password']}>Quên mật khẩu?</Link>
          </div>

          <div className={styles['form-control']}>
            <button className={styles['submit-btn']} type='submit' disabled={loading}>Đăng nhập</button>
          </div>

        </form>
      </FormProvider>
    </>
  );
};

export default LoginForm;
