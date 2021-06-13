import React, { useState } from "react";
import styles from "css/home/keyWord/panel-list.module.scss";
import { connect } from "react-redux";
import {
  keyWordConditionOption,
  keyWordPanelOption,
  navPanelShowOption,
} from "redux/action";
import { Block, Page, Popup } from "framework7-react";
import NavTab from "components/common/NavTab";

interface propsTypes {
  imgUrl: string;
  title: string;
  listItem: {};
  panelItemData: {
    name: "";
    data: any[];
    bgColor: string;
    bgPosition: string;
    needMore: string; //是否显示更多按钮
  };
  celsCount: number;
  showNavPanel: boolean;
  keyWordConditionOption: Function;
  keyWordPanelOption: Function;
  navPanelShowOption: Function;
}

function PanelItemDom(props: propsTypes) {
  const [rows] = useState(2);
  const [showItem, setShowItem] = useState(false); //是否显示剩下的列表项

  const [isUp, setIsUp] = useState(false); //展开收起图标
  const setPanel = () => {
    setIsUp(!isUp);
    setShowItem(!showItem);
  };
  const setKeyWordCondition = (val: { key: any; value: string }) => {
    props.keyWordConditionOption(val);
    props.keyWordPanelOption(false);
  };
  const showNavPanel = () => {
    props.navPanelShowOption(true);
  };
  const closeNavPanel = () => {
    props.navPanelShowOption(false);
  };
  return (
    <>
      <div className={styles["keyword"]}>
        <div className={styles["keyword-title"]}>
          <span style={{ display: "flex", flex: 1 }}>
            <i
              className={styles["icon"]}
              style={{
                backgroundColor: props.panelItemData.bgColor,
                backgroundPosition: props.panelItemData.bgPosition,
              }}
            />
            <span className={styles["sub-title"]}>
              {props.panelItemData.name}
            </span>
          </span>
          <div className={styles["tool"]}>
            {props.panelItemData.needMore === "1" ? (
              <i
                className={`${styles["arrow"]} ${
                  isUp ? styles["up"] : styles["down"]
                }`}
                onClick={setPanel}
              ></i>
            ) : (
              ""
            )}
          </div>
        </div>
        <ul className={styles["keyword-content"]}>
          {(props.panelItemData.data || []).map((item, index) => {
            let dom: any = [];
            if (props.panelItemData.needMore !== "2") {
              //没有更多按钮的话多出指定行数的项都被隐藏
              if (index < props.celsCount * rows) {
                dom = (
                  <li
                    key={index}
                    className={styles["keyword-content-item"]}
                    onClick={() => {
                      setKeyWordCondition(item);
                    }}
                  >
                    {item.value}
                  </li>
                );
              } else {
                dom = (
                  <li
                    key={index}
                    style={{ display: `${showItem ? "block" : "none"}` }}
                    onClick={() => {
                      setKeyWordCondition(item);
                    }}
                    className={styles["keyword-content-item"]}
                  >
                    {item.value}
                  </li>
                );
              }
            } else {
              //有更多按钮的话点击跳转到更多的界面
              dom = (
                <li
                  key={index}
                  className={styles["keyword-content-item"]}
                  onClick={() => {
                    setKeyWordCondition(item);
                  }}
                >
                  {item.value}
                </li>
              );
            }

            return dom;
          })}
          {(() => {
            let dom: any = [];
            if (props.panelItemData.needMore !== "2") {
              return;
            }
            for (let i = 0; i < props.celsCount; i++) {
              if (i === props.celsCount - 1) {
                dom.push(
                  <li
                    key={i}
                    className={`${styles["keyword-content-item"]} ${styles["more"]}`}
                    onClick={showNavPanel}
                  >
                    更多...
                  </li>
                );
              } else {
                dom.push(
                  <li key={i} className={styles["keyword-content-item"]}></li>
                );
              }
            }
            return dom;
          })()}
        </ul>
      </div>
      <Popup
        className={styles["navPanel-pop"]}
        opened={props.showNavPanel}
        onPopupClosed={() => closeNavPanel}
      >
        <Page>
          <Block style={{ margin: 0, padding: 0 }}>
            <NavTab></NavTab>
          </Block>
        </Page>
      </Popup>
    </>
  );
}
const PanelItem = React.forwardRef((props: any, ref: any) => {
  return <PanelItemDom {...props} myRef={ref}></PanelItemDom>;
});

export default connect(
  (state: any) => ({
    condition: state.keyWordConditionReducer,
    keyWord: state.keyWordPanelReducer,
    showNavPanel: state.navPanelShowReducer,
  }),
  { keyWordConditionOption, keyWordPanelOption, navPanelShowOption }
)(PanelItem);
