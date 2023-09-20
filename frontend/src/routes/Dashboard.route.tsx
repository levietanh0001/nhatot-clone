import React from 'react';
import { Route } from 'react-router-dom';

import AdminOnly from '~/components/features/auth/AdminOnly';
import HomeDashboardContent from '~/components/features/dashboard/dashboard-content/HomeDashboardContent';
import ProductsDashboardContent from '~/components/features/dashboard/dashboard-content/ProductsDashboardContent';
import UsersDashboardContent from '~/components/features/dashboard/dashboard-content/UsersDashboardContent';
import { SuspenseWrapper } from '~/components/ui/suspense/SuspenseWrapper';
import { DashboardProvider } from '~/contexts/dashboard/Dashboard.context';

// const Dashboard = React.lazy(
//   () => import('~/components/features/dashboard/Dashboard')
// );
const DashboardPage = React.lazy(
  () => import('~/pages/Dashboard.page')
);

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <AdminOnly>
        <DashboardProvider>
          <SuspenseWrapper>
            <DashboardPage />
          </SuspenseWrapper>
        </DashboardProvider>
      </AdminOnly>
    ),
    children: (
      <>
        <Route path='' element={<AdminOnly><SuspenseWrapper><HomeDashboardContent /></SuspenseWrapper></AdminOnly>} />
        <Route path='users' element={<AdminOnly><SuspenseWrapper><UsersDashboardContent /></SuspenseWrapper></AdminOnly>} />
        <Route path='products' element={<AdminOnly><SuspenseWrapper><ProductsDashboardContent /></SuspenseWrapper></AdminOnly>} />
      </>
    ),
  },
];

export default dashboardRoutes;
