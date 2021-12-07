import React, { useState } from "react";
import styles from "css/hotel/intro-card.module.scss";
import { getDayByNum } from "utils/common";
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
  const [time, setTime] = useState({startDate:new Date().Format("yyyy-MM-dd"),endDate:getDayByNum(new Date(), 7).Format("yyyy-MM-dd")}); //从周几
  // const [endDate, setEndDate] = useState(
  //   getDayByNum(new Date(), 7).Format("yyyy-MM-dd")
  // ); //到周几
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

  const updateTime = (data: { startDay: string; endDay: string }) => {
    setTime({startDate:data.startDay,endDate:data.endDay});
  };

  return (
    <>
      <div className={styles["intro-card"]}>
        <div className={styles["card-head"]}>
          <span className={styles["card-score"]}>
            {info?.score}
            <span className={styles["card-unit"]}>分</span>
          </span>
          <span className={styles["card-title"]}>假日一级酒店</span>
        </div>

        <div className={styles["card-body"]}>
          <span className={styles["card-addr"]}>
            {info?.addr}【{info?.landmark}】
          </span>
          <span className={styles["card-map-content"]}>{info?.mapContent}</span>
        </div>

        <div className={styles["card-footer"]}>
          <span className={styles["card-sub-title"]}>{info?.subTitle}</span>
          <ul className={styles["card-tag"]}>
            {(info?.tag || []).map((item) => {
              return (
                <li key={item.code} className={styles["card-tag-item"]}>
                  <Icon
                    f7={getIconByTag(item.code)}
                    className={styles["item-icon"]}
                  ></Icon>
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
        <DateSelector
          startDate={time.startDate}
          endDate={time.endDate}
          updateTime={updateTime}
        />
      </div>
    </>
  );
}
const IntroCard = React.forwardRef((props: any, ref: any) => {
  return <IntroCardDom {...props} myRef={ref}></IntroCardDom>;
});
export default React.memo(IntroCard);
