import React from 'react'
import 'css/home/search-form.scss'
import {
  Range,
  F7Button,
  Icon,
  Page,
  Popup,
  Block,
  Button,
} from 'framework7-react'
import { connect } from 'react-redux'
import { keyWordConditionOption } from 'redux/action'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
interface stateType {
  popupOpened: boolean
  maxRange: number
  minRange: number
  curPrice: number
  startList: { name: string; checked: boolean; code: string }[]
  selStartList: string[]
}
interface propsType {
  getCalendar: Function
  openKeyWord: Function
  startDay: string
  endDay: string
  fromWeek: string
  toWeek: string
  dayDiff: number
  condition: string
}
interface RouterProps extends RouteComponentProps {
  // custom properties passed to component
}
type mapPropsType = RouterProps & propsType
class SearcForm extends React.Component<mapPropsType, stateType> {
  constructor(props: any) {
    super(props)
    this.state = {
      popupOpened: false,
      maxRange: 900,
      minRange: 0,
      curPrice: 0,
      startList: [
        { name: '二星(钻)及以下经济', checked: false, code: 'two' },
        { name: '三星(钻)舒适', checked: false, code: 'three' },
        { name: '四星(钻)高档', checked: false, code: 'four' },
        { name: '五星(钻)豪华', checked: false, code: 'five' },
      ],
      selStartList: [],
    }
  }
  startDayDom = React.createRef<HTMLElement>()
  endDayDom = React.createRef<HTMLElement>()
  /**
   * 打开价格筛选框
   */
  openPanel = () => {
    this.setState({ popupOpened: true })
  }

  /**
   * 选中星级
   */
  checkStart(code: string) {
    const curList = [...this.state.startList]
    let item = curList.find((x) => x.code === code)
    if (item) {
      item.checked = !item.checked
      this.setState({ startList: curList })
    }
  }

  /**
   * 选择价格区间
   */
  getPriceRange = (e: any) => {
    this.setState({ curPrice: e })
  }

  /**
   * 条件筛选
   */
  searchList = () => {
    //处理星级酒店多选
    this.state.startList.filter((x) => x.checked)
    this.setState({
      selStartList: this.state.startList
        .filter((x) => x.checked)
        .map((item) => item.name),
      popupOpened: false,
    })
  }

  /**
   * 查询条件界面按钮事件
   */
  search = () => {
    this.props.history.push('/hotel')
  }
  /**
   * 重置条件
   */
  resetCondition = () => {
    this.setState({ curPrice: 0 })
    const curList = this.state.startList.map((item) => {
      return {
        ...item,
        checked: false,
      }
    })
    this.setState({ startList: curList })
  }

  /**
   * 开启关键词页面
   */
  openKeyWord = () => {
    this.props.openKeyWord(true)
  }

  render() {
    const { startDay, endDay } = this.props
    return (
      <>
        <ul className='search-form'>
          <li>
            <h4>杭州</h4>
            <div className='cur-position'>
              <Icon size='13' f7='scope' bgColor='#23cc77;'></Icon>
              <span>当前位置</span>
            </div>
          </li>
          <li
            onClick={() => {
              this.props.getCalendar(
                true,
                this.startDayDom.current?.getAttribute('data-seldate'),
                this.endDayDom.current?.getAttribute('data-seldate')
              )
            }}
            className='date-condition'>
            <div>
              <h4>入住</h4>
              <span ref={this.startDayDom} data-seldate={startDay}>
                {`${startDay.split('-')[1]}月${startDay.split('-')[2]}日`}
              </span>
              <i>{this.props.fromWeek}</i>
            </div>
            <h4 className='date-count'>{this.props.dayDiff}晚</h4>
            <div>
              <h4>离店</h4>
              <span ref={this.endDayDom} data-seldate={endDay}>
                {`${endDay.split('-')[1]}月${endDay.split('-')[2]}日`}
              </span>
              <i>{this.props.toWeek}</i>
            </div>
          </li>
          <li className='search-key' onClick={this.openKeyWord}>
            <span>
              {this.props.condition
                ? this.props.condition
                : '关键字/位置/品牌/酒店名'}
            </span>
          </li>
          <li className='search-price' onClick={this.openPanel}>
            <span>
              {(() => {
                if (this.state.curPrice && this.state.selStartList.length > 0) {
                  return `${
                    this.state.curPrice
                  }以上/${this.state.selStartList.join('、')}`
                } else if (this.state.curPrice) {
                  return `${this.state.curPrice}以上`
                } else if (this.state.selStartList.length > 0) {
                  return `${this.state.selStartList}`
                } else {
                  return '价格/星级'
                }
              })()}
            </span>
          </li>
          <li>
            <F7Button
              fill
              large
              round
              style={{ width: '100%' }}
              onClick={this.search}>
              查询
            </F7Button>
          </li>
        </ul>
        <Popup
          className='condition-pop'
          opened={this.state.popupOpened}
          onPopupClosed={() => this.setState({ popupOpened: false })}>
          <Page>
            <Block>
              <ul className='price'>
                <li className='price-title'>
                  <span style={{ marginRight: '.5rem' }}>价格</span>
                  {this.state.curPrice ? (
                    <span className='num'>￥{this.state.curPrice}以上</span>
                  ) : (
                    ''
                  )}
                </li>
                <li className='price-slider'>
                  <Range
                    value={this.state.curPrice}
                    min={this.state.minRange}
                    max={this.state.maxRange}
                    label={true}
                    step={5}
                    className='price-slider-bar'
                    onRangeChange={this.getPriceRange}>
                    <span className='min-prince'>￥{this.state.minRange}</span>
                    <span className='max-prince'>
                      ￥{this.state.maxRange}以上
                    </span>
                  </Range>
                  <div className='range-knob end-knob'></div>
                </li>
              </ul>
              <ul className='star-rating'>
                <li className='star-rating-title'>
                  <h3>星级</h3>
                  <span>(可多选)</span>
                </li>
                <li className='star-rating-content'>
                  <ul className='start-list'>
                    {this.state.startList.map((item) => {
                      return (
                        <li
                          className={`start-list-item ${
                            item.checked ? 'active' : ''
                          }`}
                          onClick={() => {
                            this.checkStart(item.code)
                          }}
                          key={item.code}>
                          {item.name}
                        </li>
                      )
                    })}
                  </ul>
                </li>
              </ul>
              <div className='btn-tools'>
                <Button
                  className='btn-reset'
                  outline
                  onClick={this.resetCondition}>
                  重置
                </Button>
                <Button className='btn-ok' fill onClick={this.searchList}>
                  完成
                </Button>
              </div>
            </Block>
          </Page>
        </Popup>
      </>
    )
  }
}
export default connect(
  (state: any) => ({ condition: state.keyWordConditionReducer }),
  {
    keyWordConditionOption,
  }
)(withRouter(SearcForm))
