import React from "react";
import "css/home/search-panel.scss";
import {
  Tabs,
  Tab,
  Toolbar,
  Link,
  Popup,
  Page,
  Navbar,
  NavRight,
  Icon,
} from "framework7-react";
import CalendarSel from "components/home/CalendarSel";
import pubSub from "pubsub-js";
const SearchForm = React.lazy(() => import("components/home/SearcForm"));
type stateType = {
  showCalendar: boolean;
  calendarInline: any;
  startDay: string;
  endDay: string;
};
type propsType = {};
const calendarRef = React.createRef<any>();
class Index extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      showCalendar: false,
      calendarInline: "",
      startDay: "2020-08-15",
      endDay: "2020-08-30",
    };
  }
  componentDidMount() {
    this.initEvent();
  }

  getCalendar = (showCalendar: boolean, startDay: string, endDay: string) => {
    if (startDay && endDay) {
      this.setState({ startDay, endDay });
    }
    this.setState({ showCalendar });
    calendarRef.current.openCalendar();
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
    const { startDay, endDay } = this.state;
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
        {/* 日历条件 */}
        <Popup opened={this.state.showCalendar} className="demo-popup-swipe">
          <Page>
            <Navbar title="选择日期">
              <NavRight>
                <Link
                  onClick={() => {
                    this.setState({ showCalendar: false });
                  }}
                >
                  <Icon f7="multiply"></Icon>
                </Link>
              </NavRight>
            </Navbar>
            <CalendarSel ref={calendarRef} {...{ startDay, endDay }} />
          </Page>
        </Popup>
      </div>
    );
  }
}
export default Index;
