import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "css/common/nav-tab.scss";
//设置默认类型
interface propsTypes {
  tabs: [];
  panels: [];
}
//设置默认值
NavTabDOM.defaultProps = {
  tabs: ["高端连锁", "中国连锁", "快捷连锁", "其他品牌"],
  panels: [
    "万豪",
    "凯悦酒店",
    "诺富特",
    "万丽",
    "日航",
    "君越酒店",
    "JW万豪",
    "书香世家",
    "迪士尼",
    "美伦",
    "居舍系列",
    "丽晶",
    "星河湾",
    "瑞士",
    "桔子水晶",
    "费尔德",
    "臻品之选",
    "丽呈",
    '悦容庄',
    'Radisson Blu'
  ],
};
function NavTabDOM(props: propsTypes) {
  const [tabActive, setTabActive] = useState(0); //tab的active样式
  const [clientHeight, setClientHeight] = useState(
    (document.documentElement || document.body).clientHeight
  );
  useEffect(() => {
    window.addEventListener("resize", resizeContent);
    return () => {
      window.removeEventListener("resize", resizeContent);
    };
  }, []);

  const resizeContent = () => {
    setClientHeight((document.documentElement || document.body).clientHeight);
  };

  const getActive = (num: number) => {
    setTabActive(num);
  };
  return (
    <div style={{ height: clientHeight }}>
      <NavBar>
        <span slot="center">品牌</span>
        <span slot="right"></span>
      </NavBar>
      <div className="content">
        <ul className="tab">
          {props.tabs.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  getActive(index);
                }}
                className={`tab-item ${tabActive === index ? "active" : ""}`}
              >
                {item}
              </li>
            );
          })}
        </ul>
        <ul className="tab-panel">
          {props.panels.map((item,index) => {
            return <li key={index} className="tab-panel-item">{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
const NavTab = React.forwardRef((props: any, ref: any) => {
  return <NavTabDOM {...props} myRef={ref}></NavTabDOM>;
});
export default NavTab;
