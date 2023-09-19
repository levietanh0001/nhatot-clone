import { Link } from "react-router-dom";

import styles from './Card.module.scss';
import Image from '~/components/ui/image/Image';
import { placeholderImageSrc } from "~/utils/constants.util";
import { convertToInternationalCurrencySystem } from "~/utils/number.util";
import { timeAgo } from "~/utils/date.util";
import { FC } from "react";
import { ICard } from "./product-card-slider.interface";


const Card: FC<ICard> = (props) => {

  const { product } = props;
  const title = product?.postTitle ?? '';
  const imageSrc = product?.thumbnailImageUrl ?? '#';

  return (
    <Link to={`/product/${product.id}/${product.slug}.htm`} className={styles['card-wrapper']}>

      <div className={styles['card']}>
        <div className={styles['card-media']}>
          <Image
            width='100%'
            height='169px'
            alt={title}
            lazyLoading
            src={imageSrc}
            variant='rectangular'
            fallbackImageUrl={placeholderImageSrc}
          />

        </div>

        <div className={styles['card-content']}>
          <div className={styles['card-title']}>
            <p>{title}</p>
          </div>
          <div className={styles['card-details']}>
            <div>
              {!!product?.area && (
                <span>{product?.area} m<sup>2</sup> &middot; </span>
              )}
              {!!product?.numBedrooms && (
                <span>{product?.numBedrooms} PN &middot; </span>
              )}
              {!!product?.numBathrooms && (
                <span>{product?.numBathrooms} WC</span>
              )}
            </div>
            <div className={styles['card-body']}>
              <span className={styles['price']}>
                {String(convertToInternationalCurrencySystem(product?.price))}
                {product?.type === 'chothue' && '/tháng'}
              </span>
              <span className={styles['address']}>
                {product?.address ?? ''}
              </span>
            </div>
            <footer className={styles['card-footer']}>
              {product?.avatarUrl && (
                <Image
                  width='24px'
                  height='24px'
                  src={product?.avatarUrl}
                  fallbackImageUrl={placeholderImageSrc}
                  alt='Avatar'
                  lazyLoading
                  variant='circular'
                />
              )}
              {!product?.avatarUrl && (
                <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.<path d='M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z' /></svg>
              )}
              <span>{String(product?.userType).replace('canhan', 'cá nhân').replace('moigioi', 'môi giới')}</span>
              <span>{timeAgo(product?.updatedAt)}</span>
            </footer>
          </div>

        </div>

      </div>
    </Link>
  );
};

// Card.propTypes = {
//   children: PropTypes.node,
//   imageSrc: PropTypes.string,
//   title: PropTypes.string,
//   to: PropTypes.string
// }

export default Card;