import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import TopNav from './components/navbar/TopNav';
import Header from './layouts/Header';
import Body from './layouts/Body';
import TopCarousel from './components/carousel/TopCarousel';
import KhamPhaNhaTot from './components/kham-pha-nha-tot/KhamPhaNhaTot';
import CongCuDichVu from './components/cong-cu-dich-vu/CongCuDichVu';
import MuaBanBDS from './components/carousel/MuaBanBDS';
import ChoThueBDS from './components/carousel/ChoThueBDS';
import DuAnBDS from './components/carousel/DuAnBDS';
import Glossary from './components/glossary/Glossary';
import Keywords from './components/keywords/Keywords';
import Footer from './layouts/Footer';
import AboutUs from './components/about-us/AboutUs';
import Home from './pages/Home';



function App() {

  return <div className='App'>
    <BrowserRouter>
      
      <Header>
        <TopNav />
      </Header>
      <Body>
        
        <Home />

      </Body>
      <Footer>
        <AboutUs />
      </Footer>
    </BrowserRouter>
  </div>
}

export default App;
