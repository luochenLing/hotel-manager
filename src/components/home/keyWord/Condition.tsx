import React from "react";
import NavBar from "components/common/NavBar";
import InputSearch from "components/common/InputSearch";
import { Button } from "framework7-react";
import {setShowKeyWord} from 'redux/action'
import {connect} from 'react-redux'
import "css/home/keyWord/condition.scss";

interface propsTypes {
  setShowKeyWord:Function
}
function ConditionDom(props: propsTypes) {
  const goBack=()=>{
    props.setShowKeyWord(false)
  }
  return (
    <NavBar goBack={goBack}>
      <InputSearch slot="center"></InputSearch>
      <Button slot="right">搜索</Button>
    </NavBar>
  );
}

const Condition = React.forwardRef((props: any, ref: any) => {
  return <ConditionDom {...props} myRef={ref}></ConditionDom>;
});
export default connect((state:any)=>({keyWord:state.keyWorkOption}),{setShowKeyWord})(Condition);
