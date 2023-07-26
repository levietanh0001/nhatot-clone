import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./App.scss";
import Counter from "./components/counter";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/auth/AuthContext";
import LoggedInRequired from "./components/auth/LoggedInRequired";
import ForgetPasswordPage from "./pages/ForgetPassword";
import AsBroker from "./components/auth/AsBroker";
import ResetPasswordPage from "./pages/ResetPassword";
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductListPage = lazy(() => import("./pages/ProductListPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const Dashboard = lazy(() => import("./components/admin/dashboard/Dashboard"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const SuspenseComponent = ({
  children,
  fallback = <></>
}) => {
  return (
    <Suspense fallback={fallback}>{children}</Suspense>
  );
};

function App() {
  return (
    <BrowserRouter>
      <SuspenseComponent>
        <AuthProvider>
          <Routes>

            <Route path="/" element={<SuspenseComponent><HomePage /></SuspenseComponent>}></Route>
            <Route path="/post-product" element={<LoggedInRequired><SuspenseComponent><PostPage /></SuspenseComponent></LoggedInRequired>}></Route>
            <Route path="/product" element={<SuspenseComponent><ProductPage /></SuspenseComponent>}></Route>
            <Route path="/product-list" element={<SuspenseComponent><ProductListPage /></SuspenseComponent>}></Route>
            <Route path="/chat" element={<SuspenseComponent><ChatPage /></SuspenseComponent>}></Route>

            <Route path="/login" element={<SuspenseComponent><LoginPage /></SuspenseComponent>}></Route>
            <Route path="/register" element={<SuspenseComponent><RegisterPage /></SuspenseComponent>}></Route>
            <Route path="/forget-password" element={<SuspenseComponent><ForgetPasswordPage /></SuspenseComponent>}></Route>
            <Route path="/reset-password" element={<SuspenseComponent><ResetPasswordPage /></SuspenseComponent>}></Route>
            <Route path="/user-profile" element={<SuspenseComponent><UserProfilePage /></SuspenseComponent>}></Route>

            {/* in need of a page that set role as broker */}
            <Route path="/dashboard" element={
              <LoggedInRequired>
                <AsBroker>
                  <SuspenseComponent><Dashboard /></SuspenseComponent>
                </AsBroker>
              </LoggedInRequired>
            }></Route>

            <Route path="*" element={<SuspenseComponent><NotFound /></SuspenseComponent>}></Route>

          </Routes>
        </AuthProvider>
      </SuspenseComponent>

    </BrowserRouter>
  );
}

export default App;
