import React from 'react'
import NavBar from 'components/common/NavBar'
import InputSearch from 'components/common/InputSearch'
import {withRouter} from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import PubSub from 'pubsub-js'
import 'css/hotel/search-bar.scss'

type stateType = {}
type propsType = {}
class SearchBar extends React.Component<RouteComponentProps&propsType, stateType> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }
  goBack=()=>{
    PubSub.publishSync("sheetOpened",false)
    this.props.history.goBack()
  }
  render() {
    return (
      <div className="pro-condition">
        <NavBar goBack={this.goBack}>
          <span className="container" slot='center'>
            <span className="city">
              上海
            </span>
            <div className="cal-bar">
              <div className="container">
              <span className="s-day">
                <i>住</i>
                <em>11-1</em>
              </span>
              <span className="e-day">
                <i>离</i>
                <em>11-1</em>
              </span>
              </div>
            </div>
            <InputSearch placeholderName="关键字/位置/酒店名"></InputSearch>
          </span>
          <span slot='right'>地图</span>
        </NavBar>
      </div>
    )
  }
}

export default withRouter(SearchBar)
