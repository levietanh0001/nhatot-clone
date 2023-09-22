import { FC } from 'react';
import { ILinkCardProps } from '@/features/home/interfaces/home.interface';
import styles from './CongCu.module.scss';


const LinkCard: FC<ILinkCardProps> = ({ children, className, href }) => {
  return (
    <a href={href}>
      <div className={className}>
        {children}
      </div>
    </a>
  );
};

// const Badge: FC<IBadgeProps> = ({ children, className }) => {
//   return (
//     <span className={className}>{children}</span>
//   );
// }

const CongCu = () => {

  return (
    <div className={styles['outer-wrapper']}>
      <h2 className={styles['h2']}>Công cụ tiện ích</h2>
      <div className={styles['inner-wrapper']}>

        <a href={'#'}>
          <div className={styles['bieu-do-gia']}>
            <span className={styles['bieu-do-gia__title']}>Biểu đồ giá</span>
            <span className={styles['bieu-do-gia__badge']}>
              <span>mới</span>
            </span>  
          </div>
        </a>

        <a href={'#'}>
          <div className={styles['vay-mua-nha']}>
            <span>Vay mua nhà</span>
          </div>
        </a>

        {/* <a href='#'>
          <div className={styles['bieu-do-gia']}>
            <span>Biểu đồ giá</span>
          </div>
        </a>

        <a href='#'>
          <div className={styles['vay-mua-nha']}>
            <span>Vay mua nhà</span>
          </div>
        </a> */}
        
      </div>
    </div>
  );
};

export default CongCu;
