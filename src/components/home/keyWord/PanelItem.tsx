import React from "react";
import "css/home/keyWord/panel-list.scss";
interface propsTypes {
  imgUrl: string;
  title: string;
  listItem: {};
}
function PanelItemDom(props: propsTypes) {
  return (
    <div className="keyword">
      <div className="keyword-title">
        <i
          className="icon"
          style={{
            backgroundImage: `url(${require("img/common/keyword.png")})`,
            backgroundColor: "#92dbf9",
            backgroundPosition: "0.2rem 0.1rem",
          }}
        />
        <span>热搜关键字</span>
      </div>
      <ul className="keyword-content">
        <li className="keyword-content-item">迪士尼度假区</li>
        <li className="keyword-content-item">外滩</li>
        <li className="keyword-content-item">崇明区</li>
        <li className="keyword-content-item">浦东国际机场</li>
        <li className="keyword-content-item">虹桥火车站</li>
        <li className="keyword-content-item">松江区</li>
        <li className="keyword-content-item">浦东新区</li>
        <li className="keyword-content-item">虹桥国际机场</li>
      </ul>
    </div>
  );
}
const PanelItem = React.forwardRef((props: any, ref: any) => {
  return <PanelItemDom {...props} myRef={ref}></PanelItemDom>;
});
export default PanelItem;
