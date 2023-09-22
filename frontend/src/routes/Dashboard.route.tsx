import React from 'react';
import { Route } from 'react-router-dom';

import { SuspenseWrapper } from '@/components/suspense/SuspenseWrapper';
import AdminOnly from '@/features/auth/components/AdminOnly';
import HomeDashboardContent from '@/features/dashboard/components/dashboard-content/HomeDashboardContent';
import ProductsDashboardContent from '@/features/dashboard/components/dashboard-content/ProductsDashboardContent';
import UsersDashboardContent from '@/features/dashboard/components/dashboard-content/UsersDashboardContent';
import { DashboardProvider } from '@/features/dashboard/contexts/Dashboard.context';


const DashboardPage = React.lazy(() => import('@/pages/Dashboard.page'));

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
        <Route
          path=''
          element={
            <AdminOnly>
              <SuspenseWrapper>
                <HomeDashboardContent />
              </SuspenseWrapper>
            </AdminOnly>
          }
        />
        <Route
          path='users'
          element={
            <AdminOnly>
              <SuspenseWrapper>
                <UsersDashboardContent />
              </SuspenseWrapper>
            </AdminOnly>
          }
        />
        <Route
          path='products'
          element={
            <AdminOnly>
              <SuspenseWrapper>
                <ProductsDashboardContent />
              </SuspenseWrapper>
            </AdminOnly>
          }
        />
      </>
    ),
  },
];

export default dashboardRoutes;
