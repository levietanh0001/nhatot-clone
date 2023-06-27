import ChoThueBDSCardSlider from "../components/home/product-card-slider/ChoThueBDSCardSlider";
import DuAnBDSCardSlider from "../components/home/product-card-slider/DuAnBDSCardSlider";
import MuaBanBDSCardSlider from "../components/home/product-card-slider/MuaBanBDSCardSlider";
import TopCarousel from "../components/home/top-carousel/TopCarousel";
import CongCuDichVu from "../components/home/cong-cu-dich-vu/CongCuDichVu";
import Glossary from "../components/glossary/Glossary";
import Keywords from "../components/home/keywords/Keywords";
import KhamPhaNhaTot from "../components/home/kham-pha-nha-tot/KhamPhaNhaTot";
import AboutUs from "../components/footer/about-us/AboutUs";
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
