import { lazy } from "react";
import { SuspenseComponent } from "~/App";

const Header = lazy(() => import("~/layouts/Header"));
const TopNav = lazy(() => import("~/components/navbar"));
const TopCarousel = lazy(() => import("~/components/home/top-carousel/TopCarousel"));
const KhamPhaNhaTot = lazy(() => import("~/components/home/kham-pha-nha-tot/KhamPhaNhaTot"));
const CongCuDichVu = lazy(() => import("~/components/home/cong-cu-dich-vu/CongCuDichVu"));
const ProductCardSlider = lazy(() => import("~/components/home/product-card-slider/ProductCardSlider"));
const Glossary = lazy(() => import("~/components/glossary/Glossary"));
const Keywords = lazy(() => import("~/components/home/keywords/Keywords"));
const Footer = lazy(() => import("~/layouts/Footer"));
const AboutUs = lazy(() => import("~/components/footer/about-us/AboutUs"));

const HomePage = () => {
  return (
    <>
      <SuspenseComponent>
        <Header>
          <TopNav />
        </Header>
      </SuspenseComponent>

      <SuspenseComponent>
        <body>
          <SuspenseComponent>
            <TopCarousel />
          </SuspenseComponent>

          <SuspenseComponent>
            <KhamPhaNhaTot />
            <CongCuDichVu />
          </SuspenseComponent>

          <SuspenseComponent>
            <ProductCardSlider title="Mua bán bất động sản" className="mua-ban-bds-carousel" prevEl="prev-mua-ban" nextEl="next-mua-ban" />
          </SuspenseComponent>
          
          <SuspenseComponent>
            <ProductCardSlider title="Cho thuê bất động sản" className="cho-thue-bds-carousel" prevEl="prev-cho-thue" nextEl="next-cho-thue" />
          </SuspenseComponent>

          <SuspenseComponent>
            <ProductCardSlider title="Dự án bất động sản" className="du-an-bds-carousel" prevEl="prev-du-an" nextEl="next-du-an" />
          </SuspenseComponent>

          <SuspenseComponent>
            <Glossary />
            <Keywords />
          </SuspenseComponent>
        </body>
      </SuspenseComponent>

      <SuspenseComponent>
        <Footer>
          <AboutUs />
        </Footer>
      </SuspenseComponent>
    </>
  );
};

export default HomePage;
