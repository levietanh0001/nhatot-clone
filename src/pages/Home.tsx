import React from 'react'
import ChoThueBDS from '../components/carousel/ChoThueBDS'
import DuAnBDS from '../components/carousel/DuAnBDS'
import MuaBanBDS from '../components/carousel/MuaBanBDS'
import TopCarousel from '../components/carousel/TopCarousel'
import CongCuDichVu from '../components/cong-cu-dich-vu/CongCuDichVu'
import Glossary from '../components/glossary/Glossary'
import Keywords from '../components/keywords/Keywords'
import KhamPhaNhaTot from '../components/kham-pha-nha-tot/KhamPhaNhaTot'

const Home = () => {
  return (
    <>
      <TopCarousel />
      <KhamPhaNhaTot />
      <CongCuDichVu />
      <MuaBanBDS />
      <ChoThueBDS />
      <DuAnBDS />
      <Glossary />
      <Keywords />
    </>
  )
}

export default Home