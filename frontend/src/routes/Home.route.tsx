import React from 'react';
import { SuspenseWrapper } from '@/components/suspense/SuspenseWrapper';

const HomePage = React.lazy(() => import('@/pages/Home.page'));

const homeRoutes = [
  {
    path: '/',
    element: (
      <SuspenseWrapper>
        <HomePage />
      </SuspenseWrapper>
    )
  }
]

export default homeRoutes;