import React from "react";
import "css/home/search-form.scss";
import {
  Range,
  F7Button,
  Icon,
  Page,
  Popup,
  Block,
  Button,
} from "framework7-react";
type stateType = {
  popupOpened: boolean;
  maxRange: number;
  minRange: number;
  curPrice: number;
  startselect: number;
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
      maxRange: 900,
      minRange: 0,
      curPrice: 0,
      startselect: 1,
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
  checkStart(num: number) {
    this.setState({ startselect: num });
  }

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
    this.setState({ popupOpened: false });
  };

  /**
   * 重置条件
   */
  resetCondition = () => {
    this.setState({ curPrice: 0 });
    this.setState({ startselect: 1 });
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
            <Block>
              <ul className="price">
                <li className="price-title">
                  <span style={{ marginRight: ".5rem" }}>价格</span>
                  {this.state.curPrice ? (
                    <span className="num">￥{this.state.curPrice}以上</span>
                  ) : (
                    ""
                  )}
                </li>
                <li className="price-slider">
                  <Range
                    value={this.state.curPrice}
                    min={this.state.minRange}
                    max={this.state.maxRange}
                    label={true}
                    step={5}
                    className="price-slider-bar"
                    onRangeChange={this.getPriceRange}
                  >
                    <span className="min-prince">￥{this.state.minRange}</span>
                    <span className="max-prince">
                      ￥{this.state.maxRange}以上
                    </span>
                  </Range>
                  <div className="range-knob end-knob"></div>
                </li>
              </ul>
              <ul className="star-rating">
                <li className="star-rating-title">
                  <h3>星级</h3>
                  <span>(可多选)</span>
                </li>
                <li className="star-rating-content">
                  <ul className="start-list">
                    <li
                      className={`start-list-item ${
                        this.state.startselect === 1 ? "active" : ""
                      }`}
                      onClick={() => {
                        this.checkStart(1);
                      }}
                    >
                      二星(钻)及以下经济
                    </li>
                    <li
                      className={`start-list-item ${
                        this.state.startselect === 2 ? "active" : ""
                      }`}
                      onClick={() => {
                        this.checkStart(2);
                      }}
                    >
                      三星(钻)舒适
                    </li>
                    <li
                      className={`start-list-item ${
                        this.state.startselect === 3 ? "active" : ""
                      }`}
                      onClick={() => {
                        this.checkStart(3);
                      }}
                    >
                      二星(钻)高档
                    </li>
                    <li
                      className={`start-list-item ${
                        this.state.startselect === 4 ? "active" : ""
                      }`}
                      onClick={() => {
                        this.checkStart(4);
                      }}
                    >
                      二星(钻)豪华
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="btn-tools">
                <Button
                  className="btn-reset"
                  outline
                  onClick={this.resetCondition}
                >
                  重置
                </Button>
                <Button className="btn-ok" fill onClick={this.searchList}>
                  完成
                </Button>
              </div>
            </Block>
          </Page>
        </Popup>
      </>
    );
  }
}

export default SearcForm;
