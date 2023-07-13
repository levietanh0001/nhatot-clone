import clsx from 'clsx';
import styles from './ProductCategory.module.scss';


const ProductCategory = ({ 
  product, 
  onProductCategoryChange,
}) => {
  return (
    <div className={styles['product-category-wrapper']}>
      <h2 className={clsx('required', styles['title'])}>
        Phân loại bất động sản
      </h2>
      <div className={styles['product-category']}>
        <select
          name='productCategory'
          // value={product.productCategory}
          onChange={(e) => onProductCategoryChange(e.currentTarget.value)}
        >
          <option value=''>Chọn loại bất động sản</option>
          <option value='canhochungcu'>Căn hộ/Chung cư</option>
          <option value='nhao'>Nhà ở</option>
          <option value='khac'>Khác</option>
          {/* <option value='dat'>Đất</option>
          <option value='vanphong'>Văn phòng</option>
          <option value='matbangkinhdoanh'>Mặt bằng kinh doanh</option>
          <option value='phongtro'>Phòng trọ</option> */}
        </select>
        <span className={styles['dropdown-icon']}>
          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 320 512'><path d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z' /></svg>
        </span>
      </div>
    </div>
  );
};


export default ProductCategory;