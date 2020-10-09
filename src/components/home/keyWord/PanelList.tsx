import React, { useEffect, useState } from "react";
import PanelItem from "./PanelItem";
import keyWordsEnums from "utils/enums/keyWordsEnums";

interface propsTypes {}
function PanelListDOM(props: propsTypes) {
  const [panelData, setPanelData] = useState<any>();
  /**
   * 初始化数据
   */
  useEffect(() => {
    let data: any[] = [
      {
        name: "热搜关键字",
        code: "keyWord",
        data: [
          "迪士尼度假区",
          "外滩",
          "崇明区",
          "浦东国际机场",
          "虹桥火车站",
          "松江区",
          "浦东新区",
          "虹桥国际机场",
        ],
      },
      {
        name: "品牌",
        code: "brand",
        data: [
          "全季",
          "汉庭",
          "亚朵",
          "如家",
          "万豪",
          "W酒店",
          "洲际酒店及度假村",
          "如家精选",
          "桔子水晶",
          "如家商旅",
          "锦江之星",
          "迪士尼",
          "智选假日",
          "丽思卡尔顿",
          "和颐",
          "格林豪泰",
          "开元名庭",
        ],
      },
    ];
    data = data.map((item) => {
      let bgOption = (keyWordsEnums as any)[item.code];
      return {
        ...item,
        bgColor: bgOption.split(";")[0],
        bgPosition: bgOption.split(";")[1],
        needMore: bgOption.split(";")[2],
      };
    });
    setPanelData(data);
  }, []);

  const [celsCount] = useState(4);

  return (
    <ul>
      {(panelData || []).map((item: any, index: number) => {
        let count = (item.data || []).length;
        if (count > 0) {
          let num = count % celsCount;
          let cels = celsCount - num;
          if (cels < 4) {
            for (let i = 0; i < cels; i++) {
              item.data.push("");
            }
          }
        }
        return (
          <PanelItem
            key={index}
            panelItemData={item}
            celsCount={celsCount}
            needMore={false}
          ></PanelItem>
        );
      })}
    </ul>
  );
}
const PanelList = React.forwardRef((props: any, ref: any) => {
  return <PanelListDOM {...props} myRef={ref}></PanelListDOM>;
});
export default PanelList;
