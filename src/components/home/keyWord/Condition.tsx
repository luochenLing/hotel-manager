import { Button } from "framework7-react";
import React from "react";
interface propsTypes {
}
function ConditionDom(props:propsTypes){
return (<div>
          <input type="text" placeholder="关键字/位置/品牌/酒店名"/>
          <Button>搜索</Button>
        </div>
        )
}

const Condition = React.forwardRef((props: any, ref: any) => {
  return <ConditionDom {...props} myRef={ref}></ConditionDom>;
});
export default Condition;