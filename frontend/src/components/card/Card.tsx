import clsx from 'clsx';
import React from 'react';
import styles from './Card.module.scss';

interface ICardProps {
  className: string, 
  imgSrc: string, 
  imgAlt: string, 
  title: string, 
  children?: React.ReactNode, 
  href: string
}

const Card: React.FC<ICardProps> = ({ className, imgSrc, imgAlt, title, href, children }) => {
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