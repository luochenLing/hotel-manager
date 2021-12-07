import React from "react";
import { Icon, Swiper, SwiperSlide } from "framework7-react";
import styles from "css/common/banner.module.scss";
interface propsTypes {
  infoList: { url: string; alt: string }[];
  backFunc?: () => void;
}
function BannerDom(props: propsTypes) {
  const { infoList, backFunc } = props;
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
      <span className={styles["chevron-left"]} onClick={backFunc}>
        <Icon f7="chevron_left"></Icon>
      </span>
    </>
  );
}
const Banner = React.forwardRef((props: any, ref: any) => {
  return <BannerDom {...props} myRef={ref}></BannerDom>;
});
export default Banner;
