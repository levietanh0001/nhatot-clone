import "./App.scss";
import TopNav from "./components/navbar/TopNav";
import Header from "./layouts/Header";
import Body from "./layouts/Body";
import TopCarousel from "./components/carousel/TopCarousel";
import KhamPhaNhaTot from "./components/kham-pha-nha-tot/KhamPhaNhaTot";
import CongCuDichVu from "./components/cong-cu-dich-vu/CongCuDichVu";
import MuaBanBDS from "./components/carousel/MuaBanBDS";
import ChoThueBDS from "./components/carousel/ChoThueBDS";
import DuAnBDS from "./components/carousel/DuAnBDS";


function App() {

  return <div className="App">
    <Header>
      <TopNav />
    </Header>
    <div className="header-bottom-spacer"></div>
    <Body>
      <TopCarousel />
      <KhamPhaNhaTot />
      <CongCuDichVu />
      <MuaBanBDS />
      <ChoThueBDS />
      <DuAnBDS />
      <div className="content-spacer"></div>
    </Body>
  </div>
}

export default App;
