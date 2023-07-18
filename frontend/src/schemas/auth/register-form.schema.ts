import { number, object, ref, string } from 'yup';

const passwordMinChar = 6;

const registerFormSchema = object({
  email: 
    string()
    .required('Email không thể trống')
    .email('Email không hợp lệ'),
  password: 
    string()
    .required('Mật khẩu không thể trống')
    .min(passwordMinChar, 'Mật khẩu cần ít nhất 6 ký tự')
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
    //   "Cần có ít nhất 6 ký tự, 1 viết hoa, 1 viết thường, 1 chữ số và 1 ký tự đặc biệt"
    // )
  ,
  confirmPassword: 
    string()
    .required('Xác nhận mật khẩu không thể trống') 
    .oneOf<any>([ref('password'), null], 'Xác nhận mật khẩu phải khớp với mật khẩu'),
});

export default registerFormSchema;