import React from "react";
import Condition from './Condition';
interface propsTypes {
}
function KeyWordDom(props:propsTypes){
return (<>
         <Condition></Condition>
        </>
        )
}

const keyWord = React.forwardRef((props: any, ref: any) => {
  return <KeyWordDom {...props} myRef={ref}></KeyWordDom>;
});
export default keyWord;