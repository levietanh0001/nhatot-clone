import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.scss';
import { SuspenseWrapper } from './components/common/suspense/SuspenseWrapper';
import { AuthProvider } from './contexts/auth/AuthContext';
import allRoutes from './routes/index.route';

const NotFound = lazy(() => import('./pages/NotFound'));



function App() {
  return (
    <BrowserRouter>
      
        <AuthProvider>
          <Routes>

            {allRoutes.map((route, index) => (
              <Route key={index} {...route} />
            ))}

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
    </BrowserRouter>
  );
}

export default App;
