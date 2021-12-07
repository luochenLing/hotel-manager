import React from "react";
// import 'css/common/input-search.scss'
import styles from "css/common/price-panel.module.scss";
import { Button, Range } from "framework7-react";
interface propsTypes {
  curPrice: string;
  minRange: number;
  maxRange: number;
  startList: { name: string; checked: boolean; code: string }[];
  getPriceRange: (val?: any) => void;
  checkStart: (event?: any) => void;
  resetCondition: (event?: any) => void;
  searchList: (event?: any) => void;
}

function PricePanelDom(props: propsTypes) {
  return (
    <div style={{ padding: "0.5rem 1rem", boxSizing: "border-box" }}>
      <ul className={styles["price"]}>
        <li className={styles["price-title"]}>
          <span style={{ marginRight: ".5rem" }}>价格</span>
          {props.curPrice ? (
            <span className={styles["num"]}>￥{props.curPrice}以上</span>
          ) : (
            ""
          )}
        </li>
        <li className={styles["price-slider"]}>
          <Range
            value={props.curPrice}
            min={props.minRange}
            max={props.maxRange}
            label={true}
            step={5}
            className={styles["price-slider-bar"]}
            onRangeChange={props.getPriceRange}
          >
            <span className={styles["min-prince"]}>￥{props.minRange}</span>
            <span className={styles["max-prince"]}>￥{props.maxRange}以上</span>
          </Range>
          <div
            className={[styles["range-knob"], styles["end-knob"]].join(" ")}
          ></div>
        </li>
      </ul>
      <ul className={styles["star-rating"]}>
        <li className={styles["star-rating-title"]}>
          <h3>星级</h3>
          <span>(可多选)</span>
        </li>
        <li className={styles["star-rating-content"]}>
          <ul className={styles["start-list"]}>
            {props.startList.map((item) => {
              return (
                <li
                  className={`${styles["start-list-item"]} ${
                    item.checked ? styles["active"] : ""
                  }`}
                  onClick={() => {
                    props.checkStart(item.code);
                  }}
                  key={item.code}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
      <div className={styles["btn-tools"]}>
        <Button
          className={styles["btn-reset"]}
          outline
          onClick={props.resetCondition}
        >
          重置
        </Button>
        <Button className={styles["btn-ok"]} fill onClick={props.searchList}>
          完成
        </Button>
      </div>
    </div>
  );
}

const PricePanel = React.forwardRef((props: any, ref: any) => {
  return <PricePanelDom {...props} myRef={ref}></PricePanelDom>;
});
export default PricePanel;
