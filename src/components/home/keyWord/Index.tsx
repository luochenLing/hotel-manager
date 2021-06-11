import React from "react";
import Condition from "./Condition";
import PanelList from "./PanelList";
import styles from "css/home/keyWord/index.module.scss";
interface propsTypes {
  showKeyWord: boolean;
}

function KeyWordDom(props: propsTypes) {
  return (
    <div
      className={`${styles["keyword-page"]} ${
        props.showKeyWord
          ? styles["keyword-slide-in"]
          : styles["keyword-slide-out"]
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
