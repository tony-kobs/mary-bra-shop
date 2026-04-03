import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const banners = [
  { id: 1, image: process.env.PUBLIC_URL + "/banner-img/robo-model1.png" },
  { id: 2, image: process.env.PUBLIC_URL + "/banner-img/robo-model2.png" },
];

export default function BannerSlider() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      slidesPerView={1}
      loop={true}
      speed={2500}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      className="banner-swiper"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="banner-slide">
            <img src={banner.image} alt="banner" className="zoom" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
