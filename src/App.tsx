import clsx from 'clsx';

import "./App.scss";
import Counter from "./components/counter/Counter";
import Lorem from "./components/lorem/Lorem";
import ResponsiveTesting from "./components/testing/ResponsiveTesting";
import ToggleThemeButton from './components/button/ToggleThemeButton';


function App() {

  const classes = clsx(
    'container'
  );

  return <div className="App">
    <ResponsiveTesting />
    <div className={classes}>
      <Counter />
      <Lorem />
      <ToggleThemeButton />
    </div>
  </div>;
}

export default App;
