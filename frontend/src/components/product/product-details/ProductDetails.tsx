import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHandleQueryError from '~/hooks/error-handling.hook';
import useDecodeAccessToken from '~/hooks/jwt.hook';
import { useGetProductById } from '~/hooks/product.hook';
import { useGetUserProfile } from '~/hooks/user.hook';
import ContentWithStickyBox from '~/layouts/ContentWithStickyBox';
import AboutProduct from './AboutProduct';
import ContactUser from './ContactUser';

const ProductDetails = () => {

  const { productId, slug, userId } = useParams();
  const [user, setUser] = useState<any | null>(null);
  const {
    data: product, 
    error: productError, 
    isLoading: isProductLoading, 
    isError: isProductError
  } = useGetProductById(productId, slug);
  const {
    data: userProfile,
    error: userProfileError,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
  } = useGetUserProfile(product?.userId, !!product);

  useHandleQueryError(isProductError, productError);
  useHandleQueryError(isUserProfileError, userProfileError);

  // const decodedPayload = useDecodeAccessToken();

  // useEffect(() => {
  //   setUser(userId);
  //   console.log({ productId });
  // }, []);

  useEffect(() => {
    if(!isProductLoading && !isProductError) {
      setUser({
        userId: product?.userId,

      })
    }
  }, [isProductLoading]);

  useEffect(() => {
    if(!isUserProfileLoading) {
      console.log({ userProfile });
    }
  }, [userProfile]);

  return (
    <>
      {!isProductLoading && (
        <ContentWithStickyBox
          content={<AboutProduct product={product} />}
          stickyBox={<ContactUser user={user} userProfile={userProfile} />}
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
