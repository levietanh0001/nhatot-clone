import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import PostPage from "./pages/PostPage";
import ProductPage from "./pages/ProductPage";
import UserProfilePage from "./pages/UserProfilePage";
// import ChatPage from './pages/ChatPage';
// import AdminPage from './pages/AdminPage';
// import Dashboard from './components/admin/dashboard/Dashboard';
// import LoginPage from './pages/LoginPage';
// import NotFound from './pages/NotFound';

const ChatPage = React.lazy(() => import("./pages/ChatPage"));
const AdminPage = React.lazy(() => import("./pages/AdminPage"));
const Dashboard = React.lazy(() => import("./components/admin/dashboard/Dashboard"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

export const LazyComponent = ({ Comp }) => {
  return (
    <React.Suspense fallback={<>...</>}>
      {Comp}
    </React.Suspense>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/post" element={<PostPage />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          <Route path="/product-list" element={<ProductListPage />}></Route>
          <Route path="/user-profile" element={<UserProfilePage />}></Route>

          <Route path="/chat" element={<LazyComponent Comp={<ChatPage />} />}></Route>
          <Route path="/login" element={<LazyComponent Comp={<LoginPage />} />}></Route>
          <Route path="/admin" element={<LazyComponent Comp={<AdminPage />} />}>
            <Route path="dashboard" element={<LazyComponent Comp={<Dashboard />} />}></Route>
          </Route>
          <Route path="*" element={<LazyComponent Comp={<NotFound />} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
