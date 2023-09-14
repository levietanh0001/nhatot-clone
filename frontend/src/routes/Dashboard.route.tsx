import React from 'react';
import { Route } from 'react-router-dom';

import AdminOnly from '~/components/features/auth/AdminOnly';
import ProductsContent from '~/components/features/dashboard/ProductsContent';
import UsersContent from '~/components/features/dashboard/UsersContent';
import { SuspenseWrapper } from '~/components/ui/suspense/SuspenseWrapper';
import { DashboardProvider } from '~/contexts/dashboard/Dashboard.context';


const Dashboard = React.lazy(() => import('~/components/features/dashboard/Dashboard'));


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
        <Route path='users' element={<UsersContent />} />
        <Route path='products' element={<ProductsContent />} />
      </>
    ),
  }
]


export default dashboardRoutes;