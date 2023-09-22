import { Provider } from "react-redux";

const ReactReduxProvider = ({ store, children }) => {
  return (
    <>
      <Provider store={store}>
        {children}
      </Provider>
    </>
  )
}

export default ReactReduxProvider