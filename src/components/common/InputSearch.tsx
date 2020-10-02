import React from "react";
import "css/common/input-search.scss";
interface propsTypes {}
function NavBarDom(props: propsTypes) {
  return (
    <div className="search-bar">
      <input
        className="input-search"
        type="text"
        placeholder="关键字/位置/品牌/酒店名"
      />
    </div>
  );
}

const NavBar = React.forwardRef((props: any, ref: any) => {
  return <NavBarDom {...props} myRef={ref}></NavBarDom>;
});
export default NavBar;
