import React from "react";
import Condition from "./Condition";
import PanelList from "./PanelList";
interface propsTypes {}
function KeyWordDom(props: propsTypes) {
  return (
    <>
      <Condition></Condition>
      <PanelList></PanelList>
    </>
  );
}

const keyWord = React.forwardRef((props: any, ref: any) => {
  return <KeyWordDom {...props} myRef={ref}></KeyWordDom>;
});
export default keyWord;
