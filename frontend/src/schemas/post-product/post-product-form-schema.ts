import { mixed, number, object, ref, string } from 'yup';


const postProductSchema = object({
  productCategory:
    mixed().oneOf(['canhochungcu', 'nhao']).required('Xin hãy chọn loại bất động sản'),
  productType:
    mixed().oneOf(['canban', 'chothue']).required('Xin hãy chọn danh mục bất động sản'),
  // projectName:
  //   // string().test('projectName', 'Cần ít nhất 6 ký tự', val => { if(val) { return val.toString().length >= 6 } }),
  //   string(),
  address:
    string().required('Địa chỉ không thể trống'),
  numBedrooms:
    // number().required('Số phòng ngủ không thể trống').positive('Số phòng cần lớn hơn 0'),
    // number().required().min(0, 'Số phòng ngủ cần lớn hơn 0'),
    // number().test('test-empty', 'Số phòng cần lớn hơn 1', val => { if(val){ return val > 1 } }),
    number().typeError('').required('Số phòng ngủ không thể trống').min(0, 'Số phòng không hợp lệ'),
  numBathrooms:
    number().typeError('').required('Số phòng tắm không thể trống').min(0, 'Số phòng không hợp lệ'),
  balconDirection:
    string(),
  mainDoorDirection:
    string(),
  hasLegalDocs:
    string(),
  furnitureStatus:
    string(),
  area:
    number().typeError('').required('Diện tích không thể trống').positive('Diện tích cần lớn hơn 0'),
  price:
    number().typeError('').required('Xin hãy điền giá').positive('Giá bất động sản cần lớn hơn 0'),
  deposit:
    number().typeError('').min(1*10**6, 'Số tiền đặt cọc cần lớn hơn 1,000,000'),
  postTile:
    string().min(10, 'Tiêu đề cần ít nhất 10 ký tự').max(100, 'Chỉ cho phép tối đa 100 ký tự'),
  description:
    string().min(10, 'Miêu tả cần ít nhất 6 ký tự').max(100, 'Chỉ cho phép tối đa 100 ký tự'),
  userType:
    mixed().oneOf(['canhan', 'moigioi']).required('Xin hãy chọn tư cách thành viên'),
});

export default postProductSchema;