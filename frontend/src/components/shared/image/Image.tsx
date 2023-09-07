import { Skeleton } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { IIMage } from './Image.interface';
import useId from '@mui/material/utils/useId';

const Image: FC<IIMage> = (props) => {

  const {
    src,
    alt,
    fallbackImageUrl = '',
    lazyLoading = true,
    width,
    height,
    variant = 'rectangular',
    reserverSpace=false
  } = props;

  const imgId = useId();

  const [loading, setLoading] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {

    const imgEl = imgRef.current;

    if (imgEl && imgEl.complete) {
      handleLoad();
    }

  }, []);

  const handleLoad = () => {
    // console.log('loaded');
    setLoading(false);
  }

  return (
    <>
      {/* {loading && (
        <Skeleton variant={variant} width={width} height={height} />
      )} */}
      {/* {JSON.stringify(loading)} */}
      {/* {!loading && ( */}
        <img
          id={imgId}
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{
            width,
            height,
            borderRadius: variant === 'circular' ? '50%' : '0',
            // ...(!reserverSpace) && { display: loading ? 'none' : 'initial' },
            // ...(reserverSpace) && { visibility: loading ? 'hidden' : 'initial' },
          }}
          loading={lazyLoading ? 'lazy' : 'eager'}
          onError={(e) => {
            console.log('error loading');
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImageUrl;
            // e.currentTarget.src = src;
          }}
          onLoad={handleLoad}
          // onLoadedData={handleLoad}
          // onLoadCapture={handleLoad}
        />

      {/* )} */}
      


    </>
  )
}

export default Image