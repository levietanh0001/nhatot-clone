import ReactDOM from 'react-dom';
import App from './App';
import { Provider as ReactReduxProvider } from 'react-redux';
import { store } from './app/store';
import MUIStyledEngineProvider from './providers/MUIStyledEngineProvider';

ReactDOM.render(
  <MUIStyledEngineProvider>
    <ReactReduxProvider store={store}>
      <App /> 
    </ReactReduxProvider>
  </MUIStyledEngineProvider>
  , document.getElementById('root')
);