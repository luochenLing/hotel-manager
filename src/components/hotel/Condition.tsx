import React from 'react'
import NavBar from 'components/common/NavBar'
import InputSearch from 'components/common/InputSearch'
import {withRouter} from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
type stateType = {}
type propsType = {}
class Condition extends React.Component<RouteComponentProps&propsType, stateType> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }
  goBack=()=>{
    this.props.history.goBack()
  }
  render() {
    return (
      <div>
        <NavBar goBack={this.goBack}>
          <span slot='center'>
            <span></span>
            <div>
              <span>
                <span>住</span>
                <span>11-1</span>
              </span>
              <span>
                <span>离</span>
                <span>11-1</span>
              </span>
            </div>
            <InputSearch placeholderName="关键字/位置/酒店名"></InputSearch>
          </span>
          <span slot='right'>地图</span>
        </NavBar>
      </div>
    )
  }
}

export default withRouter(Condition)
