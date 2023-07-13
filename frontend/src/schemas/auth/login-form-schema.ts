import { number, object, ref, string } from 'yup';

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const passwordMinChar = 6;

const schema = object({
  email: 
    string()
    .required('Email không thể trống')
    .email('Email không hợp lệ'),
  password: 
    string()
    .required('Mật khẩu không thể trống')
    .min(passwordMinChar, 'Mật khẩu cần ít nhất 6 ký tự')
  // username: 
  //   string()
  //   .required('Username is required'),
  // phoneNumber:
  //   string()
  //   .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
  //   .required('Số điện thoại không thể trống'),
    // .matches(/[a-zA-Z]/, 'Mật khẩu chỉ được phép để ký tự thuần Latin'),
  // passwordConfirmation: 
  //   string()
  //   .required('Xác nhận mật khẩu không thể trống') 
  //   .oneOf<any>([ref('password'), null], 'Xác nhận mật khẩu phải khớp với mật khẩu')

  // channel: 
  //   string()
  //   .required('Channel is required'),
});

export default schema;