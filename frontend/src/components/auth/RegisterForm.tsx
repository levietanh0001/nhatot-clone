import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './RegisterForm.module.scss';
import { registerFormSchema } from '~/schemas/auth';
import { useNavigate } from 'react-router-dom';
import FloatingLabelInput from '../input/FloatingLabelInput';
import { AuthContext } from '~/contexts/auth/AuthContext';

type FormFieldValues = {
  email: string;
  password: string;
  confirmPassword: string;
};


const RegisterForm = () => {

  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const form = useForm<FormFieldValues>({
    mode: 'all',
    resolver: yupResolver(registerFormSchema),
  });

  const { handleSubmit } = form;
  const onSubmit = async (data: FormFieldValues, e) => {
    e.preventDefault();
    console.log({ data });

    try {
      // setError(null);
      setLoading(true);

      await authContext?.registerUser(email, password);

      toast('Đăng ký tài khoản thành công', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);

      // throw new Error();

    } catch(e) {

      console.error(e);
      setError(e);
      toast('Lỗi khi đăng ký tài khoản, vui lòng thử lại sau', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      {/* {JSON.stringify(error)} */}
      {!error && <ToastContainer className={styles['success-toast-container']} bodyClassName={styles['success-toast-body']} toastClassName={styles['success-toast-wrapper']} />}
      {error && <ToastContainer className={styles['error-toast-container']} bodyClassName={styles['error-toast-body']} toastClassName={styles['error-toast-wrapper']} />}
      
      <FormProvider {...form}>
        <form
          className={styles['form']}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h1 className={styles['main-title']}>Đăng Ký</h1>
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

          <FloatingLabelInput
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            inputValue={confirmPassword}
            onInputValueChange={(event) => setConfirmPassword(event.target.value)}
          />

          <div className={styles['form-control']}>
            <a href='#' className={styles['forget-password']}>Quên mật khẩu?</a>
          </div>

          <div className={styles['form-control']}>
            <button className={styles['submit-btn']} type='submit' disabled={loading}>Đăng ký</button>
          </div>

        </form>
      </FormProvider>
    </>
  );
};

export default RegisterForm;
