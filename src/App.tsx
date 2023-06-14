import "./App.scss";
import Counter from "./components/counter/Counter";
import Lorem from "./components/lorem/Lorem";
import ResponsiveTesting from "./components/testing/ResponsiveTesting";


function App() {
  return <div className="App">
    <ResponsiveTesting />
    <div className="container">
      <Counter />
      <Lorem />
    </div>
  </div>;
}

export default App;
