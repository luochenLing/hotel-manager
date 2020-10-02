import React from "react";
import NavBar from "components/common/NavBar";
import InputSearch from "components/common/InputSearch";
import { Button } from "framework7-react";
import "css/home/keyWord/condition.scss";

interface propsTypes {}
function ConditionDom(props: propsTypes) {
  return (
    <NavBar>
      <InputSearch slot="center"></InputSearch>
      <Button slot="right">搜索</Button>
    </NavBar>
  );
}

const Condition = React.forwardRef((props: any, ref: any) => {
  return <ConditionDom {...props} myRef={ref}></ConditionDom>;
});
export default Condition;
