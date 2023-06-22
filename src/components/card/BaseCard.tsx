import styles from './BaseCard.module.scss';

const BaseCard = ({ imgSrc, imgAlt, title, content, href }) => {
  return (
    <a href={href}>
      <div className={styles['card']}>
        <div className={styles['card-media']}>
          <img src={imgSrc} alt={imgAlt} />
        </div>
        <div className={styles['card-details']}>
          <div className={styles['card-title']}>{title}</div>
          <div className={styles['card-content']}>{content}</div>
        </div>
      </div>
    </a>
  );
};

export default BaseCard;
