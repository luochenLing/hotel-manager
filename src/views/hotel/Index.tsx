import React from "react";
import Condition from "components/hotel/Condition";
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
      <div className="hotel">
        <Condition />
        <ProList />
      </div>
    );
  }
}

export default Index;
