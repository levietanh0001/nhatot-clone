import { SuspenseWrapper } from '~/components/ui/suspense/SuspenseWrapper';
import LoggedInRequired from '~/components/features/auth/LoggedInRequired';
import { lazy } from 'react';

const PostProductPage = lazy(() => import('~/pages/PostProduct.page'));
const ProductDetailsPage = lazy(() => import('~/pages/ProductDetails.page'));
const ProductListPage = lazy(() => import('~/pages/ProductList.page'));
const UpdateProductPage = lazy(() => import('~/pages/UpdateProduct.page'));


const productRoutes = [
  {
    path: '/post-product',
    element: (
      <LoggedInRequired>
        <SuspenseWrapper>
          <PostProductPage />
        </SuspenseWrapper>
      </LoggedInRequired>
    )
  },
  {
    path: '/update-product/:productId/:slug',
    element: (
      <LoggedInRequired>
        <SuspenseWrapper>
          <UpdateProductPage />
        </SuspenseWrapper>
      </LoggedInRequired>
    )
  },
  {
    path: '/product/:productId/:slug.htm',
    element: <SuspenseWrapper><ProductDetailsPage /></SuspenseWrapper>
  },
  {
    path: '/product-list',
    element: <SuspenseWrapper><ProductListPage /></SuspenseWrapper>
  },
]

export default productRoutes;