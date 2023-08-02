import { array, mixed, number, object, ref, string } from 'yup';
import { validateFilesSize } from '~/utils/file.util';
import { commaSeparatedStringToNumber, isNumeric } from '~/utils/number.util';


const postProductSchema = object({
  productCategory:
    string().required('Xin hãy chọn loại bất động sản'),
  // productType:
  //   string().required('Xin hãy chọn danh mục bất động sản').oneOf(['canban', 'chothue']),
  // projectName:
  //   // string().test('projectName', 'Cần ít nhất 6 ký tự', val => { if(val) { return val.toString().length >= 6 } }),
  //   string(),
  address:
    string().typeError('').required('Địa chỉ không thể trống'),
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
  legalDocsStatus:
    string(),
  furnitureStatus:
    string(),
  area:
    string().typeError('').required('Diện tích không thể trống')
    .test('area-has-no-comma-separator', 'Phần thập phân cần được ngăn cách bằng dấu chấm "."', (val) => {
      return String(val).includes(',')? false: true;
    })
    .test('is-area-positive', 'Diện tích phải là một số lớn hơn 0', (val) => {
      return Number(val) > 0;
    }),
    // .test('is-area-numeric', 'Diện tích phải là một số', (val) => {
    //   return isNumeric(val);
    // })
    // .test('area-positive', 'Diện tích cần lớn hơn 0', (val) => {
    //   if(val) {
    //     return parseFloat(val) > 0
    //   }
    // })
  price:
    string().typeError('').required('Xin hãy điền giá')
    .test('is-price-numeric', 'Xin hãy điền một giá trị số', (val) => {
      if(val) {
        return typeof commaSeparatedStringToNumber(val) === 'number';
      }
    })
    .test('min-price', 'Giá quá thấp', (val) => {
      if(val) {
        return commaSeparatedStringToNumber(val) >= 1*10**6;
      }
    }),
  deposit:
    string().typeError('').test('min-deposit', 'Số tiền đặt cọc quá thấp', (val) => {
      if(val) {
        return commaSeparatedStringToNumber(val) >= 1*10**6;
      }
      return true;
    }),
  postTitle:
    string().typeError('').required('Tiêu đề không thể trống').min(10, 'Tiêu đề cần ít nhất 10 ký tự').max(100, 'Chỉ cho phép tối đa 100 ký tự'),
  description:
    string().typeError('').required('Miêu tả không thể trống').min(6, 'Miêu tả cần ít nhất 6 ký tự').max(200, 'Chỉ cho phép tối đa 200 ký tự'),
  // userType:
  //   mixed().oneOf(['canhan', 'moigioi']).required('Xin hãy chọn tư cách thành viên'),

  // // file input cannot set file type value, thus no validation
  // images:
  //   array()
  //   .required('Sản phẩm cần có ảnh'),
  //   // .min(2, 'Cần có ít nhất 2 ảnh cho sản phẩm'),
  // videos:
  //   array().nullable().test('are-files-oversized', 'Video vượt quá dung lượng cho phép', (val) => {
  //     return validateFilesSize(val, 10); // mb
  //   }),
});

export default postProductSchema;