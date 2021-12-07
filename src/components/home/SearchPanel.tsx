import React from "react";
import styles from "css/home/search-panel.module.scss";
import { F7Link } from "framework7-react";
import KeyWord from "components/home/keyWord/Index";
import { getWeek, getDayByNum } from "utils/common";
import { connect } from "react-redux";
import { keyWordPanelOption } from "redux/action";
import PubSub from "pubsub-js";

const SearchForm = React.lazy(() => import("components/home/SearcForm"));

type stateType = {
  calendarInline: any;
  startDay: string;
  endDay: string;
  dayDiff: number;
  fromWeek: string;
  toWeek: string;
  curTabKey: string;
  linkTabs: {
    name: string;
    label: string;
  }[];
};
type propsType = {
  keyWordPanelOption: Function;
  keyWord: boolean;
};

class SearchPanel extends React.Component<propsType, stateType> {
  myRef: React.RefObject<F7Link>;
  constructor(props: any) {
    super(props);
    this.state = {
      calendarInline: "",
      startDay: "",
      endDay: "",
      dayDiff: 0,
      fromWeek: "",
      toWeek: "",
      curTabKey: "gn", //当前选中的tab
      linkTabs: [
        {
          name: "国内",
          label: "gn",
        },
        {
          name: "国外",
          label: "gw",
        },
        {
          name: "钟点房",
          label: "zdf",
        },
      ],
    };

    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.initCalendarDate();
    this.initKeyWordPanel();
    this.busEvent();
  }

  componentWillUnmount() {
    //不注销监听就结束页面的话react会发出警告
    PubSub.clearAllSubscriptions();
  }

  // shouldComponentUpdate(nextProps:propsType,nextState:stateType){
  //   console.log(nextProps,nextState)
  //   return false
  // }

  /**
   * 初始化关键字面板
   */
  initKeyWordPanel() {
    this.props.keyWordPanelOption(false);
  }

  /**
   * 事件绑定
   */
  busEvent() {
    PubSub.subscribe("updateTime", (...ret: any) => {
      if (ret[1].data.startDay && ret[1].data.endDay) {
        this.setState({ startDay: ret[1].data.startDay });
        this.setState({ endDay: ret[1].data.endDay });
      }
    });
  }

  /**
   * 模拟接口初始化数据
   */
  initCalendarDate = () => {
    const startDay = new Date().Format("yyyy-MM-dd");
    const endDay = getDayByNum(new Date(), 7).Format("yyyy-MM-dd");
    const fromWeek = getWeek(startDay);
    const toWeek = getWeek(endDay);
    const dayDiff = this.getDayDiff(startDay, endDay);
    this.setState({
      startDay,
      endDay,
      dayDiff,
      fromWeek,
      toWeek,
    });
  };

  /**
   * 打开关键词面板
   * @param showKeyWork
   */
  openKeyWord = () => {
    this.props.keyWordPanelOption(true);
  };

  /**
   * 获取日期间隔
   * @param dateArr
   */
  getDayDiff = (startDay: string, endDay: string) => {
    let sDay = new Date(startDay);
    let eDay = new Date(endDay);
    return Math.ceil(
      Math.abs(sDay.getTime() - eDay.getTime()) / 1000 / 60 / 60 / 24
    );
  };

  getSearchForm = (
    startDay: string,
    endDay: string,
    fromWeek: string,
    toWeek: string
  ) => {
    return (
      <SearchForm
        startDay={startDay}
        endDay={endDay}
        fromWeek={fromWeek}
        toWeek={toWeek}
        openKeyWord={this.openKeyWord}
      />
    );
  };

  /**
   * 跳转到某个tab
   */
  goTab = (label: string) => {
    this.setState({ curTabKey: label });
  };

  render() {
    const { startDay, endDay, fromWeek, toWeek } =
      this.state;
    return (
      <>
        <div className={styles["search-panel"]}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
            }}
          >
            <SearchForm
              startDay={startDay}
              endDay={endDay}
              fromWeek={fromWeek}
              toWeek={toWeek}
              openKeyWord={this.openKeyWord}
            />
          </div>
        </div>

        {/* 这里不再用state去控制开关，在redux中的话，使用props的属性去读取state状态，
        这是因为使用了reactredux所以让状态的读取通过外面的（app.js）Provider的store就可以达到读取属性的效果 */}
        <KeyWord showKeyWord={this.props.keyWord} />
      </>
    );
  }
}
//state这里放的是reducer里面指定方法的state，比如reducer的keyWorkPanelOption方法的state这里就可以取到
//第二个参数是需要用到的action的方法，这些方法在这里注册以后可以用props的方式调用
export default connect(
  (state: any) => ({ keyWord: state.keyWordPanelReducer }),
  {
    keyWordPanelOption,
  }
)(SearchPanel);
