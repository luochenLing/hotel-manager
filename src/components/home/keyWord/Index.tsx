import React from "react";
import Condition from "./Condition";
import PanelList from "./PanelList";
import "css/home/keyWord/index.scss";
interface propsTypes {
  showKeyWord: boolean | string;
}
function KeyWordDom(props: propsTypes) {
  return props.showKeyWord === "firstLoad" ? (
    <span></span>
  ) : (
    <div
      className={`keyword-page ${
        props.showKeyWord ? "keyword-slide-in" : "keyword-slide-out"
      }`}
    >
      <Condition></Condition>
      <PanelList></PanelList>
    </div>
  );
}

const keyWord = React.forwardRef((props: any, ref: any) => {
  return <KeyWordDom {...props} myRef={ref}></KeyWordDom>;
});

export default keyWord;
