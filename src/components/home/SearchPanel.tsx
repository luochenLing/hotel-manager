import React from "react";
import "css/home/search-panel.scss";
import { Tabs, Tab, Toolbar, Link } from "framework7-react";
import Calendar from "components/common/Calendar";
import pubSub from "pubsub-js";
const SearchForm = React.lazy(() => import("components/home/SearcForm"));
type stateType = {
  showCalendar: boolean;
  calendarInline: any;
  startDay: string;
  endDay: string;
  yesterday: string;
};
type propsType = {};
class Index extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      showCalendar: false,
      calendarInline: "",
      startDay: "2020-08-15",
      endDay: "2020-08-30",
      yesterday: "",
    };
  }
  
  componentDidMount() {
    this.initEvent();
    this.getYesterday();
  }

  getYesterday = () => {
    let day = new Date(this.state.startDay);
    day.setTime(day.getTime() - 24 * 60 * 60 * 1000);
    this.setState({ yesterday: day.Format("yyyy-M-d") });
  };

  getCalendar = (showCalendar: boolean, startDay: string, endDay: string) => {
    if (startDay && endDay) {
      this.setState({ startDay, endDay });
    }
    this.setState({ showCalendar });
  };

  initEvent() {
    pubSub.subscribe("closeCalendarPanel", (...val: any) => {
      this.setState({ showCalendar: val[1] });
    });
    pubSub.subscribe("setDate", (...val: [any, string[]]) => {
      this.setState({ startDay: val[1][0], endDay: val[1][1] });
    });
  }

  render() {
    const { startDay, endDay, yesterday, showCalendar } = this.state;
    return (
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
                getCalendar={this.getCalendar}
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
                getCalendar={this.getCalendar}
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
                getCalendar={this.getCalendar}
              />
            </div>
          </Tab>
        </Tabs>
        <Calendar
          showCalendar={showCalendar}
          curDay={new Date()}
          selDay={{ from: new Date(startDay), to: new Date(endDay) }}
          disableDay={{ to: new Date(yesterday) }}
          closeCalendar={()=>{
            this.setState({showCalendar:false})
          }}
        />
      </div>
    );
  }
}
export default Index;
