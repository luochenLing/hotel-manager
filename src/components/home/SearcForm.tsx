import React from "react";
import "css/home/search-form.scss";
import { F7Button, Icon } from "framework7-react";
type stateType = {};
type propsType = {
  getCalendar: Function;
};
class SearcForm extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
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
              this.props.getCalendar(true);
            }}
            className="date-condition"
          >
            <div>
              <h4>入住</h4>
              <span className="">07月10日</span>
              <i>今天</i>
            </div>
            <h4 className="date-count">1晚</h4>
            <div>
              <h4>离店</h4>
              <span>07月10日</span>
              <i>周六</i>
            </div>
          </li>
          <li className="search-key">
            <span>关键字/位置/品牌/酒店名</span>
          </li>
          <li className="search-price">
            <span>价格/星级</span>
          </li>
          <li>
            <F7Button fill large round style={{ width: "100%" }}>
              查询
            </F7Button>
          </li>
        </ul>
      </>
    );
  }
}

export default SearcForm;
