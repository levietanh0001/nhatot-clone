import { Breadcrumbs, Link } from '@mui/material';
import styles from './Breadcrumb.module.scss';
import { NavigateNext } from '@mui/icons-material';

const Breadcrumb = () => {
  return (
    <div className={styles['wrapper']}>
      <div className='container'>
        <Breadcrumbs
          aria-label='breadcrumb'
          separator='>'
          // separator={<NavigateNext />}
          maxItems={2}
          itemsBeforeCollapse={2}
          sx={{ fontSize: '0.875rem' }}
        >
          <Link underline='hover' href='#'>
            Nhà tốt
          </Link>
          <Link underline='hover' href='#'>
            Mua bán bất động sản
          </Link>
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default Breadcrumb;
