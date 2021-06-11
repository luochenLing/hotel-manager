import React from "react";
import styles from "css/common/input-search.module.scss";
interface propsTypes {
  placeholderName:string
}
NavBarDom.defaultProps={
  placeholderName:'关键字/位置/品牌/酒店名'
}
function NavBarDom(props: propsTypes) {
  return (
    <div className={styles["search-bar"]}>
      <input
        className={styles["input-search"]}
        type="text"
        placeholder={props.placeholderName}
      />
    </div>
  );
}

const NavBar = React.forwardRef((props: any, ref: any) => {
  return <NavBarDom {...props} myRef={ref}></NavBarDom>;
});
export default NavBar;
