import React from "react";
import Banner from "components/home/Banner";
import SearchPanel from "components/home/SearchPanel";

import "css/home/index.scss";

type stateType = {
  showCalendar: boolean;
};
type propsType = {};
class Index extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      showCalendar: false,
    };
  }
  componentDidMount() {}
  render() {
    return (
      <div className="home">
        <Banner />
        <SearchPanel />
      </div>
    );
  }
}

export default Index;
