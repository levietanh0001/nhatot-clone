import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './RegisterForm.module.scss';
import { registerFormSchema } from '~/schemas/auth';
import { useNavigate } from 'react-router-dom';
import FloatingLabelInput from '../common/input/FloatingLabelInput';
import { AuthContext } from '~/contexts/auth/AuthContext';
import { promiseWrapper } from '~/utils/function.util';
import { FirebaseError } from 'firebase/app';

type FormFieldValues = {
  userName: string | undefined;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const authContext = useContext(AuthContext);

  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<FormFieldValues>({
    mode: 'onTouched',
    resolver: yupResolver(registerFormSchema),
  });

  const { handleSubmit } = form;
  const onSubmit = async (data: FormFieldValues, e) => {
    e.preventDefault();
    console.log({ data });

    setLoading(true);
    authContext
      ?.registerUser(email, password, confirmPassword, userName)
      .then((data) => {
        if (data.code === 'USER_ALREADY_EXISTS') {
          toast.error('Tài khoản đã tồn tại, vui lòng đăng nhập');
        }

        if (data.code === 'SUCCESS') {
          toast.success(
            'Vui lòng kiểm tra email để xác minh tài khoản của bạn'
          );
        }
      })
      .catch((error) => {
        toast.error(JSON.stringify(error));
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
          <h1 className={styles['main-title']}>Đăng Ký</h1>

          <FloatingLabelInput
            label='Email'
            name='email' // important for RHF to identify input field
            inputValue={email}
            onInputValueChange={(event) => { setEmail(event.target.value) }}
            onBlur={() => setUserName(email.split('@')[0])}
            autoComplete='email'
            required
          />

          <FloatingLabelInput
            label='Password'
            name='password'
            type='password'
            inputValue={password}
            onInputValueChange={(event) => setPassword(event.target.value)}
            autoComplete='current-password'
            required
          />

          <FloatingLabelInput
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            inputValue={confirmPassword}
            onInputValueChange={(event) => setConfirmPassword(event.target.value)}
            required
          />

          <FloatingLabelInput
            label='Tên người dùng'
            name='userName' // important for RHF to identify input field
            inputValue={userName}
            onInputValueChange={(event) => setUserName(event.target.value)}
            autoComplete='name'
          />

          <div className={styles['form-control']}>
            <button
              className={styles['submit-btn']}
              type='submit'
              disabled={loading}
            >Đăng ký</button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default RegisterForm;
