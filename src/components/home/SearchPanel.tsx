import React from "react";
import "css/home/search-panel.scss";
import { Tabs, Tab, Toolbar, Link } from "framework7-react";
import Calendar from "components/common/Calendar";
import { getWeek } from "utils/common";
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
class SearchPanel extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      showCalendar: false,
      calendarInline: "",
      startDay: "2020-08-15",
      endDay: "2020-08-30",
      yesterday: "",
      fromWeek:'',
      toWeek:''
    };
  }

  componentDidMount() {
    this.getYesterday();
    this.initWeekDay();
  }
  initWeekDay=()=>{
    // this.setState({fromWeek:getWeek(this.state.startDay),toWeek:getWeek(this.state.endDay)});
    this.setState({fromWeek:'周一',toWeek:'周二'});
  }
  getYesterday = () => {
    let day = new Date(this.state.startDay);
    day.setTime(day.getTime() - 24 * 60 * 60 * 1000);
    this.setState({ yesterday: day.Format("yyyy-M-d") });
  };

  getCalendar = (showCalendar: boolean) => {
    this.setState({ showCalendar });
  };

  setDateRange = (dateArr: {
    startDay: string;
    endDay: string;
    fromWeek: string;
    toWeek: string;
  }) => {
    console.log(dateArr.fromWeek,dateArr.toWeek)
    let sDay = new Date(dateArr.startDay);
    let eDay = new Date(dateArr.endDay);
    dayDiff = Math.abs(sDay.getTime() - eDay.getTime()) / 1000 / 60 / 60 / 24;
    this.setState({ startDay: dateArr.startDay, endDay: dateArr.endDay,fromWeek:dateArr.fromWeek,toWeek:dateArr.toWeek });
  };

  render() {
    const { startDay, endDay, yesterday, showCalendar,fromWeek,toWeek } = this.state;
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
          showCalendar={showCalendar}
          curDay={new Date()}
          selDay={{ from: new Date(startDay), to: new Date(endDay) }}
          disableDay={{ to: new Date(yesterday) }}
          closeCalendar={() => {
            this.setState({ showCalendar: false });
          }}
          getSelDateArr={(dateArr: {
            startDay: string;
            endDay: string;
            fromWeek: string;
            toWeek: string;
          }) => {
            this.setDateRange(dateArr);
          }}
        />
      </>
    );
  }
}
export default SearchPanel;
