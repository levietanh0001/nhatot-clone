import "./App.scss";
import Counter from "./components/counter/Counter";
import Lorem from "./components/lorem/Lorem";
import ResponsiveTesting from "./components/testing/ResponsiveTesting";
import ToggleThemeButton from './components/navbar/ToggleThemeButton';
import TopNav from "./components/navbar/TopNav";
import { useState, useEffect } from "react";
import Header from "./layouts/Header";


function App() {

  return <div className="App">
    <ToggleThemeButton />
    <TopNav />
    {/* <ResponsiveTesting /> */}
    <div className='container'>
      <Counter />
      <Lorem />
      
    <Header>
      <TopNav />
    </Header>
    <div className="header-bottom-spacer"></div>
      <div className="content-spacer"></div>
    </div>
  </div>;
}

export default App;
