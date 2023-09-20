import PropTypes from 'prop-types';
import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import './ProductThumbGallery.scss';

// import required modules
import { Navigation, Thumbs } from "swiper";


const imgSrc = [
  "https://cdn.chotot.com/DAhj_V-GXCp5cFSQ1xX3xVwiGEren2c1Lt1oti7YCEA/preset:view/plain/55b5bb7e078e2200ea6d82a7daccb234-2830698562985958996.jpg", 
  "https://cdn.chotot.com/P7Calhwr3wAdFns0h4TjCISu681Y6OdoS5cQpe4C1fk/preset:view/plain/5c71bfe740362f62c52c63c64a9ae19b-2830698562790810775.jpg", 
  "https://cdn.chotot.com/raUjAoJu6PE6dsLU30DUEbKqJi2s22Fkljm3NO5zMaM/preset:view/plain/242daa5c7ac7790e586019f7469ffac4-2830698564299276741.jpg", 
  "https://cdn.chotot.com/7hDwhy5PGp-uyPAeSmoeJQe6HORx6wBx9dyTCnrtjuI/preset:view/plain/9169c9196d15da9ae5fda6286bf4bc1e-2830698564407904551.jpg", 
]

export default function ProductThumbGallery(props) {

  const { imageUrls } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
      <div className="product-image-carousel">
        <div className="primary-carousel">
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[
              // FreeMode, 
              Navigation, 
              Thumbs
            ]}
          >
              {imageUrls?.map((src, index) => (
                <SwiperSlide key={index}>
                  <img key={index} src={src} alt="Ảnh minh họa sản phẩm" />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="secondary-carousel">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            // freeMode={true}
            watchSlidesProgress={true}
            modules={[
              // FreeMode, 
              Navigation, 
              Thumbs
            ]}
          >
            {imageUrls?.map((src, index) => (
              <SwiperSlide key={index}>
                <img key={index} src={src} alt="Ảnh minh họa sản phẩm" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}


ProductThumbGallery.propTypes = {
  imageUrls: PropTypes.array
}