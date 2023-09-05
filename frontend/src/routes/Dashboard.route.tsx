import React from 'react';
import { SuspenseWrapper } from '~/components/common/suspense/SuspenseWrapper';
import AsBroker from '~/components/features/auth/AsBroker';
import LoggedInRequired from '~/components/features/auth/LoggedInRequired';
const Dashboard = React.lazy(() => import('~/components/features/dashboard/Dashboard'));

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <LoggedInRequired>
        {/* <AsBroker> */}
          <SuspenseWrapper>
            <Dashboard />
          </SuspenseWrapper>
        {/* </AsBroker> */}
      </LoggedInRequired>

    )
  }
]

export default dashboardRoutes;