import ReactDOM from 'react-dom';
import App from './App';
import { Provider as ReactReduxProvider } from 'react-redux';
import { store } from './app/store';

ReactDOM.render(
  <ReactReduxProvider store={store}>
    <App /> 
  </ReactReduxProvider>
  , document.getElementById('root')
);