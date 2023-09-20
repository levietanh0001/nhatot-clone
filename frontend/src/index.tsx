import ReactDOM from 'react-dom';
import App from './App';


// const isProductionMode = process.env.NODE_ENV?.includes('prod');

// disable logging in production
if (process.env.NODE_ENV?.includes('prod')) {
  console.log = () => { }
  console.error = () => { }
  console.debug = () => { }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// ReactDOM.render(
//   <MUIStyledEngineProvider>
//     <ReactReduxProvider store={store}>
//       {/* delay the rendering of our app’s UI until the persisted data is available in the Redux store */}
//       {/* <PersistGate loading={null} persistor={persistor}></PersistGate> */}
//       <TanstackQueryClientProvider client={queryClient}>
//         <App />
//         {!isProductionMode && (
//           <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
//         )}
//       </TanstackQueryClientProvider>
//     </ReactReduxProvider>
//   </MUIStyledEngineProvider>,

//   document.getElementById('root')
// );
