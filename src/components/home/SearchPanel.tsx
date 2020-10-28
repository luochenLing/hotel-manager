import React from 'react'
import 'css/home/search-panel.scss'
import { Tabs, Tab, Toolbar, Link } from 'framework7-react'
import Calendar from 'components/common/Calendar'
import KeyWord from 'components/home/keyWord/Index'
import { getWeek, getDayByNum } from 'utils/common'
import { connect } from 'react-redux'
import { setShowKeyWord } from 'redux/action'

const SearchForm = React.lazy(() => import('components/home/SearcForm'))

type stateType = {
  showCalendar: boolean
  calendarInline: any
  startDay: string
  endDay: string
  dayDiff: number
  yesterday: string
  fromWeek: string
  toWeek: string
}
type propsType = {
  setShowKeyWord: Function
  keyWord: boolean
}
const calendarRef = React.createRef<any>()
class SearchPanel extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props)
    this.state = {
      showCalendar: false,
      calendarInline: '',
      startDay: '',
      endDay: '',
      dayDiff: 0,
      yesterday: '',
      fromWeek: '',
      toWeek: '',
    }
  }
  componentDidMount() {
    this.initCalendarDate()
    this.initKeyWordPanel()
  }

  /**
   * 初始化关键字面板
   */
  initKeyWordPanel() {
    this.props.setShowKeyWord(false)
  }

  /**
   * 模拟接口初始化数据
   */
  initCalendarDate = () => {
    let calendarInfo = {
      startDay: new Date().Format('yyyy-MM-dd'),
      endDay: getDayByNum(new Date(), 7).Format('yyyy-MM-dd'),
      dayDiff: 1,
      fromWeek: '',
      toWeek: '',
    }
    calendarInfo.fromWeek = getWeek(calendarInfo.startDay)
    calendarInfo.toWeek = getWeek(calendarInfo.endDay)
    calendarInfo.dayDiff = this.getDayDiff(calendarInfo)
    this.setState(calendarInfo, () => {
      //setstate的异步原因，所以要初始化state以后再去根据新的state做操作
      this.getYesterday()
    })
  }

  /**
   * 获取昨天
   */
  getYesterday = () => {
    let day = new Date(this.state.startDay)
    let yesterday = getDayByNum(day, -1)
    this.setState({ yesterday: yesterday.Format('yyyy-M-d') })
  }

  /**
   * 打开日历
   * @param showCalendar
   */
  getCalendar = (showCalendar: boolean) => {
    this.setState({ showCalendar })
  }

  /**
   * 打开关键词面板
   * @param showKeyWork
   */
  openKeyWord = () => {
    this.props.setShowKeyWord(true)
  }

  /**
   * 获取日期间隔
   * @param dateArr
   */
  getDayDiff = (dateArr: {
    startDay: string
    endDay: string
    fromWeek?: string
    toWeek?: string
  }) => {
    let sDay = new Date(dateArr.startDay)
    let eDay = new Date(dateArr.endDay)
    return Math.ceil(Math.abs(sDay.getTime() - eDay.getTime()) / 1000 / 60 / 60 / 24); 
  }

  /**
   * 关闭日历，关闭时获取选中值
   */
  closeCalendar = () => {
    this.setState({ showCalendar: false }, () => {
      let dateArr = calendarRef.current.getSelDateArr()
      let dayDiff = this.getDayDiff({startDay:dateArr.startDay,endDay:dateArr.endDay});
      this.setState({
        startDay: dateArr.startDay,
        endDay: dateArr.endDay,
        fromWeek: dateArr.fromWeek,
        toWeek: dateArr.toWeek,
        dayDiff,
      })
    })
  }

  render() {
    const {
      startDay,
      endDay,
      yesterday,
      showCalendar,
      fromWeek,
      toWeek,
    } = this.state
    return (
      <>
        <div className='search-panel'>
          <Toolbar tabbar bottom>
            <Link tabLink='#tab-1' tabLinkActive>
              国内
            </Link>
            <Link tabLink='#tab-2'>国外</Link>
            <Link tabLink='#tab-3'>钟点房</Link>
          </Toolbar>
          <Tabs animated>
            <Tab id='tab-1' className='page-content' tabActive>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                }}>
                <SearchForm
                  startDay={startDay}
                  endDay={endDay}
                  fromWeek={fromWeek}
                  toWeek={toWeek}
                  getCalendar={this.getCalendar}
                  openKeyWord={this.openKeyWord}
                  dayDiff={this.state.dayDiff}
                />
              </div>
            </Tab>
            <Tab id='tab-2' className='page-content'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                }}>
                <SearchForm
                  startDay={startDay}
                  endDay={endDay}
                  fromWeek={fromWeek}
                  toWeek={toWeek}
                  getCalendar={this.getCalendar}
                  openKeyWord={this.openKeyWord}
                  dayDiff={this.state.dayDiff}
                />
              </div>
            </Tab>
            <Tab id='tab-3' className='page-content'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                }}>
                <SearchForm
                  startDay={startDay}
                  endDay={endDay}
                  fromWeek={fromWeek}
                  toWeek={toWeek}
                  getCalendar={this.getCalendar}
                  openKeyWord={this.openKeyWord}
                  dayDiff={this.state.dayDiff}
                />
              </div>
            </Tab>
          </Tabs>
        </div>
        <Calendar
          ref={calendarRef}
          showCalendar={showCalendar}
          curDay={new Date()}
          selDay={{ from: new Date(startDay), to: new Date(endDay) }}
          disableDay={{ to: new Date(yesterday) }}
          //如果方法带了括号就会立即执行，会导致state更新出现死循环
          closeCalendar={this.closeCalendar}
        />
        {/* 这里不再用state去控制开关，在redux中的话，使用props的属性去读取state状态，
        这是因为使用了reactredux所以让状态的读取通过外面的（app.js）Provider的store就可以达到读取属性的效果 */}
        <KeyWord showKeyWord={this.props.keyWord} />
      </>
    )
  }
}
//state这里放的是reducer里面指定方法的state，比如reducer的keyWorkOption方法的state这里就可以取到
//第二个参数是需要用到的action的方法，这些方法在这里注册以后可以用props的方式调用
export default connect((state: any) => ({ keyWord: state.keyWorkOption }), {
  setShowKeyWord,
})(SearchPanel)
