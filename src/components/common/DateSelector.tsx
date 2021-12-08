import React, { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getDayByNum } from "utils/common";
import Calendar from "./Calendar";
import styles from "css/common/date-selector.module.scss";
interface propsTypes {
  /**
   * 开始时间
   */
  startDate: string;
  /**
   * 结束时间
   */
  endDate: string;

  /**
   * 更新开始和结束时间
   */
  updateTime: Function;
}
//默认值
DataSelectorDom.defaultProps = {
  startDate: new Date().Format("yyyy-MM-dd"),
  endDate: getDayByNum(new Date(), 7).Format("yyyy-MM-dd"),
  updateTime: () => {},
};
function DataSelectorDom(props: propsTypes) {
  /**
   * 获取日期间隔
   * @param dateArr
   */
  const getDayDiff = (dateArr: { startDay: string; endDay: string }) => {
    // debugger
    let sDay = new Date(dateArr.startDay);
    let eDay = new Date(dateArr.endDay);
    return Math.ceil(
      Math.abs(sDay.getTime() - eDay.getTime()) / 1000 / 60 / 60 / 24
    );
  };

  const $refs = useRef({
    yesterday: "",
    fromWeek: "",
    toWeek: "",
    dayDiff: getDayDiff({
      startDay: props.startDate,
      endDay: props.endDate,
    }),
  });
  // : false,
  const [state, setState] = useState({
    showCalendar: false,
  }); //从周几到周几

  const startDayDom = useRef<HTMLSpanElement>(null);
  const endDayDom = useRef<HTMLSpanElement>(null);
  const calendarRef = useRef(null);

  useCallback(() => {
    getYesterday();
    //eslint-disable-next-line
  }, []);

  /**
   * 打开日历
   * @param showCalendar
   */
  const getCalendar = (showCalendar: boolean) => {
    setState({ ...state, showCalendar });
  };

  /**
   * 关闭日历，关闭时获取选中值
   */
  const closeCalendar = () => {
    let dateArr = (calendarRef?.current as any)?.getSelDateArr();
    //时间默认一开始是调用方传入，选中日期后回传更新调用方的data数据
    props.updateTime({
      startDay: dateArr.startDay,
      endDay: dateArr.endDay,
    });

    let dayDiff = getDayDiff({
      //这里props的属性还没有默认值
      startDay: dateArr?.startDay || DataSelectorDom.defaultProps.startDate,
      endDay: dateArr?.endDay || DataSelectorDom.defaultProps.endDate,
    });

    //初始化的时候是空值，空值不需要更新状态导致界面渲染
    if (dateArr?.fromWeek && dateArr?.toWeek) {
      $refs.current = {
        ...$refs.current,
        fromWeek: dateArr?.fromWeek,
        toWeek: dateArr?.toWeek,
      };
    }

    if (dayDiff) {
      $refs.current = {
        ...$refs.current,
        dayDiff,
      };
    }
    setState({ ...state, showCalendar: false });
  };

  /**
   * 获取昨天
   */
  const getYesterday = () => {
    let day = new Date(startDate);
    let yesterday = getDayByNum(day, -1);
    $refs.current = {
      ...$refs.current,
      yesterday: yesterday.Format("yyyy-M-d")
    };
  };

  /**
   * 获取日历组件挂载到root下面
   * @returns 返回一个挂载到root下面的日历组件
   */
  const getCalendarComp = () => {
    const root = document.getElementById("root") as Element;
    return createPortal(
      <Calendar
        ref={calendarRef}
        showCalendar={state.showCalendar}
        curDay={new Date()}
        selDay={{ from: new Date(startDate), to: new Date(endDate) }}
        disableDay={{ to: new Date($refs.current.yesterday) }}
        //如果方法带了括号就会立即执行，会导致state更新出现死循环
        closeCalendar={closeCalendar}
      />,
      root
    );
  };
  const { startDate, endDate } = props;
  console.log(222);
  return (
    <>
      <div
        className={styles["date-condition"]}
        onClick={() => {
          getCalendar(true);
        }}
      >
        <div>
          <h4>入住</h4>
          <span ref={startDayDom} data-seldate={startDate}>
            {`${startDate.split("-")[1]}月${startDate.split("-")[2]}日`}
          </span>
          <i>{$refs.current.fromWeek}</i>
        </div>
        <h4 className={styles["date-count"]}>{$refs.current.dayDiff}晚</h4>
        <div>
          <h4>离店</h4>
          <span ref={endDayDom} data-seldate={endDate}>
            {`${endDate.split("-")[1]}月${endDate.split("-")[2]}日`}
          </span>
          <i>{$refs.current.toWeek}</i>
        </div>
      </div>
      {getCalendarComp()}
    </>
  );
}
const DataSelector = React.forwardRef((props: any, ref: any) => {
  return <DataSelectorDom {...props} myRef={ref}></DataSelectorDom>;
});
export default React.memo(DataSelector, areEqual);

function areEqual(prevProps: any, nextProps: any): any {
  console.log(
    prevProps.startDate,
    nextProps.startDate,
    prevProps.endDate,
    nextProps.endDate
  );
  if (
    prevProps.startDate === nextProps.startDate &&
    prevProps.endDate === nextProps.endDate
  ) {
    return true;
  }
  return false;
}
