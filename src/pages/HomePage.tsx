import ChoThueBDSCardSlider from "../components/home/ChoThueBDSCardSlider";
import DuAnBDSCardSlider from "../components/home/DuAnBDSCardSlider";
import MuaBanBDSCardSlider from "../components/home/MuaBanBDSCardSlider";
import TopCarousel from "../components/home/TopCarousel";
import CongCuDichVu from "../components/cong-cu-dich-vu/CongCuDichVu";
import Glossary from "../components/glossary/Glossary";
import Keywords from "../components/keywords/Keywords";
import KhamPhaNhaTot from "../components/home/KhamPhaNhaTot";
import AboutUs from "../components/about-us/AboutUs";
import TopNav from "../components/navbar";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

const HomePage = () => {
  return (
    <>
      <Header>
        <TopNav />
      </Header>
      <body>
        <TopCarousel />
        <KhamPhaNhaTot />
        <CongCuDichVu />
        <MuaBanBDSCardSlider />
        <ChoThueBDSCardSlider />
        <DuAnBDSCardSlider />
        <Glossary />
        <Keywords />
      </body>
      <Footer>
        <AboutUs />
      </Footer>
    </>
  );
};

export default HomePage;
