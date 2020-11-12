import React from 'react'
import { Popup, Page, Block } from 'framework7-react'
import NavTab from 'components/common/NavTab'
import PricePanel from 'components/common/PricePanel'

import 'css/hotel/condition.scss'
type stateType = {
  popupOpened: boolean
  panelType: number
  tabs: { key: any; value: string }[]
  panels: { key: any; value: string }[]
}
type propsType = {}
class Condition extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props)
    this.state = {
      popupOpened: false,
      panelType: 0, //面板类型
      tabs: [], //tab内容
      panels: [], //面板内容
    }
  }

  /**
   * 根据条件tab打开对应的面板
   */
  getPopupPanel = (key: number) => {
    let tabs,
      panels = []
    switch (key) {
      case 1:
        this.setState({ panelType: key, popupOpened: true })
        break
      case 2:
        tabs = [
          { key: '1', value: '地铁一号线' },
          { key: '2', value: '青城县' },
          { key: '3', value: '神木县' },
          { key: '4', value: '六盘山' },
          { key: '5', value: '地铁二号线' },
        ]
        panels = [
          { key: '1', value: '阳光花园' },
          { key: '2', value: '陆家嘴' },
          { key: '3', value: '徐家汇' },
          { key: '4', value: '华漕' },
          { key: '5', value: '王府井' },
          { key: '6', value: '什刹海' },
        ]
        this.setState({ panelType: key, popupOpened: true, tabs, panels })
        break
      case 3:
        this.setState({ panelType: key, popupOpened: true })
        break
      case 4:
        tabs = [
          { key: '1', value: '评价最多' },
          { key: '2', value: '月销售最多' },
        ]
        panels = [
          { key: '1', value: '丽晶酒店' },
          { key: '2', value: '汉庭' },
          { key: '3', value: '如家' },
          { key: '4', value: '桔子水晶' },
          { key: '5', value: '民宿' },
          { key: '6', value: '万豪' },
        ]
        this.setState({ panelType: key, popupOpened: true, tabs, panels })
        break
    }
  }
  render() {
    const { panelType } = this.state
    return (
      <div className='hotel-condition'>
        <ul className='list'>
          <li
            className={`item ${panelType === 1 ? 'active' : ''}`}
            onClick={() => {
              this.getPopupPanel(1)
            }}>
            欢迎度排序
          </li>
          <li
            className={`item ${panelType === 2 ? 'active' : ''}`}
            onClick={() => {
              this.getPopupPanel(2)
            }}>
            位置距离
          </li>
          <li
            className={`item ${panelType === 3 ? 'active' : ''}`}
            onClick={() => {
              this.getPopupPanel(3)
            }}>
            价格/星级
          </li>
          <li
            className={`item ${panelType === 4 ? 'active' : ''}`}
            onClick={() => {
              this.getPopupPanel(4)
            }}>
            筛选
          </li>
        </ul>
        <Popup
          className='condition-pop'
          opened={this.state.popupOpened}
          onPopupClosed={() => this.setState({ popupOpened: false })}>
          <Page>
            <Block>
              {(() => {
                switch (this.state.panelType) {
                  case 1:
                  case 2:
                    return <NavTab></NavTab>
                  case 3:
                    return <PricePanel></PricePanel>
                  case 4:
                    return <NavTab></NavTab>
                }
              })()}
            </Block>
          </Page>
        </Popup>
      </div>
    )
  }
}

export default Condition
