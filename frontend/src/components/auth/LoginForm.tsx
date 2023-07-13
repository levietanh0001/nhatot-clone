import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
// import Cookies from 'universal-cookie';

import styles from './LoginForm.module.scss';
import loginFormSchema from '~/schemas/auth/login-form-schema';
import { useNavigate } from 'react-router-dom';
import useFetch from '~/hooks/useFetch';
import FloatingLabelInput from '../input/FloatingLabelInput';

type FormFieldValues = {
  email: string;
  password: string;
};

// const cookies = new Cookies();

const LoginForm = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const { get, post, loading } = useFetch(
    process.env.REACT_APP_BACKEND_BASE_URL
  );
  const navigate = useNavigate();

  const form = useForm<FormFieldValues>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginFormSchema),
  });

  const { handleSubmit } = form;
  const onSubmit = (data: FormFieldValues, e) => {
    e.preventDefault();
    console.log({ data });
  };

  return (
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
  );
};

export default LoginForm;
