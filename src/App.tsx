import "./App.scss";
import Counter from "./components/counter/Counter";
import Lorem from "./components/lorem/Lorem";

function App() {
  return <div className="App">
    <div className="container">
      <Counter />
      <Lorem />
    </div>
  </div>;
}

export default App;
