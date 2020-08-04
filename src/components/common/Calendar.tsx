import React, { useState, useEffect, Fragment } from "react";
import "css/common/calendar.scss";
type propsTypes = {};
export default function Calendar(props: propsTypes) {
  const [dateArr, setDateArr] = useState<string[]>([]);
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
    setDateArr(dateArr);
  }, []);
  const [pageHeight,setPageHeight]=useState(0);
  let dom=document.documentElement||document.body;
  /**
   * 设置日历部分的高度
   */
  useEffect(()=>{
    setPageHeight(dom.clientHeight-72);
  },[dom.clientHeight])

  return (
    <div className="cal">
      <div className="cal-header">
        <div className="bar">
          <span className="cancel">取消</span>
          <span className="title">选择日历</span>
        </div>
        <ul className="week">
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ul>
      </div>
      <div style={{ height: pageHeight,paddingTop:72 }}>
        <section className="cal-body">
          {dateArr.map((item, idx) => {
            let curYear = parseInt(item.split("-")[0]);
            let curMonth = parseInt(item.split("-")[1]);
            let dayCount = new Date(curYear, curMonth, 0).getDate();
            let dayArr = [];
            for (let i = 1; i <= dayCount; i++) {
              dayArr.push(i);
            }
            return (
              <Fragment key={idx}>
                <h4 className="cal-body-month">{`${item.replace('-','年')}月`}</h4>
                <ul className="cal-body-grid">
                  {dayArr.map((dayItem, dayIdx) => {
                    return (
                      <li key={dayIdx}>
                        <span>{dayItem}</span>
                        <span></span>
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
