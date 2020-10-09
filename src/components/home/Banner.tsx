import React from "react";
import { Swiper, SwiperSlide, Icon } from "framework7-react";
type stateType = {
  navList: object[];
};
type propsType = {};
class Banner extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      navList: [
        { url: "assets/images/home/idx1.png", alt: "惊喜1" },
        { url: "assets/images/home/idx2.png", alt: "惊喜2" },
      ],
    };
  }
  render() {
    return (
      <div className="banner">
        <Swiper
          pagination
          params={{
            speed: 500,
            loop: true,
            autoplay: {
              delay: 3000,
            },
          }}
        >
          {this.state.navList.map((item: any, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  style={{ width: "100%", height: "170px" }}
                  src={item.url}
                  alt={item.alt}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Icon f7="chevron_left" className="chevron-left"></Icon>
      </div>
    );
  }
}

export default Banner;
