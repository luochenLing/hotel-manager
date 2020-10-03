import React, { useState } from "react";
import "css/home/keyWord/panel-list.scss";
interface propsTypes {
  imgUrl: string;
  title: string;
  listItem: {};
  panelItemData: { name: ""; data: any[] };
  celsCount: number;
  needMore: boolean; //是否显示更多按钮
}
function PanelItemDom(props: propsTypes) {
  const [rows] = useState(2);
  const [showItem, setShowItem] = useState(false); //是否显示剩下的列表项
  // useEffect(() => {
  //   setShowItem(props.needMore);
  // }, [props.needMore]);
  const [isUp, setIsUp] = useState(false);
  const setPanel = () => {
    setIsUp(!isUp);
    setShowItem(!showItem);
  };
  return (
    <div className="keyword">
      <div className="keyword-title">
        <span style={{ display: "flex", flex: 1 }}>
          <i
            className="icon"
            style={{
              backgroundImage: `url(${require("img/common/keyword.png")})`,
              backgroundColor: "#92dbf9",
              backgroundPosition: "0.2rem 0.1rem",
            }}
          />
          <span className="sub-title">{props.panelItemData.name}</span>
        </span>
        <div className="tool">
          {!props.needMore ? (
            <i
              className={`arrow ${isUp ? "up" : "down"}`}
              onClick={setPanel}
            ></i>
          ) : (
            <span>清空</span>
          )}
        </div>
      </div>
      <ul className="keyword-content">
        {(props.panelItemData.data || []).map((item, index) => {
          let dom: any = [];
          if (index < props.celsCount * rows) {
            dom = (
              <li key={index} className="keyword-content-item">
                {item}
              </li>
            );
          } else {
            dom = (
              <li
                key={index}
                style={{ display: `${showItem ? "block" : "none"}` }}
                className="keyword-content-item"
              >
                {item}
              </li>
            );
          }
          return dom;
        })}
        {(() => {
          let dom: any = [];
          if (!props.needMore) {
            return;
          }
          for (let i = 0; i < props.celsCount; i++) {
            if (i === props.celsCount - 1) {
              dom.push(
                <li key={i} className="keyword-content-item">
                  更多
                </li>
              );
            } else {
              dom.push(<li key={i} className="keyword-content-item"></li>);
            }
          }
          return dom;
        })()}
      </ul>
    </div>
  );
}
const PanelItem = React.forwardRef((props: any, ref: any) => {
  return <PanelItemDom {...props} myRef={ref}></PanelItemDom>;
});
export default PanelItem;
