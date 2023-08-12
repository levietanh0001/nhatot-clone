import clsx from 'clsx';
import styles from './ProductCategory.module.scss';
import { SelectInput, SelectOption } from '~/components/common/input/SelectInput';
import { useController, useFormContext } from 'react-hook-form';

const ProductCategory = (props) => {
  const { product, onCategoryChange, name } = props;
  // const { control, formState } = useFormContext();
  // const { errors } = formState;
  // const { field } = useController({ name, control });

  return (
    // phai spread ...field vao select input
    // bo sung field.onChange
    <SelectInput
      name={name}
      label='Chọn loại bất động sản'
      required
      inputValue={product.category}
      onInputValueChange={(e) => onCategoryChange(e.currentTarget.value)}
      wrapperClass={styles['product-category-wrapper']}
      labelClass={clsx('required', styles['title'])}
      inputWrapperClass={styles['product-category']}
    >
      {selectOptions.map((item, index) => (
        // <SelectOption key={index} value={product.category} label={
        //   product.category === ''? 'Chọn loại bất động sản':
        //   product.category === 'canhochungcu'? 'Căn hộ/Chung cư':
        //   product.category === 'nhao'? 'Nhà ở': 'khac'
        // } inputOptionClass={item.inputOptionClass}
        // />
        <SelectOption key={index} value={item.value} label={item.label} />
      ))}
    </SelectInput>
  );
};

const selectOptions = [
  {
    value: '',
    label: 'Chọn loại bất động sản',
    inputOptionClass: '',
  },
  {
    value: 'canhochungcu',
    label: 'Căn hộ/Chung cư',
    inputOptionClass: '',
  },
  {
    value: 'nhao',
    label: 'Nhà ở',
    inputOptionClass: '',
  },
  {
    value: 'khac',
    label: 'Khác',
    inputOptionClass: '',
  },
];

export default ProductCategory;
