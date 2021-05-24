import React, { useEffect, useRef, useState } from "react";
import Calendar from "components/common/Calendar";
import { getDayByNum } from "utils/common";
import 'css/common/date-selector.scss'
interface propsTypes {
  /**
   * 开始时间
   */
  startDate: string;
  /**
   * 结束时间
   */
  endDate: string;
}
//默认值
DataSelectorDom.defaultProps = {
  startDate: new Date().Format("yyyy-MM-dd"),
  endDate: getDayByNum(new Date(), 7).Format("yyyy-MM-dd"),
};
function DataSelectorDom(props: propsTypes) {
  const [fromWeek, setFromWeek] = useState(""); //从周几
  const [toWeek, setToWeek] = useState(""); //到周几
  const [showCalendar, setShowCalendar] = useState(false); //显示日历组件
  const [yesterday,setYesterday] = useState(""); //到周几
  const startDayDom = useRef<HTMLSpanElement>(null);
  const endDayDom = useRef<HTMLSpanElement>(null);
  const calendarRef = useRef(null);

  useEffect(()=>{
    getYesterday()
    //eslint-disable-next-line
  },[])

  //关闭组件的时候更新值
  useEffect(() => {
    let dateArr = (calendarRef?.current as any).getSelDateArr();
    // let dayDiff = getDayDiff({
    //   startDay: dateArr.startDay,
    //   endDay: dateArr.endDay,
    // });
    setFromWeek(dateArr.fromWeek);
    setToWeek(dateArr.toWeek);
    // this.setState({
    //   startDay: dateArr.startDay,
    //   endDay: dateArr.endDay,
    //   fromWeek: dateArr.fromWeek,
    //   toWeek: dateArr.toWeek,
    //   dayDiff,
    // });
  }, [showCalendar]);

  /**
   * 打开日历
   * @param showCalendar
   */
  const getCalendar = (showCalendar: boolean) => {
    setShowCalendar(showCalendar)
    // this.setState({ showCalendar })
    // startDayDom.current?.getAttribute('data-seldate'),
    // endDayDom.current?.getAttribute('data-seldate')
  };

  /**
   * 关闭日历，关闭时获取选中值
   */
  const closeCalendar = () => {
    setShowCalendar(false);
    // this.setState({ showCalendar: false }, );
  };

  /**
   * 获取昨天
   */
  const getYesterday = () => {
    let day = new Date(startDate);
    let yesterday = getDayByNum(day, -1);
    setYesterday(yesterday.Format("yyyy-M-d"))
  };

  /**
   * 获取日期间隔
   * @param dateArr
   */
  const getDayDiff = (dateArr: { startDay: string; endDay: string }) => {
    let sDay = new Date(dateArr.startDay);
    let eDay = new Date(dateArr.endDay);

    return Math.ceil(
      Math.abs(sDay.getTime() - eDay.getTime()) / 1000 / 60 / 60 / 24
    );
  };

  const { startDate, endDate } = props;
  return (
    <>
      <div
       className="date-condition"
        onClick={() => {
          getCalendar(true);
        }}
      >
        <div>
          <h4>入住</h4>
          <span ref={startDayDom} data-seldate={startDate}>
            {`${startDate.split("-")[1]}月${startDate.split("-")[2]}日`}
          </span>
          <i>{fromWeek}</i>
        </div>
        <h4 className="date-count">
          {getDayDiff({ startDay: startDate, endDay: endDate })}晚
        </h4>
        <div>
          <h4>离店</h4>
          <span ref={endDayDom} data-seldate={endDate}>
            {`${endDate.split("-")[1]}月${endDate.split("-")[2]}日`}
          </span>
          <i>{toWeek}</i>
        </div>
      </div>
      <Calendar
        ref={calendarRef}
        showCalendar={showCalendar}
        curDay={new Date()}
        selDay={{ from: new Date(startDate), to: new Date(endDate) }}
        disableDay={{ to: new Date(yesterday) }}
        //如果方法带了括号就会立即执行，会导致state更新出现死循环
        closeCalendar={closeCalendar}
      />
    </>
  );
}
const DataSelector = React.forwardRef((props: any, ref: any) => {
  return <DataSelectorDom {...props} myRef={ref}></DataSelectorDom>;
});
export default DataSelector;
