import React, { useState } from 'react'
import 'css/home/keyWord/panel-list.scss'
import { connect } from 'react-redux'
import { keyWordConditionOption, keyWordPanelOption } from 'redux/action'

interface propsTypes {
  imgUrl: string
  title: string
  listItem: {}
  panelItemData: {
    name: ''
    data: any[]
    bgColor: string
    bgPosition: string
    needMore: string //是否显示更多按钮
  }
  celsCount: number
  keyWordConditionOption: Function
  keyWordPanelOption: Function
}

function PanelItemDom(props: propsTypes) {
  const [rows] = useState(2)
  const [showItem, setShowItem] = useState(false) //是否显示剩下的列表项

  const [isUp, setIsUp] = useState(false) //展开收起图标
  const setPanel = () => {
    setIsUp(!isUp)
    setShowItem(!showItem)
  }
  const setKeyWordCondition = (val: string) => {
    props.keyWordConditionOption(val)
    props.keyWordPanelOption(false)
  }
  return (
    <div className='keyword'>
      <div className='keyword-title'>
        <span style={{ display: 'flex', flex: 1 }}>
          <i
            className='icon'
            style={{
              backgroundColor: props.panelItemData.bgColor,
              backgroundPosition: props.panelItemData.bgPosition,
            }}
          />
          <span className='sub-title'>{props.panelItemData.name}</span>
        </span>
        <div className='tool'>
          {props.panelItemData.needMore === '1' ? (
            <i
              className={`arrow ${isUp ? 'up' : 'down'}`}
              onClick={setPanel}></i>
          ) : (
            ''
          )}
        </div>
      </div>
      <ul className='keyword-content'>
        {(props.panelItemData.data || []).map((item, index) => {
          let dom: any = []
          if (props.panelItemData.needMore !== '2') {
            //没有更多按钮的话多出指定行数的项都被隐藏
            if (index < props.celsCount * rows) {
              dom = (
                <li
                  key={index}
                  className='keyword-content-item'
                  onClick={() => {
                    setKeyWordCondition(item)
                  }}>
                  {item}
                </li>
              )
            } else {
              dom = (
                <li
                  key={index}
                  style={{ display: `${showItem ? 'block' : 'none'}` }}
                  onClick={() => {
                    setKeyWordCondition(item)
                  }}
                  className='keyword-content-item'>
                  {item}
                </li>
              )
            }
          } else {
            //有更多按钮的话点击跳转到更多的界面
            dom = (
              <li
                key={index}
                className='keyword-content-item'
                onClick={() => {
                  setKeyWordCondition(item)
                }}>
                {item}
              </li>
            )
          }

          return dom
        })}
        {(() => {
          let dom: any = []
          if (props.panelItemData.needMore !== '2') {
            return
          }
          for (let i = 0; i < props.celsCount; i++) {
            if (i === props.celsCount - 1) {
              dom.push(
                <li key={i} className='keyword-content-item more'>
                  更多...
                </li>
              )
            } else {
              dom.push(<li key={i} className='keyword-content-item'></li>)
            }
          }
          return dom
        })()}
      </ul>
    </div>
  )
}
const PanelItem = React.forwardRef((props: any, ref: any) => {
  return <PanelItemDom {...props} myRef={ref}></PanelItemDom>
})

export default connect(
  (state: any) => ({
    condition: state.keyWordConditionReducer,
    keyWord: state.keyWordPanelReducer,
  }),
  { keyWordConditionOption, keyWordPanelOption }
)(PanelItem)
