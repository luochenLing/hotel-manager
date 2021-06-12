import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import 'css/common/nav-tab.scss'
import { connect } from 'react-redux'
import {
  navPanelShowOption,
  keyWordConditionOption,
  keyWordPanelOption,
} from 'redux/action'
//设置默认类型
interface propsTypes {
  tabs: { key: any; value: string }[]
  panels: { key: any; value: string }[]
  showNavPanel: boolean
  navTitle: string
  showNavBar: boolean//是否显示导航栏
  keyWordConditionOption: Function
  navPanelShowOption: Function
  keyWordPanelOption: Function
}
//设置默认值
NavTabDOM.defaultProps = {
  tabs: [
    { key: '1', value: '高端连锁' },
    { key: '2', value: '中国连锁' },
    { key: '3', value: '快捷连锁' },
    { key: '4', value: '其他品牌' },
  ],
  panels: [
    { key: '1', value: '万豪' },
    { key: '2', value: '凯悦酒店' },
    { key: '3', value: '诺富特' },
    { key: '4', value: '万丽' },
    { key: '5', value: '日航' },
    { key: '6', value: '君越酒店' },
    { key: '7', value: 'JW万豪' },
    { key: '8', value: '书香世家' },
    { key: '9', value: '迪士尼' },
    { key: '10', value: '美伦' },
    { key: '11', value: '居舍系列' },
    { key: '12', value: '丽晶' },
    { key: '13', value: '星河湾' },
    { key: '14', value: '瑞士' },
    { key: '15', value: '桔子水晶' },
    { key: '16', value: '费尔德' },
    { key: '17', value: '臻品之选' },
    { key: '18', value: '丽呈' },
    { key: '19', value: '悦容庄' },
    { key: '20', value: 'Radisson Blu' },
  ],
  navTitle: '品牌',
  showNavBar: true,
}
function NavTabDOM(props: propsTypes) {
  const [tabActive, setTabActive] = useState(0) //tab的active样式
  const [clientHeight, setClientHeight] = useState(
    (document.documentElement || document.body).clientHeight
  )
  useEffect(() => {
    window.addEventListener('resize', resizeContent)
    return () => {
      window.removeEventListener('resize', resizeContent)
    }
  }, [])

  const resizeContent = () => {
    setClientHeight((document.documentElement || document.body).clientHeight)
  }

  const getActive = (num: number, key: any) => {
    setTabActive(num)
  }

  /**
   * 选中一个项
   * @param val 选中项的值
   */
  const selItem = (val: { key: any; value: string }) => {
    props.keyWordConditionOption(val)
    props.navPanelShowOption(false)
    props.keyWordPanelOption(false)
  }

  const goBack = () => {
    props.navPanelShowOption(false)
  }

  return (
    <div className='nav-tab' style={{ height: clientHeight }}>
      {props.showNavBar ? (
        <NavBar goBack={goBack}>
          <span slot='center'>{props.navTitle}</span>
          <span slot='right'></span>
        </NavBar>
      ) : (
        ''
      )}
      <div className='content' style={{height:props.showNavBar?'':'100%'}}>
        <ul className='tab'>
          {props.tabs.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  getActive(index, item.key)
                }}
                className={`tab-item ${tabActive === index ? 'active' : ''}`}>
                {item.value}
              </li>
            )
          })}
        </ul>
        <ul className='tab-panel'>
          {props.panels.map((item, index) => {
            return (
              <li
                key={item.key}
                className='tab-panel-item'
                onClick={() => {
                  selItem(item)
                }}>
                {item.value}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
const NavTab = React.forwardRef((props: any, ref: any) => {
  return <NavTabDOM {...props} myRef={ref}></NavTabDOM>
})
export default connect(
  (state: any) => ({
    showNavPanel: state.navPanelShowReducer,
    keyWordCondition: state.keyWordConditionReducer,
    showKeyWordPanel: state.keyWordPanelReducer,
  }),
  { navPanelShowOption, keyWordConditionOption, keyWordPanelOption }
)(NavTab)
