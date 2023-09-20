import { object, string } from 'yup';


const passwordMinChar = 6;

const resetPasswordFormSchema = object({
  password: 
    string()
    .required('Mật khẩu không thể trống')
    .min(passwordMinChar, 'Mật khẩu cần ít nhất 6 ký tự')
});

export default resetPasswordFormSchema;