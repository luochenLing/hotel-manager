import React from "react";
import Condition from "components/hotel/Condition";
import SearchBar from "components/hotel/SearchBar";
import ProList from "components/hotel/ProList";
type stateType = {};
type propsType = {};
class Index extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div style={{ height: "100%" }}>
        <SearchBar />
        <Condition />
        <ProList />
      </div>
    );
  }
}

export default Index;
