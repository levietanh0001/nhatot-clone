import React from 'react';
import { SuspenseWrapper } from '~/components/ui/suspense/SuspenseWrapper';
import LoggedInRequired from '~/components/features/auth/LoggedInRequired';

const PostProductPage = React.lazy(() => import('~/pages/PostProduct.page'));
const ProductDetailsPage = React.lazy(() => import('~/pages/ProductDetails.page'));
const ProductListPage = React.lazy(() => import('~/pages/ProductList.page'));
const UpdateProductPage = React.lazy(() => import('~/pages/UpdateProduct.page'));


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
    path: '/update-product/:productId',
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