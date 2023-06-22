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
import LoginModal from './components/modal/LoginModal';


function App() {

  return <div className='App'>
    <Header>
      <TopNav />
    </Header>
    <Body>
      <LoginModal />
      <TopCarousel />
      <KhamPhaNhaTot />
      <CongCuDichVu />
      <MuaBanBDS />
      <ChoThueBDS />
      <DuAnBDS />
      <Glossary />
      <Keywords />
      {/* <div className='content-spacer'></div> */}
    </Body>
    <Footer>
      <AboutUs />
    </Footer>
  </div>
}

export default App;
