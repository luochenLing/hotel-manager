import React from "react";
import styles from "css/hotel/evaluate.module.scss";
import { Card } from "framework7-react";
interface propsTypes {}

function EvaluateDom(props: propsTypes) {
  return (
    <>
      <Card
        className={styles["evaluate"]}
        outline
        title="住客评价"
        content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
        footer="Card footer"
      ></Card>
    </>
  );
}
const IntroCard = React.forwardRef((props: any, ref: any) => {
  return <EvaluateDom {...props} myRef={ref}></EvaluateDom>;
});
export default IntroCard;
