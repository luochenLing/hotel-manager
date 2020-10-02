import React from "react";
import PanelItem from "./PanelItem";
interface propsTypes {}
function IndexDOM(props: propsTypes) {
  return (
    <ul>
      <li>
        <PanelItem></PanelItem>
      </li>
    </ul>
  );
}
const Index = React.forwardRef((props: any, ref: any) => {
  return <IndexDOM {...props} myRef={ref}></IndexDOM>;
});
export default Index;
