import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentWithStickyBox from '@/components/layouts/ContentWithStickyBox';
import { useGetProductByIdAndSlug } from '@/features/product/api/product.api';
import { useGetUserProfile } from '@/features/user-profile/api/user-profile.api';
import useHandleQueryError from '@/hooks/error-handling.hook';
import { useScrollToTop } from '@/hooks/pagination.hook';
import AboutProduct from './AboutProduct';
import ContactUser from './ContactUser';
import { useTopLoadingBar } from '@/contexts/top-loading-bar/TopLoadingBar.context';
import {
  updateFavoriteList,
  useGetUserFavoriteList,
  usePopulateFavoritelist,
} from '@/features/product/api/favorite-list.api';
import { AuthContext } from '@/contexts/auth/Auth.context';

const ProductDetails = () => {
  const { productId, slug } = useParams();
  const authContext = useContext(AuthContext);
  const [userId, setUserId] = useState<number | null>(null);
  const [favoriteProductIds, setFavoriteProductIds] = useState<any[]>([]);
  const { data: userFavoriteList, isLoading: isUserFavoriteListLoading } =
    useGetUserFavoriteList();

  useEffect(() => {
    if (userFavoriteList) {
      setFavoriteProductIds(userFavoriteList?.productIds);
    }
  }, [userFavoriteList]);

  // usePopulateFavoritelist(setFavoriteProductIds);
  // const [userProfile, setUserProfile] = useState<any | null>(null);

  useScrollToTop();

  const {
    data: product,
    error: productError,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductByIdAndSlug(productId, slug);
  const {
    data: userProfileData,
    error: userProfileError,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
  } = useGetUserProfile(product?.userId, !!product);

  console.log({ productId, slug });

  // const {
  //   data: userIdForChat,
  //   error: userIdForChatError,
  //   isLoading: isUserIdForChatLoading,
  //   isError: isUserIdForChatError,
  // } = useGetUserIdForChat(userId);
  useTopLoadingBar(
    isUserProfileLoading || isProductLoading || isUserFavoriteListLoading
  );

  useHandleQueryError(isProductError, productError);
  useHandleQueryError(isUserProfileError, userProfileError);

  useEffect(() => {
    if (!isProductLoading && !isProductError) {
      setUserId(parseInt(product?.userId));
    }
  }, [isProductLoading]);

  const handleFavoriteButtonClick = (productId: number) => {
    updateFavoriteList(
      productId,
      favoriteProductIds,
      setFavoriteProductIds,
      authContext
    );
  };

  return (
    <>
      {/* {JSON.stringify({favoriteProductIds, productId: product?.id})} */}
      {product && userProfileData && favoriteProductIds && (
        <ContentWithStickyBox
          content={
            <AboutProduct
              product={product}
              favoriteProductIds={favoriteProductIds}
              onFavoriteButtonClick={handleFavoriteButtonClick}
            />
          }
          stickyBox={
            <ContactUser
              userId={userId ? String(userId) : ''}
              userProfile={userProfileData}
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
