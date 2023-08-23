import ReactDOM from "react-dom";
import { Provider as ReactReduxProvider } from "react-redux";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from "./App";

import MUIStyledEngineProvider from "./providers/MUIStyledEngineProvider";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const isProductionMode = process.env.NODE_ENV?.includes('prod');

// disable logging in production
if (isProductionMode) {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

const queryClient = new QueryClient();

ReactDOM.render(
  <MUIStyledEngineProvider>
    <ReactReduxProvider store={store}>

      {/* delay the rendering of our app’s UI until the persisted data is available in the Redux store */}
      {/* <PersistGate loading={null} persistor={persistor}></PersistGate> */}
      <QueryClientProvider client={queryClient}>
        <App />
        {!isProductionMode && <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />}
      </QueryClientProvider>
    </ReactReduxProvider>
  </MUIStyledEngineProvider>,

  document.getElementById("root")
);
