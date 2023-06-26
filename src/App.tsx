import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import PostPage from './pages/PostPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/post' element={<PostPage />}></Route>
          <Route path='/product' element={<ProductDetailsPage />}></Route>
          <Route path='/product-list' element={<ProductListPage />}></Route>
          <Route path='/user-profile' element={<UserProfilePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
