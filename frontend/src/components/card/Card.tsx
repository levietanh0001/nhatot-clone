import clsx from 'clsx';
import { FC } from 'react';
import styles from './Card.module.scss';
import { ICardProps } from './card.interface';


const Card: FC<ICardProps> = ({ className, imgSrc, imgAlt, title, href, children }) => {
  return (
    <div className={clsx(className, styles['card-wrapper'])}>
      <a href={href} className='card-link'>
        <div className='card'>
          <div className='card-media'>
            <img src={imgSrc} alt={imgAlt} />
          </div>
          <div className='card-details'>
            <div className='card-title'>{title}</div>
            <div className='card-content'>{children}</div>
          </div>
        </div>
      </a>
    </div>
  );
};


export default Card;