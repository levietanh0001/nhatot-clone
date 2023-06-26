import React from 'react'
import ChoThueBDS from '../components/carousel/ChoThueBDS'
import DuAnBDS from '../components/carousel/DuAnBDS'
import MuaBanBDS from '../components/carousel/MuaBanBDS'
import TopCarousel from '../components/carousel/TopCarousel'
import CongCuDichVu from '../components/cong-cu-dich-vu/CongCuDichVu'
import Glossary from '../components/glossary/Glossary'
import Keywords from '../components/keywords/Keywords'
import KhamPhaNhaTot from '../components/kham-pha-nha-tot/KhamPhaNhaTot'
import AboutUs from '../components/about-us/AboutUs'
import TopNav from '../components/navbar'
import Footer from '../layouts/Footer'
import Header from '../layouts/Header'


const Home = () => {
  return (
    <>
      <Header>
        <TopNav />
        {/* <div className='header-bottom-spacer'></div> */}
      </Header>
      <body>
        <TopCarousel />
        <KhamPhaNhaTot />
        <CongCuDichVu />
        <MuaBanBDS />
        <ChoThueBDS />
        <DuAnBDS />
        <Glossary />
        <Keywords />
      </body>
      <Footer>
        <AboutUs />
      </Footer>
    </>
  )
}

export default Home