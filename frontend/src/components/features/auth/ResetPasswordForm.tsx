import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '~/contexts/auth/AuthContext';

import FloatingLabelInput from '~/components/common/input/FloatingLabelInput';
import resetPasswordFormSchema from '~/schemas/auth/reset-password-form.schema';
import styles from './LoginForm.module.scss';

type FormFieldValues = {
  password: string;
};

const ResetPasswordForm = () => {
  const authContext = useContext(AuthContext);
  const [password, setPassword] = useState<string>('');
  const [resetToken, setResetToken] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    console.log({
      userId: params.get('userId'),
      resetToken: params.get('resetToken'),
    });

    setUserId(params.get('userId') ?? '');
    setResetToken(params.get('resetToken') ?? '');
  }, []);

  const form = useForm<FormFieldValues>({
    mode: 'onTouched',
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(resetPasswordFormSchema),
  });

  const { handleSubmit } = form;
  const onSubmit = async (data: FormFieldValues, e) => {
    e.preventDefault();

    setLoading(true);
    authContext
      ?.updateUserPassword(password, userId, resetToken)
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });

        if (data.code === 'SUCCESS') {
          return toast.success('Đã thay đổi mật khẩu thành công');
        }

        if (
          data.code === 'RESET_TOKEN_EXPIRED' ||
          data.code === 'RESET_TOKEN_INVALID'
        ) {
          return toast.error(
            'Hết hạn thay đổi mật khẩu, vui lòng gửi lại email xác nhận'
          );
        }

        return toast.error('Có lỗi xảy ra, vui lòng thử lại');
      })
      .catch((error) => {
        toast.error('Có lỗi xảy ra, vui lòng thử lại');
      })
      .finally(() => {
        setLoading(false);
      });

    // authContext?.resetUserPassword(email)
    //   .then(response => response.json())
    //   .then(data => {

    //     if(data.code === 'EMAIL_NOT_FOUND') {
    //       return toast.error('Tài khoản với email không tồn tại');
    //     }

    //     return toast.success('Đã gửi email xác nhận thay đổi mật khẩu')
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   })
  };

  return (
    <>
      {/* {JSON.stringify(error)} */}
      <ToastContainer position='top-right' theme='colored' autoClose={5000} />

      <FormProvider {...form}>
        <form
          className={styles['form']}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h1 className={styles['main-title']}>Thay đổi mật khẩu</h1>
          <FloatingLabelInput
            label='Mật khẩu mới'
            name='password' // important for RHF to identify input field
            inputValue={password}
            onInputValueChange={(event) => setPassword(event.target.value)}
            autoComplete='password'
            type='password'
          />

          <div className={styles['form-control']}>
            <button
              className={styles['submit-btn']}
              type='submit'
              disabled={loading}
            >
              Xác nhận thay đổi mật khẩu
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default ResetPasswordForm;
