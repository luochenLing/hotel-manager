import React from "react";
import { F7List, ListItem } from "framework7-react";
import NavTab from "components/common/NavTab";
import PricePanel from "components/common/PricePanel";
import PubSub from "pubsub-js";
import styles from "css/hotel/condition.module.scss";
type stateType = {
  sheetOpened: boolean;
  panelType: number;
  tabs: { key: any; value: string }[];
  panels: { key: any; value: string }[];
  maxRange: number;
  minRange: number;
  curPrice: number;
  startList: { name: string; checked: boolean; code: string }[];
  selStartList: string[];
  greetList: { key: any; value: string }[];
  selGreetCondition: { key: any; value: string };
};
type propsType = {};
class Condition extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      sheetOpened: false,
      panelType: 0, //面板类型
      tabs: [], //tab内容
      panels: [], //面板内容
      maxRange: 900,
      minRange: 0,
      curPrice: 0,
      startList: [
        { name: "二星(钻)及以下经济", checked: false, code: "two" },
        { name: "三星(钻)舒适", checked: false, code: "three" },
        { name: "四星(钻)高档", checked: false, code: "four" },
        { name: "五星(钻)豪华", checked: false, code: "five" },
      ],
      selStartList: [],
      greetList: [
        { key: 1, value: "好评优先" },
        { key: 2, value: "低价优先" },
        { key: 3, value: "高价优先" },
        { key: 4, value: "距离优先" },
        { key: 5, value: "点评度 高→低" },
      ],
      selGreetCondition: { key: -1, value: "欢迎度排序" }, //获取欢迎度排名条件
    };
  }

  /**
   * 根据条件tab打开对应的面板
   */
  getPopupPanel = (key: number) => {
    let tabs,
      panels = [];
    switch (key) {
      case 1:
        this.setState({ panelType: key, sheetOpened: true });
        break;
      case 2:
        tabs = [
          { key: "1", value: "地铁一号线" },
          { key: "2", value: "青城县" },
          { key: "3", value: "神木县" },
          { key: "4", value: "六盘山" },
          { key: "5", value: "地铁二号线" },
          { key: "6", value: "地铁三号线" },
          { key: "7", value: "地铁四号线" },
          { key: "8", value: "地铁五号线" },
          { key: "9", value: "地铁六号线" },
        ];
        panels = [
          { key: "1", value: "阳光花园" },
          { key: "2", value: "陆家嘴" },
          { key: "3", value: "徐家汇" },
          { key: "4", value: "华漕" },
          { key: "5", value: "王府井" },
          { key: "6", value: "什刹海" },
          { key: "7", value: "后海" },
          { key: "8", value: "鼓楼" },
          { key: "9", value: "八宝山" },
          { key: "10", value: "青州" },
          { key: "11", value: "冀州" },
        ];
        this.setState({ panelType: key, sheetOpened: true, tabs, panels });
        break;
      case 3:
        this.setState({ panelType: key, sheetOpened: true });
        break;
      case 4:
        tabs = [
          { key: "1", value: "评价最多" },
          { key: "2", value: "月销售最多" },
        ];
        panels = [
          { key: "1", value: "丽晶酒店" },
          { key: "2", value: "汉庭" },
          { key: "3", value: "如家" },
          { key: "4", value: "桔子水晶" },
          { key: "5", value: "民宿" },
          { key: "6", value: "万豪" },
        ];
        this.setState({ panelType: key, sheetOpened: true, tabs, panels });
        break;
    }
  };

  /**
   * 选择价格区间
   */
  getPriceRange = (e: any) => {
    this.setState({ curPrice: e });
  };

  /**
   * 选中星级
   */
  checkStart = (code: string) => {
    const curList = [...this.state.startList];
    let item = curList.find((x) => x.code === code);
    if (item) {
      item.checked = !item.checked;
      this.setState({ startList: curList });
    }
  };

  /**
   * 重置条件
   */
  resetCondition = () => {
    this.setState({ curPrice: 0 });
    const curList = this.state.startList.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
    this.setState({ startList: curList });
  };

  /**
   * 条件筛选
   */
  searchList = () => {
    //处理星级酒店多选
    this.state.startList.filter((x) => x.checked);
    this.setState({
      selStartList: this.state.startList
        .filter((x) => x.checked)
        .map((item) => item.name),
      sheetOpened: false,
      panelType: -1
    });
  };

  /**
   * 获取欢迎度排名条件
   */
  getGreetCondition = (key: any) => {
    let obj = this.state.greetList.find((x) => x.key === key) || {
      key: -1,
      value: "欢迎度排序",
    };
    this.setState({ selGreetCondition: obj, sheetOpened: false,panelType: -1 });
  };

  busEvent() {
    PubSub.subscribe("sheetOpened", (...data: any) => {
      this.setState({ sheetOpened: data[1] });
    });
  }

  /**
   * 关掉条件面板
   */
  closeCoonditionPanel = () => {
    this.setState({ sheetOpened: false, panelType: -1 });
  };

  componentDidMount() {
    this.busEvent();
  }

  componentWillUnmount(){
    //不注销监听就结束页面的话react会发出警告
    PubSub.clearAllSubscriptions()
  }
  render() {
    const {
      panelType,
      tabs,
      panels,
      curPrice,
      minRange,
      maxRange,
      startList,
      greetList,
      selGreetCondition,
      sheetOpened
    } = this.state;
    return (
      <div className={styles['hotel-condition']}>
        <ul className={styles['list']}>
          <li
            className={`${styles['item']} ${panelType === 1 ? styles['active'] : ""}`}
            onClick={() => {
              this.getPopupPanel(1);
            }}
          >
            {selGreetCondition.value}
          </li>
          <li
            className={`${styles['item']} ${panelType === 2 ? styles['active'] : ""}`}
            onClick={() => {
              this.getPopupPanel(2);
            }}
          >
            位置距离
          </li>
          <li
            className={`${styles['item']} ${panelType === 3 ? styles['active'] : ""}`}
            onClick={() => {
              this.getPopupPanel(3);
            }}
          >
            价格/星级
          </li>
          <li
            className={`${styles['item']} ${panelType === 4 ? styles['active'] : ""}`}
            onClick={() => {
              this.getPopupPanel(4);
            }}
          >
            筛选
          </li>
        </ul>
        <div className={styles['condition-sheet']} style={{display:!sheetOpened?'none':''}}>
          <div className={styles['condition-sheet-bg']} onClick={this.closeCoonditionPanel}></div>
          <div className={styles['page-content']}>
            {(() => {
              switch (this.state.panelType) {
                case 1:
                  return (
                    <F7List className={styles['greet-condition-list']}>
                      {greetList.map((item, index) => {
                        return (
                          <ListItem
                            key={index}
                            radio
                            onChange={() => {
                              this.getGreetCondition(item.key);
                            }}
                            title={item.value}
                            name="greets-radio"
                            style={{
                              color:
                                selGreetCondition.key === item.key
                                  ? "#23cc77"
                                  : "",
                            }}
                            value={item.key}
                          ></ListItem>
                        );
                      })}
                    </F7List>
                  );
                case 2:
                  return (
                    <NavTab
                      showNavBar={false}
                      tabs={tabs}
                      panels={panels}
                    ></NavTab>
                  );
                case 3:
                  return (
                    <PricePanel
                      curPrice={curPrice}
                      minRange={minRange}
                      maxRange={maxRange}
                      startList={startList}
                      getPriceRange={this.getPriceRange}
                      checkStart={this.checkStart}
                      resetCondition={this.resetCondition}
                      searchList={this.searchList}
                    ></PricePanel>
                  );
                case 4:
                  return (
                    <NavTab
                      showNavBar={false}
                      tabs={tabs}
                      panels={panels}
                    ></NavTab>
                  );
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}

export default Condition;
