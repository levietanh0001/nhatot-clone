import React from 'react';
import { Route } from 'react-router-dom';

import AdminOnly from '~/components/features/auth/AdminOnly';
import HomeDashboardContent from '~/components/features/dashboard/HomeDashboardContent';
import ProductsDashboardContent from '~/components/features/dashboard/ProductsDashboardContent';
import UsersDashboardContent from '~/components/features/dashboard/UsersDashboardContent';
import { SuspenseWrapper } from '~/components/ui/suspense/SuspenseWrapper';
import { DashboardProvider } from '~/contexts/dashboard/Dashboard.context';

const Dashboard = React.lazy(
  () => import('~/components/features/dashboard/Dashboard')
);

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <AdminOnly>
        <DashboardProvider>
          <SuspenseWrapper>
            <Dashboard />
          </SuspenseWrapper>
        </DashboardProvider>
      </AdminOnly>
    ),
    children: (
      <>
        <Route path='' element={<AdminOnly><HomeDashboardContent /></AdminOnly>} />
        <Route path='users' element={<AdminOnly><UsersDashboardContent /></AdminOnly>} />
        <Route path='products' element={<AdminOnly><ProductsDashboardContent /></AdminOnly>} />
      </>
    ),
  },
];

export default dashboardRoutes;
