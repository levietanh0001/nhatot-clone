import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistGate } from 'redux-persist/integration/react';

import './App.scss';
import { SuspenseWrapper } from './components/ui/suspense/SuspenseWrapper';
import { AuthProvider } from './contexts/auth/Auth.context';
import allRoutes from './routes/index.route';
import TanstackQueryClientProvider from './providers/TanstackQueryClient.provider';
import ReactReduxProvider from './providers/ReactRedux.provider';
import MUIStyledEngineProvider from './providers/MUIStyledEngine.provider';
import { store } from './app/store';
import { isProductionMode } from './global/constants.global';
import { persistor } from './app/store';
import { TopLoadingBarProvider } from './contexts/top-loading-bar/TopLoadingBar.context';

const NotFound = lazy(() => import('./pages/NotFound.page'));

function AppWrapper({ children }) {
  const queryClient = new QueryClient();

  return (
    <MUIStyledEngineProvider>
      <TopLoadingBarProvider>
        <ReactReduxProvider store={store}>
          {/* delay the rendering of our app’s UI until the persisted data is available in the Redux store */}
          {/* <PersistGate loading={null} persistor={persistor}></PersistGate> */}
          <TanstackQueryClientProvider client={queryClient}>
            {children}
            {!isProductionMode && (
              <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
            )}
          </TanstackQueryClientProvider>
        </ReactReduxProvider>
      </TopLoadingBarProvider>
    </MUIStyledEngineProvider>
  );
}

function App() {
  return (
    <AppWrapper>
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
    </AppWrapper>
  );
}

export default App;
