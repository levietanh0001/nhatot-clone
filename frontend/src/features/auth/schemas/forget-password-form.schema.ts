import { object, string } from 'yup';

const forgetPasswordFormSchema = object({
  email: 
    string()
    .required('Email không thể trống')
    .email('Email không hợp lệ'),
});

export default forgetPasswordFormSchema;