import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.scss';
import AsBroker from './components/auth/AsBroker';
import LoggedInRequired from './components/auth/LoggedInRequired';
import { AuthProvider } from './contexts/auth/AuthContext';
import ForgetPasswordPage from './pages/ForgetPassword';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPassword';
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductListPage = lazy(() => import('./pages/ProductListPage'));
const PostProductPage = lazy(() => import('./pages/PostProductPage'));
const UpdateProductPage = lazy(() => import('./pages/UpdateProductPage'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
// const AdminPage = lazy(() => import('./pages/AdminPage'));
const Dashboard = lazy(() => import('./components/admin/dashboard/Dashboard'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// fallback component
export const SuspenseWrapper = ({ children, fallback = <></> }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

function App() {
  return (
    <BrowserRouter>
      <SuspenseWrapper>
        <AuthProvider>
          <Routes>
            <Route
              path='/'
              element={
                <SuspenseWrapper>
                  <HomePage />
                </SuspenseWrapper>
              }
            ></Route>
            <Route
              path='/post-product'
              element={
                <LoggedInRequired>
                  <SuspenseWrapper>
                    <PostProductPage />
                  </SuspenseWrapper>
                </LoggedInRequired>
              }
            ></Route>
            <Route
              path='/update-product/:productId'
              element={
                <LoggedInRequired>
                  <SuspenseWrapper>
                    <UpdateProductPage />
                  </SuspenseWrapper>
                </LoggedInRequired>
              }
            ></Route>

            <Route
              path='/product/:productId/:slug.htm'
              element={
                <SuspenseWrapper>
                  <ProductDetailsPage />
                </SuspenseWrapper>
              }
            ></Route>

            {/* <Route
              path='/product'
              element={
                <SuspenseWrapper>
                  <ProductDetailsPage />
                </SuspenseWrapper>
              }
            ></Route> */}

            <Route
              path='/product-list/:type'
              element={
                <SuspenseWrapper>
                  <ProductListPage />
                </SuspenseWrapper>
              }
            ></Route>

            <Route
              path='/chat'
              element={
                <SuspenseWrapper>
                  <ChatPage />
                </SuspenseWrapper>
              }
            ></Route>

            <Route
              path='/login'
              element={
                <SuspenseWrapper>
                  <LoginPage />
                </SuspenseWrapper>
              }
            ></Route>
            <Route
              path='/register'
              element={
                <SuspenseWrapper>
                  <RegisterPage />
                </SuspenseWrapper>
              }
            ></Route>
            <Route
              path='/forget-password'
              element={
                <SuspenseWrapper>
                  <ForgetPasswordPage />
                </SuspenseWrapper>
              }
            ></Route>
            <Route
              path='/reset-password'
              element={
                <SuspenseWrapper>
                  <ResetPasswordPage />
                </SuspenseWrapper>
              }
            ></Route>
            <Route
              path='/user-profile'
              element={
                <SuspenseWrapper>
                  <UserProfilePage />
                </SuspenseWrapper>
              }
            ></Route>

            {/* in need of a page that set role as broker */}
            <Route
              path='/dashboard'
              element={
                <LoggedInRequired>
                  <AsBroker>
                    <SuspenseWrapper>
                      <Dashboard />
                    </SuspenseWrapper>
                  </AsBroker>
                </LoggedInRequired>
              }
            ></Route>

            <Route
              path='*'
              element={
                <SuspenseWrapper>
                  <NotFound />
                </SuspenseWrapper>
              }
            ></Route>
          </Routes>
        </AuthProvider>
      </SuspenseWrapper>
    </BrowserRouter>
  );
}

export default App;
