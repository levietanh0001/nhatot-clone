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
import { promiseWrapper } from '~/utils/function.util';
import { FirebaseError } from 'firebase/app';

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

    setLoading(true);
    toast.promise(promiseWrapper(authContext?.registerUser(email, password)), {
      pending: 'Đang thực hiện yêu cầu...',
      success: 'Gửi email xác nhận thành công',
      error: {
        render({ data }) {
          if(data instanceof FirebaseError && data.code === 'auth/email-already-in-use') {
            return `Lỗi: Email đã tồn tại`;
          } else {
            console.log(data);
            return `Lỗi: ${JSON.stringify((data))}`;
          }
        }
      },
    }).then(() => {
      setLoading(false);
      navigate('/login');
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
        <form className={styles['form']} onSubmit={handleSubmit(onSubmit)} noValidate>
          
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
            <button className={styles['submit-btn']} type='submit' disabled={loading}>Đăng ký</button>
          </div>

        </form>
      </FormProvider>
    </>
  );
};

export default RegisterForm;
