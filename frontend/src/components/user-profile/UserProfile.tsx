import { lazy, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './UserProfile.module.scss';
import { SuspenseWrapper } from '~/App';
import { useGetUserProfile } from '~/hooks/user.hook';
import { useDeleteUserProductById, useGetFavoriteProductCount, useGetProductCount, useGetProducts, useGetUserFavoriteProducts, useGetUserProducts } from '~/hooks/product.hook';
import { ToastContainer, toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '~/contexts/auth/AuthContext';

const TopLeftSideCardLayout = lazy(
  () => import('~/layouts/TopLeftSideCardLayout')
);
const ProductListing = lazy(() => import('./ProductListing'));
const UserCard = lazy(() => import('./UserCard'));
const ProductsTab = lazy(() => import('./ProductsTab'));


const UserProfile = () => {

  const { userId } = useParams();
  const [currentTab, setCurrentTab] = useState<string>('userProducts');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<any[]>([]);
  const [productCount, setProductCount] = useState<number | null>();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  
  // refractor to remove userId from params
  // pagination must handle multiple product pages
  // set product count for user products and fav products (optimistic update?)
  // currentPage as query key for both products
  const { data: userProfile } = useGetUserProfile(userId, true);
  const { data: userProducts, isLoading: isUserProductsLoading, refetch: refetchUserProducts } = useGetUserProducts(userId, currentPage);
  const { data: userProductCount, isLoading: isUserProductCountLoading, refetch: refetchUserProductCount } = useGetProductCount({ userId });
  const deleteUserProductById = useDeleteUserProductById(currentPage);

  const { data: favoriteProducts, isLoading: isFavoriteProductsLoading, refetch: refetchFavoriteProducts } = useGetUserFavoriteProducts(currentPage, String(userId) === String(user?.userId));
  const { data: favoriteProductCount, isLoading: isFavoriteProductCountLoading, refetch: refetchFavoriteProductCount } = useGetFavoriteProductCount(userId, String(userId) === String(user?.userId));

  useEffect(() => {

    console.log({ currentTab });

    setCurrentPage(1);

    if(currentTab === 'userProducts') {
      refetchUserProducts();
      refetchUserProductCount();
    }
    
    if(currentTab === 'favoriteProducts') {
      refetchFavoriteProducts();
      refetchUserProductCount();
    }

  }, [currentTab]);

  useEffect(() => {
    console.log('current page changing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {

    if(currentTab === 'userProducts') {
      console.log('setting user products');

      if(!isUserProductsLoading) {
        setProducts(userProducts);
      }

      if(!isUserProductCountLoading) {
        setProductCount(userProductCount);
      }
    }

    if(currentTab === 'favoriteProducts') {
      console.log('setting favorite products');

      if(!isFavoriteProductsLoading) {
        setProducts(favoriteProducts);
      }

      if(!isFavoriteProductCountLoading) {
        setProductCount(favoriteProductCount);
      }
    }

  }, [currentTab, isUserProductsLoading, isFavoriteProductsLoading, userProducts, favoriteProducts, userProductCount, favoriteProductCount, isUserProductCountLoading, isFavoriteProductCountLoading]);

  useEffect(() => {
    if (deleteUserProductById.isSuccess) {
      toast.success('Xóa sản phẩm thành công');
    }

    if (deleteUserProductById.isError) {
      toast.error('Có lỗi khi xóa sản phẩm, vui lòng thử lại sau');
    }
  }, [deleteUserProductById.isSuccess, deleteUserProductById.isError]);

  const handleDeleteButtonClick = (productId) => {
    console.log({ deleteProductId: productId });
    deleteUserProductById.mutate(productId);
  };

  const handleFavoriteButtonClick = (productId) => {
    console.log({ favoriteProductId: productId });
  };

  return (
    <>
      <ToastContainer
        position='top-right'
        hideProgressBar
        theme='colored'
        autoClose={5000}
      />

      <SuspenseWrapper>
        <TopLeftSideCardLayout
          CardComponent={
            <SuspenseWrapper>
              <UserCard
                userProfile={userProfile}
                user={user}
                userId={Number(userId)}
              />
            </SuspenseWrapper>
          }
          ContentComponent={
            <SuspenseWrapper>
              <div className={styles['user-profile-wrapper']}>
                <ProductsTab
                  userProductCount={userProductCount}
                  favoriteProductCount={favoriteProductCount}
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                  user={user}
                  userId={Number(userId)}
                />
                <ProductListing
                  products={products}
                  onDeleteButtonClick={handleDeleteButtonClick}
                  onFavoriteButtonClick={handleFavoriteButtonClick}
                  productCount={productCount}
                  currentPage={currentPage}
                  onPageChange={(e, page) => {
                    setCurrentPage(page);
                    // sessionStorage.setItem('currentPage', JSON.stringify(page));
                  }}
                  user={user}
                  userId={Number(userId)}
                />
              </div>
            </SuspenseWrapper>
          }
        />
      </SuspenseWrapper>
    </>
  );
};

export default UserProfile;
