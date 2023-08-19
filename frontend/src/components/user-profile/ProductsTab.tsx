import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ProductsTab.module.scss';


const ProductsTab = (props) => {

  const {
    // productCount, 
    userProductCount,
    favoriteProductCount,
    currentTab,
    setCurrentTab
  } = props;

  return (
    <>
      <div className={styles['tabs']}>
        <div className={styles['tab']} tabIndex={0}>
          <button className={clsx(styles['tab-btn'], { [styles['active']]: currentTab === 'userProducts' })} onClick={() => setCurrentTab('userProducts')}>
            Sản phẩm đã đăng ({ userProductCount ?? '' })
          </button>
        </div>
        <div className={styles['tab']} tabIndex={0}>
          <button className={clsx(styles['tab-btn'], { [styles['active']]: currentTab === 'favoriteProducts' })} onClick={() => setCurrentTab('favoriteProducts')}>
            Danh sách yêu thích ({ favoriteProductCount ?? '' })
          </button>
        </div>
        <div className={styles['tab']} tabIndex={0}>
          <button className={clsx(styles['tab-btn'], { [styles['active']]: currentTab === 'following' })} onClick={() => setCurrentTab('following')}>
            Đang theo dõi ()
          </button>
        </div>
      </div>
    </>
  );
};

ProductsTab.propTypes = {
  userProductCount: PropTypes.number,
  favoriteProductCount: PropTypes.number,
  currentTab: PropTypes.string,
  setCurrentTab: PropTypes.func
}

export default ProductsTab;
