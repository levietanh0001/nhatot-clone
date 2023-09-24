import styles from './TopLeftSideCardLayout.module.scss';

const TopLeftSideCardLayout = ({ CardComponent, ContentComponent }) => {
  return (
    <div className={styles['container']}>
      <div className={styles['inner-wrapper']}>
        <div className={styles['card']}>
          {CardComponent}
        </div>
        <div className={styles['content']}>
          {ContentComponent}
        </div>
      </div>
    </div>
  );
}

// TopLeftSideCardLayout.propTypes = {
//   CardComponent: PropTypes.element,
//   ContentComponent: PropTypes.element,
// }

export default TopLeftSideCardLayout