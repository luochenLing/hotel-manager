import React, { useState } from "react";
// import styles from 'css/home/hotel/evaluate.module.scss'
interface propsTypes {}

function EvaluateDom(props: propsTypes) {
  return <>{/* <div className={styles["title"]}>住客评价</div> */}</>;
}
const IntroCard = React.forwardRef((props: any, ref: any) => {
  return <EvaluateDom {...props} myRef={ref}></EvaluateDom>;
});
export default IntroCard;
