import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHandleQueryError from '~/hooks/error-handling.hook';
import ContentWithStickyBox from '~/components/ui/layouts/ContentWithStickyBox';
import AboutProduct from './AboutProduct';
import ContactUser from './ContactUser';
import { useScrollToTop } from '~/hooks/pagination.hook';
import { useGetProductById } from '~/api/product.api';
import { useGetUserProfile } from '~/api/user-profile.api';


const ProductDetails = () => {
  const { productId, slug } = useParams();
  const [userId, setUserId] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  useScrollToTop();

  const {
    data: product,
    error: productError,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductById(productId, slug);
  const {
    data: userProfileData,
    error: userProfileError,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
  } = useGetUserProfile(product?.userId, !!product);
  // const {
  //   data: userIdForChat,
  //   error: userIdForChatError,
  //   isLoading: isUserIdForChatLoading,
  //   isError: isUserIdForChatError,
  // } = useGetUserIdForChat(userId);

  useHandleQueryError(isProductError, productError);
  useHandleQueryError(isUserProfileError, userProfileError);

  useEffect(() => {
    if (!isProductLoading && !isProductError) {
      setUserId(parseInt(product?.userId));
    }
  }, [isProductLoading]);

  useEffect(() => {
    if (!isUserProfileLoading) {
      // console.log({ userProfileData });
      setUserProfile(userProfileData);
    }
  }, [isUserProfileLoading]);

  return (
    <>
      {!isProductLoading && !isUserProfileLoading && (
        <ContentWithStickyBox
          content={<AboutProduct product={product} />}
          stickyBox={
            <ContactUser
              userId={userId ? String(userId) : ''}
              userProfile={userProfile}
            />
          }
        />
      )}
    </>
  );
};

// ProductDetails.propTypes = {
//   productId: PropTypes.number,
//   slug: PropTypes.string,
//   userId: PropTypes.number,
// };

export default ProductDetails;