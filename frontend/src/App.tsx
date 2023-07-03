import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import PostPage from './pages/PostPage';
import ProductPage from './pages/ProductPage';
import UserProfilePage from './pages/UserProfilePage';
import ChatPage from './pages/ChatPage';
import AdminPage from './pages/AdminPage';
import Dashboard from './components/admin/dashboard/Dashboard';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/post' element={<PostPage />}></Route>
          <Route path='/product' element={<ProductPage />}></Route>
          <Route path='/product-list' element={<ProductListPage />}></Route>
          <Route path='/user-profile' element={<UserProfilePage />}></Route>
          <Route path='/chat' element={<ChatPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/admin' element={<AdminPage />}>
            <Route path='dashboard' element={<Dashboard />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
