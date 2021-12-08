import React from "react";
// import { unmountComponentAtNode } from "react-dom";
import styles from "css/home/search-form.module.scss";
import { F7Button, Icon, Page, Popup, Block } from "framework7-react";
import { connect } from "react-redux";
import { keyWordConditionOption } from "redux/action";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import PricePanel from "components/common/PricePanel";
import DateSelector from "components/common/DateSelector";
import PubSubJs from "pubsub-js";
interface stateType {
  popupOpened: boolean;
  maxRange: number;
  minRange: number;
  curPrice: number;
  startList: { name: string; checked: boolean; code: string }[];
  selStartList: string[];
}
interface propsType {
  openKeyWord: Function;
  startDay: string;
  endDay: string;
  fromWeek: string;
  toWeek: string;
  condition: { key: any; value: string };
}
interface RouterProps extends RouteComponentProps {
  // custom properties passed to component
}
type mapPropsType = RouterProps & propsType;
class SearcForm extends React.PureComponent<mapPropsType, stateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      popupOpened: false,
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
    };
  }
  startDayDom = React.createRef<HTMLElement>();
  endDayDom = React.createRef<HTMLElement>();
  /**
   * 打开价格筛选框
   */
  openPanel = () => {
    this.setState({ popupOpened: true });
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
   * 选择价格区间
   */
  getPriceRange = (e: any) => {
    this.setState({ curPrice: e });
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
      popupOpened: false,
    });
  };

  /**
   * 查询条件界面按钮事件
   */
  search = () => {
    this.props.history.push("/hotel");
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
   * 开启关键词页面
   */
  openKeyWord = () => {
    this.props.openKeyWord(true);
  };

  /**
   * 修改起止时间
   */
  updateTime = (data: { startDay: string; endDay: string }) => {
    PubSubJs.publish("updateTime", { data });
  };

  // componentWillUnmount() {
  //   /**
  //    * 卸载的时候处理一下日历组件，在searchPanel组件中因为调用了三次searchForm的组件，
  //    * 所以点击获取日历组件的时候日历组件可能会挂载三次，
  //    * 所以在searchPanel组件的tab切换的时候searchForm会被消除掉，这时候再把日历组件卸载
  //    * 保证每次切换tab的时候日历组件只有一个，
  //    * 不然会触发日历组件点击时候的一些bug，
  //    * 实际上在未来的调用中最好也保证一个app只有一个日历组件去维持通用性
  //    */
  //   debugger;
  //   let calendar = document.getElementsByClassName(
  //     "calendar-slide-out"
  //   )[0] as Element;
  //   if (calendar) {
  //     unmountComponentAtNode(calendar);
  //   }
  // }

  // static getDerivedStateFromProps(props:propsType, state:stateType) {
  //   debugger
  //   return null
  // }

  // shouldComponentUpdate(nextProps:propsType,nextState:stateType){
  //   console.log(nextProps,nextState)
  //   return true
  // }

  render() {
    const { startDay, endDay, condition } = this.props;
    return (
      <>
        <ul className={styles["search-form"]}>
          <li>
            <h4>杭州</h4>
            <div className={styles["cur-position"]}>
              <Icon size="13" f7="scope" bgColor="#23cc77;"></Icon>
              <span>当前位置</span>
            </div>
          </li>
          <li>
            <DateSelector
              startDate={startDay}
              endDate={endDay}
              updateTime={this.updateTime}
            />
          </li>
          <li className={styles["search-key"]} onClick={this.openKeyWord}>
            <span>
              {condition ? condition.value : "关键字/位置/品牌/酒店名"}
            </span>
          </li>
          <li className={styles["search-price"]} onClick={this.openPanel}>
            <span>
              {(() => {
                if (this.state.curPrice && this.state.selStartList.length > 0) {
                  return `${
                    this.state.curPrice
                  }以上/${this.state.selStartList.join("、")}`;
                } else if (this.state.curPrice) {
                  return `${this.state.curPrice}以上`;
                } else if (this.state.selStartList.length > 0) {
                  return `${this.state.selStartList}`;
                } else {
                  return "价格/星级";
                }
              })()}
            </span>
          </li>
          <li>
            <F7Button
              fill
              large
              round
              style={{ width: "100%" }}
              onClick={this.search}
            >
              查询
            </F7Button>
          </li>
        </ul>
        <Popup
          className={styles["condition-pop"]}
          opened={this.state.popupOpened}
          onPopupClosed={() => this.setState({ popupOpened: false })}
        >
          <Page>
            <Block>
              <PricePanel
                curPrice={this.state.curPrice}
                minRange={this.state.minRange}
                maxRange={this.state.maxRange}
                startList={this.state.startList}
                getPriceRange={this.getPriceRange}
                checkStart={this.checkStart}
                resetCondition={this.resetCondition}
                searchList={this.searchList}
              />
            </Block>
          </Page>
        </Popup>
      </>
    );
  }
}
export default connect(
  (state: any) => ({ condition: state.keyWordConditionReducer }),
  {
    keyWordConditionOption,
  }
)(withRouter(SearcForm));
