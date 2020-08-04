import React, { useState, useEffect } from "react";
import 'css/common/calendar.scss'
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
  },[]);

  return (
    <div className="cal">
      {/* <div className="cal-header">
        <span>取消</span>
        <span>选择日历</span>
        <ul>
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ul>
      </div> */}
      <div className="cal-body">
        <div>
          {dateArr.map((item,idx) => {
            let curYear = parseInt(item.split("-")[0]);
            let curMonth = parseInt(item.split("-")[1]);
            let dayCount = new Date(curYear, curMonth, 0).getDate();
            let dayArr = [];
            for (let i = 1; i <= dayCount; i++) {
              dayArr.push(i);
            }
            return (
              <div key={idx}>
                <h5>{item}</h5>
                <ul>
                  {dayArr.map((dayItem,dayIdx) => {
                    return <li key={dayIdx}>{dayItem}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
