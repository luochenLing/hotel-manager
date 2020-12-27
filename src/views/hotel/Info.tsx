import React from "react";
import "css/hotel/hotel-info.scss";
import Banner from "components/hotel/Banner";
type stateTypes = {};
type propsTypes = {};
class Info extends React.Component<propsTypes, stateTypes> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Banner></Banner>
      </>
    );
  }
}
export default Info;
