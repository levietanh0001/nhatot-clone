import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '~/contexts/auth/AuthContext';

import FloatingLabelInput from '~/components/common/input/FloatingLabelInput';
import forgetPasswordFormSchema from '~/schemas/auth/forget-password-form.schema';
import styles from './LoginForm.module.scss';

type FormFieldValues = {
  email: string;
};

const ForgetPasswordForm = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<FormFieldValues>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgetPasswordFormSchema),
  });

  const { handleSubmit } = form;
  const onSubmit = async (data: FormFieldValues, e) => {
    e.preventDefault();

    setLoading(true);
    authContext
      ?.resetUserPassword(email)
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 'EMAIL_NOT_FOUND') {
          return toast.error('Tài khoản với email không tồn tại');
        }

        return toast.success('Đã gửi email xác nhận thay đổi mật khẩu');
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
          <h1 className={styles['main-title']}>Khôi phục mật khẩu</h1>
          <FloatingLabelInput
            label='Email'
            name='email' // important for RHF to identify input field
            inputValue={email}
            onInputValueChange={(event) => setEmail(event.target.value)}
            autoComplete='email'
          />

          <div className={styles['form-control']}>
            <button
              className={styles['submit-btn']}
              type='submit'
              disabled={loading}
            >
              Gửi email xác nhận
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default ForgetPasswordForm;
