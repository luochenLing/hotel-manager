import React from "react";
import styles from "css/hotel/pro-list.module.scss";
import { RouteComponentProps, withRouter } from "react-router-dom";
type stateType = {
  apiData: {
    proUrl: string;
    title: string;
    intro: string;
    tagList: {
      key: string;
      value: string;
    }[];
    startLevel: number;
    score: number;
    priceUint: string;
    priceNum: number;
  }[];
};
type propsType = {};
class ProList extends React.Component<
  RouteComponentProps & propsType,
  stateType
> {
  constructor(props: any) {
    super(props);
    this.state = {
      apiData: [
        {
          proUrl: "assets/images/hotel/p-img1.webp", //产品图片
          title: "上海陆家嘴酒店", //产品标题
          intro:
            "位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区",
          tagList: [
            { key: "0", value: "商务出行" },
            { key: "1", value: "精品酒店" },
            { key: "2", value: "近地铁" },
          ], //标签
          startLevel: 4, //星级
          score: 4.7, //分数
          priceUint: "￥", //价格单元
          priceNum: 470, //价格
        },
      ],
    };
  }
  /**
   * 产品列表数据初始化
   */
  initData = () => {
    this.setState({
      apiData: [
        {
          proUrl: "assets/images/hotel/p-img1.webp", //产品图片
          title: "上海陆家嘴酒店", //产品标题
          intro:
            "位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区",
          tagList: [
            { key: "0", value: "商务出行" },
            { key: "1", value: "精品酒店" },
            { key: "2", value: "近地铁" },
          ], //标签
          startLevel: 5, //星级
          score: 4.7, //分数
          priceUint: "￥", //价格单元
          priceNum: 470, //价格
        },
        {
          proUrl: "assets/images/hotel/p-img1.webp", //产品图片
          title: "上海陆家嘴酒店", //产品标题
          intro:
            "位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区",
          tagList: [
            { key: "0", value: "商务出行" },
            { key: "1", value: "精品酒店" },
            { key: "2", value: "近地铁" },
          ], //标签
          startLevel: 4, //星级
          score: 4.7, //分数
          priceUint: "￥", //价格单元
          priceNum: 470, //价格
        },
        {
          proUrl: "assets/images/hotel/p-img1.webp", //产品图片
          title: "上海陆家嘴酒店", //产品标题
          intro:
            "位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区",
          tagList: [
            { key: "0", value: "商务出行" },
            { key: "1", value: "精品酒店" },
            { key: "2", value: "近地铁" },
          ], //标签
          startLevel: 4, //星级
          score: 4.7, //分数
          priceUint: "￥", //价格单元
          priceNum: 470, //价格
        },
        {
          proUrl: "assets/images/hotel/p-img1.webp", //产品图片
          title: "上海陆家嘴酒店", //产品标题
          intro:
            "位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区",
          tagList: [
            { key: "0", value: "商务出行" },
            { key: "1", value: "精品酒店" },
            { key: "2", value: "近地铁" },
          ], //标签
          startLevel: 4, //星级
          score: 4.7, //分数
          priceUint: "￥", //价格单元
          priceNum: 470, //价格
        },
        {
          proUrl: "assets/images/hotel/p-img1.webp", //产品图片
          title: "上海陆家嘴酒店", //产品标题
          intro:
            "位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区",
          tagList: [
            { key: "0", value: "商务出行" },
            { key: "1", value: "精品酒店" },
            { key: "2", value: "近地铁" },
          ], //标签
          startLevel: 4, //星级
          score: 4.7, //分数
          priceUint: "￥", //价格单元
          priceNum: 470, //价格
        },
        {
          proUrl: "assets/images/hotel/p-img1.webp", //产品图片
          title: "上海陆家嘴酒店", //产品标题
          intro:
            "位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区",
          tagList: [
            { key: "0", value: "商务出行" },
            { key: "1", value: "精品酒店" },
            { key: "2", value: "近地铁" },
          ], //标签
          startLevel: 1, //星级
          score: 4.7, //分数
          priceUint: "￥", //价格单元
          priceNum: 470, //价格
        },
      ],
    });
  };
  /**
   * 酒店详情页面
   */
  getInfoPage = () => {
    this.props.history.push("/hotelInfo");
  };
  componentDidMount() {
    this.initData();
  }
  render() {
    const { apiData } = this.state;
    return (
      <div className={styles["pro-container"]}>
        <ul className={styles["pro-list"]}>
          {apiData.map((item, idx) => {
            return (
              <li
                className={styles["item"]}
                key={idx}
                onClick={this.getInfoPage}
              >
                <img
                  className={styles["pro-img"]}
                  src={item.proUrl}
                  alt="商品展示"
                />
                <div className={styles["content"]}>
                  <h3 className={styles["title"]}>{item.title}</h3>
                  <section className={styles["intro"]}>{item.intro}</section>
                  <section className={styles["tag"]}>
                    {/* 多出来的隐藏掉 */}
                    {(item.tagList || []).map((tagEle, tagIdx) => {
                      return (
                        <em className={styles["tag-item"]} key={tagIdx}>
                          {tagEle.value}
                        </em>
                      );
                    })}
                  </section>
                  <article className={styles["other"]}>
                    <section className={styles["left"]}>
                      <ul className={styles["star-list"]}>
                        {(() => {
                          let dom = [];
                          if (item.startLevel) {
                            for (let i = 0; i < item.startLevel; i++) {
                              dom.push(
                                <li
                                  className={styles["star-item"]}
                                  key={i}
                                ></li>
                              );
                            }
                          }
                          return dom;
                        })()}
                      </ul>
                      <section className={styles["score"]}>
                        <b className={styles["num"]}>{item.score}</b>
                        <em className={styles["unit"]}>分</em>
                      </section>
                    </section>
                    <section className={styles["price"]}>
                      <small className={styles["unit"]}>{item.priceUint}</small>
                      <b className={styles["num"]}>{item.priceNum}</b>
                      <em className={styles["end"]}>起</em>
                    </section>
                  </article>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(ProList);
