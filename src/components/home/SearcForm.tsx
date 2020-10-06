import React from "react";
import "css/home/search-form.scss";
import {
  Block,
  F7Button,
  Icon,
  Link,
  Navbar,
  NavRight,
  Page,
  Popup,
} from "framework7-react";
type stateType = {
  popupOpened: boolean;
};
type propsType = {
  getCalendar: Function;
  startDay: string;
  endDay: string;
  fromWeek: string;
  toWeek: string;
  dayDiff: number;
};
class SearcForm extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      popupOpened: false,
    };
  }
  startDayDom = React.createRef<HTMLElement>();
  endDayDom = React.createRef<HTMLElement>();
  openPanel = () => {
    this.setState({ popupOpened: true });
  };
  render() {
    const { startDay, endDay } = this.props;
    return (
      <>
        <ul className="search-form">
          <li>
            <h4>杭州</h4>
            <div className="cur-position">
              <Icon size="13" f7="scope" bgColor="#23cc77;"></Icon>
              <span>当前位置</span>
            </div>
          </li>
          <li
            onClick={() => {
              this.props.getCalendar(
                true,
                this.startDayDom.current?.getAttribute("data-seldate"),
                this.endDayDom.current?.getAttribute("data-seldate")
              );
            }}
            className="date-condition"
          >
            <div>
              <h4>入住</h4>
              <span ref={this.startDayDom} data-seldate={startDay}>
                {`${startDay.split("-")[1]}月${startDay.split("-")[2]}日`}
              </span>
              <i>{this.props.fromWeek}</i>
            </div>
            <h4 className="date-count">{this.props.dayDiff}晚</h4>
            <div>
              <h4>离店</h4>
              <span ref={this.endDayDom} data-seldate={endDay}>
                {`${endDay.split("-")[1]}月${endDay.split("-")[2]}日`}
              </span>
              <i>{this.props.toWeek}</i>
            </div>
          </li>
          <li className="search-key">
            <span>关键字/位置/品牌/酒店名</span>
          </li>
          <li className="search-price" onClick={this.openPanel}>
            <span>价格/星级</span>
          </li>
          <li>
            <F7Button fill large round style={{ width: "100%" }}>
              查询
            </F7Button>
          </li>
        </ul>
        <Popup
          className="condition-pop"
          opened={this.state.popupOpened}
          onPopupClosed={() => this.setState({ popupOpened: false })}
        >
          <Page>
            <Navbar title="Popup Title">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p>
                Here comes popup. You can put here anything, even independent
                view with its own navigation. Also not, that by default popup
                looks a bit different on iPhone/iPod and iPad, on iPhone it is
                fullscreen.
              </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
              <p>
                Duis ut mauris sollicitudin, venenatis nisi sed, luctus
                ligula...
              </p>
            </Block>
          </Page>
        </Popup>
      </>
    );
  }
}

export default SearcForm;
