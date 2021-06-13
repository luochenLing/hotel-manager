import React from "react";
import Banner from "components/common/Banner";
import SearchPanel from "components/home/SearchPanel";
import styles from "css/home/index.module.scss";
// import "css/common/nav.scss";

type stateType = {
  showCalendar: boolean;
  infoList: { url: string; alt: string }[];
};
type propsType = {};
class Index extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      showCalendar: false,
      infoList: [
        { url: "assets/images/home/idx1.png", alt: "惊喜1" },
        { url: "assets/images/home/idx2.png", alt: "惊喜2" },
      ],
    };
  }
  componentDidMount() {}
  render() {
    const { infoList } = this.state;
    return (
      <div className={styles["home"]}>
        <Banner infoList={infoList} />
        <SearchPanel />
      </div>
    );
  }
}

export default Index;
