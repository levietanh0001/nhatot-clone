import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import PostPage from './pages/PostPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/mua-ban-bds' element={<ProductListPage />}></Route>
          <Route path='/dang-tin' element={<PostPage />}></Route>
          <Route path='/product' element={<ProductDetailsPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
