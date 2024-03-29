import React from "react";
import NavBar from "components/common/NavBar";
import InputSearch from "components/common/InputSearch";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import PubSub from "pubsub-js";
import styles from "css/hotel/search-bar.module.scss";

type stateType = {};
type propsType = {};
class SearchBar extends React.Component<
  RouteComponentProps & propsType,
  stateType
> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  goBack = () => {
    PubSub.publishSync("sheetOpened", false);
    this.props.history.goBack();
  };
  render() {
    return (
      <div className={styles["pro-condition"]}>
        <NavBar goBack={this.goBack}>
          <span className={styles["center"]} slot="center">
            <span className={styles["city"]}>上海</span>
            <div className={styles["cal-bar"]}>
              <div className={styles["container"]}>
                <span className={styles["s-day"]}>
                  <i>住</i>
                  <em>11-1</em>
                </span>
                <span className={styles["e-day"]}>
                  <i>离</i>
                  <em>11-1</em>
                </span>
              </div>
            </div>
            <InputSearch placeholderName="关键字/位置/酒店名"></InputSearch>
          </span>
          <span className={styles["btn-map"]} slot="right">地图</span>
        </NavBar>
      </div>
    );
  }
}

export default withRouter(SearchBar);
