import React from 'react';
import LoggedInRequired from '~/components/features/auth/LoggedInRequired';
import { SuspenseWrapper } from '~/components/ui/suspense/SuspenseWrapper';

const Dashboard = React.lazy(() => import('~/components/features/dashboard/Dashboard'));

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <LoggedInRequired>
        <SuspenseWrapper>
          <Dashboard />
        </SuspenseWrapper>
      </LoggedInRequired>

    )
  }
]

export default dashboardRoutes;