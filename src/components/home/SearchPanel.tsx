import React from "react";
import "css/home/search-panel.scss";
import { Tabs, Tab, Toolbar, Link } from "framework7-react";
import Calendar from "components/common/Calendar";
import { getWeek,getDayByNum } from "utils/common";
const SearchForm = React.lazy(() => import("components/home/SearcForm"));
let dayDiff = 1; //日差
type stateType = {
  showCalendar: boolean;
  calendarInline: any;
  startDay: string;
  endDay: string;
  yesterday: string;
  fromWeek: string;
  toWeek: string;
};
type propsType = {};
const calendarRef = React.createRef<any>();
class SearchPanel extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      showCalendar: false,
      calendarInline: "",
      startDay:"",
      endDay:"",
      yesterday: "",
      fromWeek: "",
      toWeek: "",
    };
  }

  componentDidMount() {
    this.initCalendarDate();
  }

  /**
   * 模拟接口初始化数据
   */
  initCalendarDate = () => {
    let calendarInfo = {
      startDay:  new Date().Format('yyyy-MM-dd'),
      endDay: getDayByNum(new Date(),7).Format('yyyy-MM-dd'),
      fromWeek: "",
      toWeek:"",
    };
    calendarInfo.fromWeek = getWeek(calendarInfo.startDay);
    calendarInfo.fromWeek = getWeek(calendarInfo.toWeek);
    this.setState(calendarInfo,()=>{
      //setstate的异步原因，所以要初始化state以后再去根据新的state做操作
      this.getYesterday();
    });

    console.log(this.state);
  };

  /**
   * 获取昨天
   */
  getYesterday = () => {
    let day = new Date(this.state.startDay);
    let yesterday = getDayByNum(day,-1)
    this.setState({ yesterday: yesterday.Format("yyyy-M-d") });
  };

  /**
   * 打开日历
   * @param showCalendar
   */
  getCalendar = (showCalendar: boolean) => {
    this.setState({ showCalendar });
  };

  /**
   * 设置范围
   * @param dateArr
   */
  setDateRange = (dateArr: {
    startDay: string;
    endDay: string;
    fromWeek: string;
    toWeek: string;
  }) => {
    let sDay = new Date(dateArr.startDay);
    let eDay = new Date(dateArr.endDay);
    dayDiff = Math.abs(sDay.getTime() - eDay.getTime()) / 1000 / 60 / 60 / 24;
  };

  /**
   * 关闭日历，关闭时获取选中值
   */
  closeCalendar = () => {
    this.setState({ showCalendar: false }, () => {
      let dateArr = calendarRef.current.getSelDateArr();
      this.setState({
        startDay: dateArr.startDay,
        endDay: dateArr.endDay,
        fromWeek: dateArr.fromWeek,
        toWeek: dateArr.toWeek,
      });
    });
  };

  render() {
    const {
      startDay,
      endDay,
      yesterday,
      showCalendar,
      fromWeek,
      toWeek,
    } = this.state;
    console.log(this.state);
    return (
      <>
        <div className="search-panel">
          <Toolbar tabbar bottom>
            <Link tabLink="#tab-1" tabLinkActive>
              国内
            </Link>
            <Link tabLink="#tab-2">国外</Link>
            <Link tabLink="#tab-3">钟点房</Link>
          </Toolbar>
          <Tabs animated>
            <Tab id="tab-1" className="page-content" tabActive>
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
                  getCalendar={this.getCalendar}
                  dayDiff={dayDiff}
                />
              </div>
            </Tab>
            <Tab id="tab-2" className="page-content">
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
                  getCalendar={this.getCalendar}
                  dayDiff={dayDiff}
                />
              </div>
            </Tab>
            <Tab id="tab-3" className="page-content">
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
                  getCalendar={this.getCalendar}
                  dayDiff={dayDiff}
                />
              </div>
            </Tab>
          </Tabs>
        </div>
        <Calendar
          ref={calendarRef}
          showCalendar={showCalendar}
          curDay={new Date()}
          selDay={{ from: new Date(startDay), to: new Date(endDay) }}
          disableDay={{ to: new Date(yesterday) }}
          //如果方法带了括号就会立即执行，会导致state更新出现死循环
          closeCalendar={this.closeCalendar}
        />
      </>
    );
  }
}
export default SearchPanel;
