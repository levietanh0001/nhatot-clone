import clsx from 'clsx';
import styles from './ProductType.module.scss';

const ProductType = ({ product, onProductTypeSelect }) => {

  return (
    <>
      <div className={styles['product-type-wrapper']}>
        <h2 className={clsx('required', styles['title'])}>
          Danh mục bất động sản
        </h2>
        <div className={styles['product-type']}>
          <ul>
            <li>
              <button
                type='button'
                className={clsx({
                  [styles['active']]: product.type === 'canban',
                })}
                onClick={() => onProductTypeSelect('canban')}
              >
                Cần bán
              </button>
            </li>
            <li>
              <button
                type='button'
                className={clsx({
                  [styles['active']]: product.type === 'chothue',
                })}
                onClick={() => onProductTypeSelect('chothue')}
              >
                Cho thuê
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductType;
