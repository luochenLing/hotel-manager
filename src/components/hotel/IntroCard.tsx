import React from "react";
import "css/hotel/intro-card.scss";
import { Icon } from "framework7-react";
import DateSelector from "components/common/DateSelector";
interface propsTypes {
  info: {
    score: number; //分数
    titleName: string; //酒店名称
    addr: string; //地址名称
    landmark: string;
    mapContent: string; //地图内容
    subTitle: string; //副标题
    tag: { label: string; code: string }[]; //标签
  };
}

function IntroCardDom(props: propsTypes) {
  const { info } = props;
  /**
   * 根据标签获取图标
   * @param val 标签Code
   */
  const getIconByTag = (val: string) => {
    switch (val) {
      case "fast_processing":
        return "folder";
      case "wifi":
        return "logo_rss";
      case "c_restaurant":
        return "poultry_leg";
      case "restaurant":
        return "poultry_leg";
    }
  };
  return (
    <>
      <div className="intro-card">
        <div className="card-head">
          <span className="card-score">
            {info?.score}
            <span className="card-unit">分</span>
          </span>
          <span className="card-title">假日一级酒店</span>
        </div>

        <div className="card-body">
          <span className="card-addr">
            {info?.addr}【{info?.landmark}】
          </span>
          <span className="card-map-content">{info?.mapContent}</span>
        </div>

        <div className="card-footer">
          <span className="card-sub-title">{info?.subTitle}</span>
          <ul className="card-tag">
            {(info?.tag || []).map((item) => {
              return (
                <li key={item.code} className="card-tag-item">
                  <Icon
                    f7={getIconByTag(item.code)}
                    className="item-icon"
                  ></Icon>
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
        <DateSelector />
      </div>
    </>
  );
}
const IntroCard = React.forwardRef((props: any, ref: any) => {
  return <IntroCardDom {...props} myRef={ref}></IntroCardDom>;
});
export default IntroCard;
