import { object, ref, string } from 'yup';

const passwordMinChar = 6;

const registerFormSchema = object({
  userName:
    string(),
  email:
    string()
    .email('Email không hợp lệ')
    .required('Email không thể trống'),
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