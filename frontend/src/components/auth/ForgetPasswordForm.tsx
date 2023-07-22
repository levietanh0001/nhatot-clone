import { yupResolver } from '@hookform/resolvers/yup';
import { FirebaseError } from 'firebase/app';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '~/contexts/auth/AuthContext';

import forgetPasswordFormSchema from '~/schemas/auth/forget-password-form.schema';
import { promiseWrapper } from '~/utils/function.util';
import FloatingLabelInput from '../input/FloatingLabelInput';
import styles from './LoginForm.module.scss';


type FormFieldValues = {
  email: string;
};

const ForgetPasswordForm = () => {

  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<FormFieldValues>({
    mode: 'all',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgetPasswordFormSchema),
  });

  const { handleSubmit } = form;
  const onSubmit = async (data: FormFieldValues, e) => {
    e.preventDefault();
    console.log({ data });
    
    setLoading(true);
    toast.promise(promiseWrapper(authContext?.resetUserPassword(email)), {
      pending: 'Đang thực hiện yêu cầu...',
      success: 'Gửi email thành công',
      error: {
        render({ data }) {
          if(data instanceof FirebaseError && data.code === 'auth/user-not-found') {
            return `Lỗi: Tài khoản người dùng không tồn tại`;  
          } else {
            console.log(data);
            return `Lỗi: ${JSON.stringify((data))}`;
          }
        }
      },
    }).then(() => {
      setLoading(false);
    }).catch(e => {
      console.error(e);
    }).finally(() => {
      setLoading(false);
    });

  };

  return (
    <>
      {/* {JSON.stringify(error)} */}
      <ToastContainer position='top-center' hideProgressBar theme='colored' autoClose={false} />

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
            <button className={styles['submit-btn']} type='submit' disabled={loading}>Gửi email xác nhận</button>
          </div>

        </form>
      </FormProvider>
    </>
  );
};

export default ForgetPasswordForm;