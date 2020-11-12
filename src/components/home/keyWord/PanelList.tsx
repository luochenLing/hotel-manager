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
          {key:'1',value:"迪士尼度假区"},
          {key:'2',value:"外滩"},
          {key:'3',value:"崇明区"},
          {key:'4',value:"浦东国际机场"},
          {key:'5',value:"虹桥火车站"},
          {key:'6',value:"松江区"},
          {key:'7',value:"浦东新区"},
          {key:'8',value:"虹桥国际机场"}
        ],
      },
      {
        name: "品牌",
        code: "brand",
        data: [
          {key:'1',value:"全季"},
          {key:'2',value:"汉庭"},
          {key:'3',value:"亚朵"},
          {key:'4',value:"如家"},
          {key:'5',value:"万豪"},
          {key:'6',value:"W酒店"},
          {key:'7',value:"洲际酒店及度假村"},
          {key:'8',value:"如家精选"},
          {key:'9',value:"桔子水晶"},
          {key:'10',value:"如家商旅"},
          {key:'11',value:"锦江之星"},
          {key:'12',value:"迪士尼"},
          {key:'13',value:"智选假日"},
          {key:'14',value:"丽思卡尔顿"},
          {key:'15',value:"和颐"},
          {key:'16',value:"格林豪泰"},
          {key:'17',value:"开元名庭"},
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

  const [celsCount] = useState(4);//默认显示4行再有更多按钮的时候多余的行都被隐藏

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
