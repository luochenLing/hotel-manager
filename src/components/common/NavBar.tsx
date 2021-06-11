import React from "react";
import styles from "css/common/nav.module.scss";
interface propsTypes {
  children: any;
  goBack:Function
}
function NavBarDom(props: propsTypes) {
  let children = Array.isArray(props.children || [])
    ? props.children
    : [props.children];
  const slots = (children || []).reduce(
    (
      slots: { [x: string]: any },
      item: { props: { slot: React.ReactText } }
    ) => {
      slots[item.props.slot] = item;
      return slots;
    },
    {}
  );
  return (
    <div className={styles["nav-condition"]}>
      <div className={styles["left"]}>{slots["left"] || <i className="back" onClick={()=>{props.goBack()}}></i>}</div>
      <div className={styles["center"]}>{slots["center"] || <div>center</div>}</div>
      <div className={styles["right"]}>{slots["right"] || <div>right</div>}</div>
    </div>
  );
}

const NavBar = React.forwardRef((props: any, ref: any) => {
  return <NavBarDom {...props} myRef={ref}></NavBarDom>;
});
export default NavBar;
