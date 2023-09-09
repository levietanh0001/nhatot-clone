import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.scss';
import { SuspenseWrapper } from './components/ui/suspense/SuspenseWrapper';
import { AuthProvider } from './contexts/auth/Auth.context';
import allRoutes from './routes/index.route';

const NotFound = lazy(() => import('./pages/NotFound.page'));



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
