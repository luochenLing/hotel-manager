import React, {useState } from "react";
import { Icon, Swiper, SwiperSlide } from "framework7-react";
interface propsTypes {}
function BannerDom(props: propsTypes) {
  const [infoList] = useState<{ url: string; alt: string }[]>([
    { url: "assets/images/hotel/info-2.png", alt: "详情2" },
    { url: "assets/images/hotel/info-1.png", alt: "详情1" },
  ]);
  return (
    <>
      <Swiper>
        {infoList.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img
                style={{ width: "100%", height: "200px" }}
                src={item.url}
                alt={item.alt}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Icon f7="chevron_left" className="chevron-left"></Icon>
    </>
  );
}
const Banner = React.forwardRef((props: any, ref: any) => {
  return <BannerDom {...props} myRef={ref}></BannerDom>;
});
export default Banner;
