import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { AuthContext } from '~/contexts/auth/AuthContext';
import { FirebaseError } from 'firebase/app';
import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './LoginForm.module.scss';
import { loginFormSchema } from '~/schemas/auth';
import { useNavigate } from 'react-router-dom';
import FloatingLabelInput from '../input/FloatingLabelInput';


type FormFieldValues = {
  email: string;
  password: string;
};

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: false,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "light",
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

    try {
      setLoading(true);
      
      await authContext?.loginUser(email, password);
      navigate('/');
      console.log('no error occured');
      // throw new Error();

    } catch (e) {
      console.log('error occured');

      if(e instanceof FirebaseError && e.code === 'auth/user-not-found') {
        console.error(e);
        toast('Tài khoản người dùng không tồn tại, vui lòng đăng ký', toastOptions);
        console.log('user does not exist');
      } else {
        console.error(e);
        toast('Lỗi khi đăng nhập, vui lòng thử lại sau', toastOptions);
        console.log('general error');
      }
      
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      {/* {JSON.stringify(error)} */}
      <ToastContainer className={styles['error-toast-container']} bodyClassName={styles['error-toast-body']} toastClassName={styles['error-toast-wrapper']} />

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
            <a href='#' className={styles['forget-password']}>Quên mật khẩu?</a>
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
