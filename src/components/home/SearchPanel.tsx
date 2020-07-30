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
const SearchForm = React.lazy(() => import("components/home/SearcForm"));
type stateType = {
  showCalendar: boolean;
  calendarInline: any;
};
type propsType = {};
const calendarRef = React.createRef();
class Index extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      showCalendar: false,
      calendarInline: "",
    };
    
  }
  
  getCalendar = (val: boolean) => {
    this.setState({ showCalendar: val });
  };

  /**
   * 弹层关闭的时候初始化日历
   */
  initCalendarByClose() {
    console.log(calendarRef);
    // document.querySelectorAll(".active").forEach((item) => {
    //   item.classList.remove("active");
    // });
    // document.querySelectorAll(".calendar-day-selected").forEach((item) => {
    //   item.classList.remove("calendar-day-selected");
    // });
  }
  render() {
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
              <SearchForm getCalendar={this.getCalendar} />
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
              <SearchForm getCalendar={this.getCalendar} />
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
              <SearchForm getCalendar={this.getCalendar} />
            </div>
          </Tab>
        </Tabs>
        {/* 日历条件 */}
        <Popup
          opened={this.state.showCalendar}
          onPopupClosed={this.initCalendarByClose}
          className="demo-popup-swipe"
        >
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
            <CalendarSel ref={calendarRef}/>
          </Page>
        </Popup>
      </div>
    );
  }
}
export default Index;
