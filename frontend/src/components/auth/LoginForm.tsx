import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { loginWithEmailAndPassword } from '~/firebase';
import styles from './LoginForm.module.scss';
import loginFormSchema from '~/schemas/auth/login-form-schema';
import { useNavigate } from 'react-router-dom';


type FormFieldValues = {
  email: string;
  // phoneNumber: string;
  password: string;
}

const LoginForm = () => {

  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<FormFieldValues>({
    mode: 'onBlur',
    resolver: yupResolver(loginFormSchema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormFieldValues, e) => {
    e.preventDefault();
    console.log(data);
    const { email, password } = data;

    // loginWithEmailAndPassword(data.email, data.password, (user) => {
    //   console.log({ user, email, password });
    //   navigate('/');
    // }, (error, errorMessage) => console.log({ error, errorMessage }));

  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit(onSubmit)} noValidate>

      <h1 className={styles['main-title']}>Đăng nhập</h1>

      <div className={styles['form-control']}>
        <label className={styles['floating-label']} htmlFor='email'>Email</label>
        <input 
          id='email' 
          // type='tel' 
          // inputMode='numeric' 
          placeholder=' '
          required
          {...register('email')}
        />
        <span className={styles['floating-label']}>Email</span>
      </div>
      <p className={styles["error"]}>{errors.email?.message}</p>

      <div className={styles['form-control']}>
        <label className={styles['floating-label']} htmlFor='password'>Mật khẩu</label>
        <input 
          id='password' 
          type='password' 
          placeholder=' '
          required
          {...register('password')} 
        />
        <span className={styles['floating-label']}>Mật khẩu</span>
      </div>
      <p className={styles["error"]}>{errors.password?.message}</p>

      <div className={styles['form-control']}>
        <a href='#' className={styles['forget-password']}>
          Quên mật khẩu?
        </a>
      </div>

      <div className={styles['form-control']}>
        <button className={styles['submit-btn']} type='submit'>
          Đăng nhập
        </button>
      </div>

    </form>
  );
};

export default LoginForm;
