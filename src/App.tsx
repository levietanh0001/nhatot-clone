import "./App.scss";
import Counter from "./components/counter/Counter";
import Lorem from "./components/lorem/Lorem";
import ResponsiveTesting from "./components/testing/ResponsiveTesting";
import ToggleThemeButton from './components/button/ToggleThemeButton';


function App() {
  return <div className="App">
    <ResponsiveTesting />
    <div className="container">
      <Counter />
      <Lorem />
      <ToggleThemeButton />
    </div>
  </div>;
}

export default App;
