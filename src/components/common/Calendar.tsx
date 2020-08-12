import React, { useState, useEffect, Fragment } from "react";
import {getWeek} from 'utils/common'
import "css/common/calendar.scss";
interface propsTypes {
  //当前日期
  curDay?: Date;
  //不可选日期(从x天到X天)
  disableDay?: {
    from?: Date;
    to?: Date;
  };
  //选中日期
  selDay?: {
    from: Date;
    to: Date;
  };
  //是否显示日历
  showCalendar: boolean;
  //关闭日历
  closeCalendar: Function;
  //获取选中时间段
  getSelDateArr?: Function;
}
export default function Calendar(props: propsTypes) {
  let from = props.selDay?.from.Format("yyyy-M-d");
  let to = props.selDay?.to.Format("yyyy-M-d");
  let fromWeek = "",
    toWeek = "";
  //初始时间段
  const [startDay, setStartDay] = useState<string | null>(from);
  const [endDay, setEndDay] = useState<string | null>(to);

  //是否显示日历界面
  const [show, setShow] = useState(props.showCalendar);
  useEffect(() => {
    setShow(props.showCalendar);
    if (props.showCalendar === false && props.getSelDateArr) {
      props.getSelDateArr!({ startDay, endDay,fromWeek,toWeek });
    }

    //去掉依赖提示，因为这里只是依赖于是否显示日历，不显示的时候就会输出一个开始和结束的日期到调用层
    // eslint-disable-next-line
  }, [props.showCalendar]);

  //#region 获取所有需要显示的月份
  const [dateMonthArr, setDateMonthArr] = useState<string[]>([]); //日历上一年的所有月份
  /**
   * 获取包括当前日期后面的十二个月
   */
  useEffect(() => {
    const now = new Date();
    let dateArr = [];
    //循环遍历
    for (let i = 0; i < 12; i++) {
      let curMonth = now.getMonth() + 1;
      let curFullYears = now.getFullYear();
      now.setMonth(curMonth, 1);
      let dateItem = `${curFullYears}-${curMonth}`;
      dateArr.push(dateItem);
    }
    setDateMonthArr(dateArr);
  }, []);
  //#endregion

  //#region 日历高度设置
  const [pageHeight, setPageHeight] = useState(0); //页面的高度
  let dom = document.documentElement || document.body;
  /**
   * 设置日历部分的高度
   */
  useEffect(() => {
    setPageHeight(dom.clientHeight - 72);
  }, [dom.clientHeight]);

  //#endregion

  //#region 初始日历
  const [curDay, setCurDay] = useState("");
  /**
   * 获取当天
   */
  useEffect(() => {
    //如果选中了时间段的话当前时间这个属性失效
    if (props.selDay) {
      return;
    }
    if (props.curDay) {
      setCurDay(props.curDay.Format("yyyy-M-d"));
    }
  }, [props.curDay, props.selDay]);

  //#endregion

  /**
   * 选择日期
   * @param e 当前的dom方法
   */
  const selDomHandle = (e: any) => {
    if (e.currentTarget.classList.contains("disable-day")) {
      //禁止的日期范围不能选中
      return;
    }
    //不能重复选择某天
    let rangeArr = document.querySelectorAll(".range");
    if (rangeArr.length >= 0) {
      if (
        rangeArr[0].getAttribute("data-day") ===
        e.currentTarget.getAttribute("data-day")
      ) {
        return;
      }
    }
    const selDomCount = rangeArr.length;
    switchDomHandle(selDomCount, e.currentTarget);
  };

  /**
   * 点击DOM的时候做处理的辅助类
   * @param count 查看range样式的li有几个
   * @param selDom 当前选中的dom
   */
  const switchDomHandle = (count: number, selDom: HTMLElement) => {
    let rangeDomArr = document.querySelectorAll(".range");
    switch (count) {
      case 0:
        //只有一个dom的时候，记录到选中数组并且着色
        selDom.classList.add("range");
        setStartDay(selDom.getAttribute("data-day"));
        fromWeek=selDom.getAttribute('data-week')!;
        break;
      case 1:
        //两个的时候记录dom，把之间的dom染色
        selDom.classList.add("range");
        let firstSelDay = new Date(
          rangeDomArr[0].getAttribute("data-day") as string
        ).getTime();
        let secondSelDay = new Date(
          selDom.getAttribute("data-day") as string
        ).getTime();
        //选中的两天里数值小的是第一天数值大的是第二天
        if (firstSelDay > secondSelDay) {
          clearAllDom(selDom);
          break;
        }
        setEndDay(selDom.getAttribute("data-day"));
        toWeek=selDom.getAttribute('data-week')!;
        let dayDomArr = document.querySelectorAll("li[data-day]");
        let idx = Array.from(dayDomArr).findIndex(
          (x) =>
            x.getAttribute("data-day") ===
            rangeDomArr[0].getAttribute("data-day")
        );
        for (let i = idx + 1; i < dayDomArr.length; i++) {
          //第一个
          if (dayDomArr[i].classList.contains("range")) {
            break;
          }
          dayDomArr[i].classList.add("selected");
        }
        props.closeCalendar();
        break;
      case 2:
        clearAllDom(selDom);
        break;
    }
  };

  /**
   * 清除之前选中的dom重新
   * @param selDom 选中的DOM
   */
  const clearAllDom = (selDom: HTMLElement) => {
    //三个的时候清除所有颜色样式和选中数组并且按照1操作
    document.querySelectorAll(".range").forEach((item) => {
      item.classList.remove("range");
    });
    document.querySelectorAll(".selected").forEach((item) => {
      item.classList.remove("selected");
    });
    setStartDay("");
    setEndDay("");
    setStartDay(selDom.getAttribute("data-day"));
    selDom.classList.add("range");
  };

  // 初始化区间开关
  let isEnd = false,
    isStart = false;

  /**
   * 根据传递过来的当天时间或者是时间段去设置样式
   * @param dayItem 渲染中的列表项
   */
  const setRange = (dayItem: string) => {
    if (props.selDay) {
      if (from === dayItem) {
        isStart = true;
        return "range";
      } else if (to === dayItem) {
        isEnd = true;
        return "range";
      } else {
        if (isStart) {
          if (isEnd) {
            return "";
          }
          return "selected";
        } else {
          return "";
        }
      }
    } else if (props.curDay) {
      if (curDay === dayItem) {
        return "range";
      } else {
        return "";
      }
    }
  };

  /**
   * 初始化设置日期的文字
   */
  const initDateText = (dayItem: string) => {
    if (dayItem === curDay) {
      return "今天";
    } else if (startDay === dayItem) {
      return "入住";
    } else if (endDay === dayItem) {
      return "离店";
    }
  };

  /**
   * 设置禁止日期范围
   */
  const setDisableRange = (dayItem: string) => {
    if (props.disableDay?.from && !props.disableDay?.to) {
      //从XX天开始以后的时间禁止
      let fromDate = props.disableDay?.from.getTime();
      let curDate = new Date(dayItem).getTime();
      if (fromDate <= curDate) {
        return true;
      }
    } else if (!props.disableDay?.from && props.disableDay?.to) {
      //从XX天以前的时间都禁止
      let toDate = props.disableDay?.to.getTime();
      let curDate = new Date(dayItem).getTime();
      if (toDate >= curDate) {
        return true;
      }
    } else if (props.disableDay?.from && props.disableDay?.to) {
      //XX天到XX天之内的时间禁止
      let fromDate = props.disableDay?.from.getTime();
      let toDate = props.disableDay?.to.getTime();
      let curDate = new Date(dayItem).getTime();
      if (toDate >= curDate && fromDate <= curDate) {
        return true;
      }
    }
    return false;
  };

  const closeCalendar = () => {
    props.closeCalendar();
  };

  return (
    <div className={`cal ${show ? "slide-in" : "slide-out"}`}>
      <div className="cal-header">
        <div className="bar">
          <span className="cancel" onClick={closeCalendar}>
            取消
          </span>
          <span className="title">选择日历</span>
        </div>
        <ul className="week">
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
          <li>日</li>
        </ul>
      </div>
      <div style={{ height: pageHeight, paddingTop: 72 }}>
        <section className="cal-body">
          {dateMonthArr.map((item, idx) => {
            let curYear = parseInt(item.split("-")[0]);
            let curMonth = parseInt(item.split("-")[1]);
            let dayCount = new Date(curYear, curMonth, 0).getDate();
            let dayArr = [];
            let curWeek = new Date(curYear, curMonth - 1, 1).getDay() || 7; //周日的话会返回0此时用7替代
            dayCount += curWeek; //加上是周几的信息
            let isFirstDay = false;
            for (let i = 1; i < dayCount; i++) {
              if (curWeek !== i && !isFirstDay) {
                dayArr.push(-1);
              } else {
                isFirstDay = true;
                dayArr.push(i - curWeek + 1);
              }
            }
            return (
              <Fragment key={idx}>
                <h4 className="cal-body-month">{`${item.replace(
                  "-",
                  "年"
                )}月`}</h4>
                <ul className="cal-body-grid">
                  {dayArr.map((dayItem, dayIdx) => {
                    if (dayItem === -1) {
                      return <li key={dayIdx}></li>;
                    }
                    return (
                      <li
                        className={`${setRange(`${item}-${dayItem}`)} ${
                          setDisableRange(`${item}-${dayItem}`)
                            ? "disable-day"
                            : ""
                        }`}
                        data-day={`${item}-${dayItem}`}
                        data-week={getWeek(`${item}-${dayItem}`)}
                        onClick={selDomHandle}
                        key={dayIdx}
                      >
                        <span>{dayItem}</span>
                        <span>{initDateText(`${item}-${dayItem}`)}</span>
                      </li>
                    );
                  })}
                </ul>
              </Fragment>
            );
          })}
        </section>
      </div>
    </div>
  );
}
