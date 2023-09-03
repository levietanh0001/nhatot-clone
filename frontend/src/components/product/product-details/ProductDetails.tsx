import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHandleQueryError from '~/hooks/error-handling.hook';
// import useDecodeAccessToken from '~/hooks/jwt.hook';
import { useGetProductById } from '~/hooks/product.hook';
import { useGetUserProfile } from '~/hooks/user.hook';
import ContentWithStickyBox from '~/layouts/ContentWithStickyBox';
import AboutProduct from './AboutProduct';
import ContactUser from './ContactUser';
import { useScrollToTop } from '~/hooks/pagination.hook';

const ProductDetails = () => {

  const { productId, slug } = useParams();
  const [userId, setUserId] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  
  useScrollToTop();

  const {
    data: product, 
    error: productError, 
    isLoading: isProductLoading, 
    isError: isProductError
  } = useGetProductById(productId, slug);
  const {
    data: userProfileData,
    error: userProfileError,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
  } = useGetUserProfile(product?.userId, !!product);

  useHandleQueryError(isProductError, productError);
  useHandleQueryError(isUserProfileError, userProfileError);

  useEffect(() => {
    if(!isProductLoading && !isProductError) {
      setUserId(parseInt(product?.userId));
    }
  }, [isProductLoading]);

  useEffect(() => {
    if(!isUserProfileLoading) {
      console.log({ userProfileData });
      setUserProfile(userProfileData);
    }
  }, [isUserProfileLoading]);

  return (
    <>
      {(!isProductLoading && !isUserProfileLoading) && (
        <ContentWithStickyBox
          content={<AboutProduct product={product} />}
          stickyBox={<ContactUser userId={userId} userProfile={userProfile} />}
        />
      )}
    </>
  );
};

ProductDetails.propTypes = {
  productId: PropTypes.number, 
  slug: PropTypes.string, 
  userId: PropTypes.number
}

export default ProductDetails;
