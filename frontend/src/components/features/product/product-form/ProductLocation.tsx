import styles from './ProductLocation.module.scss';
import clsx from 'clsx';

import FloatingLabelInput from '~/components/shared/input/FloatingLabelInput';

const ProductLocation = ({ product, onProjectNameChange, onAddressChange }) => {
  return (
    <div className={styles['product-location']}>
      <h2 className={clsx(styles['title'], 'required')}>Vị trí bất động sản</h2>
      <div className={styles['project-name']}>
        <FloatingLabelInput
          name='projectName'
          label='Tên dự án'
          inputValue={product.projectName}
          onInputValueChange={onProjectNameChange}
        />
      </div>
      <div className={styles['product-address']}>
        <FloatingLabelInput
          name='address'
          label='Địa chỉ'
          inputValue={product.address}
          onInputValueChange={onAddressChange}
          required
        />
      </div>
    </div>
  );
};

export default ProductLocation;
