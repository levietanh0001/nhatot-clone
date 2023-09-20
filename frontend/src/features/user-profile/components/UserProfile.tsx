import { lazy, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './UserProfile.module.scss';
import { 
  useDeleteUserProductById,
  useGetFavoriteProductCount,
  useGetProductCount,
  useGetUserFavoriteProducts,
  useGetUserProducts
} from '@/features/product/api/product.api';
import { AuthContext } from '@/contexts/auth/Auth.context';
import { SuspenseWrapper } from '@/components/suspense/SuspenseWrapper';
import { useGetUserProfile, useUploadAvatarImage } from '@/features/user-profile/api/user-profile.api';
import { useConsoleLogOnChange } from '@/hooks/utils.hook';
const TopLeftSideCardLayout = lazy(() => import('@/components/layouts/TopLeftSideCardLayout'));
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
  const navigate = useNavigate();
  
  const { data: userProfile } = useGetUserProfile(userId, true);
  useConsoleLogOnChange({ userProfile });
    

  const {
    data: userProducts,
    isLoading: isUserProductsLoading,
    refetch: refetchUserProducts,
  } = useGetUserProducts(userId, currentPage);
  const {
    data: userProductCount,
    isLoading: isUserProductCountLoading,
    refetch: refetchUserProductCount,
  } = useGetProductCount({ userId });
  const deleteUserProductById = useDeleteUserProductById(currentPage);

  const {
    data: favoriteProducts,
    isLoading: isFavoriteProductsLoading,
    refetch: refetchFavoriteProducts,
  } = useGetUserFavoriteProducts(
    currentPage,
    String(userId) === String(user?.userId)
  );
  const {
    data: favoriteProductCount,
    isLoading: isFavoriteProductCountLoading,
    refetch: refetchFavoriteProductCount,
  } = useGetFavoriteProductCount(
    userId,
    String(userId) === String(user?.userId)
  );

  const uploadAvatarImageMutation = useUploadAvatarImage();

  useEffect(() => {
    console.log({ currentTab });

    setCurrentPage(1);

    if (currentTab === 'userProducts') {
      refetchUserProducts();
      refetchUserProductCount();
    }

    if (currentTab === 'favoriteProducts') {
      refetchFavoriteProducts();
      refetchUserProductCount();
    }
  }, [currentTab]);

  useEffect(() => {
    console.log('current page changing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    if (currentTab === 'userProducts') {
      console.log('setting user products');

      if (!isUserProductsLoading) {
        setProducts(userProducts);
      }

      if (!isUserProductCountLoading) {
        setProductCount(userProductCount);
      }
    }

    if (currentTab === 'favoriteProducts') {
      console.log('setting favorite products');

      if (!isFavoriteProductsLoading) {
        setProducts(favoriteProducts);
      }

      if (!isFavoriteProductCountLoading) {
        setProductCount(favoriteProductCount);
      }
    }
  }, [
    currentTab,
    isUserProductsLoading,
    isFavoriteProductsLoading,
    userProducts,
    favoriteProducts,
    userProductCount,
    favoriteProductCount,
    isUserProductCountLoading,
    isFavoriteProductCountLoading,
  ]);

  useEffect(() => {
    if (deleteUserProductById.isSuccess) {
      toast.success('Xóa sản phẩm thành công');
    }

    if (deleteUserProductById.isError) {
      toast.error('Có lỗi khi xóa sản phẩm, vui lòng thử lại sau');
    }
  }, [deleteUserProductById.isSuccess, deleteUserProductById.isError]);

  useEffect(() => {

    if(!uploadAvatarImageMutation.isLoading && uploadAvatarImageMutation.data) {
      // console.log({ uploadedAvatarData: uploadAvatarImageMutation.data.data });
      toast.success('Đã tải ảnh lên thành công');
    }

    if(uploadAvatarImageMutation.isError) {
      toast.error('Chưa thể tải ảnh lên, vui lòng thử lại');
    }

  }, [uploadAvatarImageMutation.isLoading, uploadAvatarImageMutation.data]);

  const handleDeleteButtonClick = (productId) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?') === true) {
      deleteUserProductById.mutate(productId);
    }
  };

  const handleFavoriteButtonClick = (productId) => {
    console.log({ favoriteProductId: productId });
  };

  const handleEditButtonClick = (productId, slug) => {
    navigate(`/update-product/${productId}/${slug}`);
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const avatarImg = e.target.files?.[0];
    // console.log({ avatarImg: e.target.files?.[0] });
    if(avatarImg) {
      uploadAvatarImageMutation.mutate(avatarImg);
    } else {
      alert('Chưa thể tải ảnh lên, vui lòng thử lại');
    }
  }

  return (
    <>
      <SuspenseWrapper>
        <ToastContainer
          position='top-right'
          // hideProgressBar
          theme='colored'
          autoClose={3000}
        />

        <TopLeftSideCardLayout
          CardComponent={
            <SuspenseWrapper>
              <UserCard
                userProfile={userProfile}
                user={user}
                userId={Number(userId)}
                onAvatarChange={handleAvatarChange}
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
                  // onFavoriteButtonClick={handleFavoriteButtonClick}
                  onEditButtonClick={handleEditButtonClick}
                  productCount={productCount}
                  currentPage={currentPage}
                  onPageChange={(e, page) => setCurrentPage(page)}
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
