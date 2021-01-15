import React from 'react'
import 'css/common/nav.scss'
import Banner from 'components/common/Banner'
import { RouteComponentProps } from 'react-router-dom'
type stateTypes = {
  infoList:{ url: string; alt: string }[]
}
type propsTypes = {}
class Info extends React.Component<RouteComponentProps&propsTypes, stateTypes> {
  constructor(props: any) {
    super(props)
    this.state = {
      infoList: [
        { url: 'assets/images/hotel/info-2.png', alt: '详情2' },
        { url: 'assets/images/hotel/info-1.png', alt: '详情1' },
      ],
    }
  }
  backFunc=()=>{
    this.props.history.goBack()
  }
  render() {
    const {infoList} =this.state
    return (
      <>
        <Banner infoList={infoList} backFunc={this.backFunc}></Banner>
      </>
    )
  }
}
export default Info
