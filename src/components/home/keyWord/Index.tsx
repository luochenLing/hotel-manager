import React from "react";
import Condition from "./Condition";
import PanelList from "./PanelList";
import 'css/home/keyWord/index.scss'
interface propsTypes {
  showKeyWord:boolean,
}
function KeyWordDom(props: propsTypes) {
  return (
    <div className={`keyword-page ${props.showKeyWord ? "slide-in" : "slide-out"}`}>
      <Condition></Condition>
      <PanelList></PanelList>
    </div>
  );
}

const keyWord = React.forwardRef((props: any, ref: any) => {
  return <KeyWordDom {...props} myRef={ref}></KeyWordDom>;
});
export default keyWord;
