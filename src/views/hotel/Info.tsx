import React from 'react'
import 'css/common/nav.scss'
import Banner from 'components/common/Banner'
import IntroCard from 'components/hotel/IntroCard'
import { RouteComponentProps } from 'react-router-dom'
type stateTypes = {
  infoList: { url: string; alt: string }[]
  info: {
    score: number //分数
    titleName: string //酒店名称
    addr: string //地址名称
    landmark: string
    mapContent: string //地图内容
    subTitle: string //副标题
    tag: string[] //标签
  }
}
type propsTypes = {}
class Info extends React.Component<
  RouteComponentProps & propsTypes,
  stateTypes
> {
  constructor(props: any) {
    super(props)
    this.state = {
      infoList: [
        { url: 'assets/images/hotel/info-2.png', alt: '详情2' },
        { url: 'assets/images/hotel/info-1.png', alt: '详情1' },
      ],
      info: {
        score: 4.7, //分数
        titleName: '上海徐家汇天钥桥亚朵S酒店', //酒店名称
        addr: '天钥桥路325号嘉汇国际广场G座', //地址名称
        landmark: '徐家汇',
        mapContent: '距离上海体育场地铁站680米，步行约10分钟', //地图内容
        subTitle: '2019年开业', //副标题
        tag: ['快速办理入住', '客房WIFI免费', '中餐厅', '餐厅'], //标签
      },
    }
  }
  backFunc = () => {
    this.props.history.goBack()
  }
  render() {
    const { infoList,info } = this.state
    return (
      <>
        <Banner infoList={infoList} backFunc={this.backFunc}></Banner>
        <IntroCard info={info}></IntroCard>
      </>
    )
  }
}
export default Info
