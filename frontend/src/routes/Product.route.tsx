import React from 'react';
import { SuspenseWrapper } from '~/components/common/suspense/SuspenseWrapper';
import LoggedInRequired from '~/components/features/auth/LoggedInRequired';

const PostProductPage = React.lazy(() => import('~/pages/PostProductPage'));
const ProductDetailsPage = React.lazy(() => import('~/pages/ProductDetailsPage'));
const ProductListPage = React.lazy(() => import('~/pages/ProductListPage'));
const UpdateProductPage = React.lazy(() => import('~/pages/UpdateProductPage'));


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