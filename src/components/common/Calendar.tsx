import React, { useState, useEffect, Fragment } from "react";
import "css/common/calendar.scss";
type propsTypes = {
  curDay:string;//当前日期
  //不可选日期(从x天到X天)
  disableDay:{
    from:string,
    to:string
  },
   
};
export default function Calendar(props: propsTypes) {
  const selDomArr: HTMLElement[] = []; //选中的dom（开始结束两天）
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
  const [pageHeight, setPageHeight] = useState(0); //页面的高度
  let dom = document.documentElement || document.body;
  /**
   * 设置日历部分的高度
   */
  useEffect(() => {
    setPageHeight(dom.clientHeight - 72);
  }, [dom.clientHeight]);

  const selDomHandle = (e: any) => {
    if (selDomArr.findIndex((x) => x === e.currentTarget) >= 0) {
      return;
    }
    switchDomHandle(selDomArr.length, e.currentTarget);
  };

  //点击DOM的时候做处理的辅助类
  const switchDomHandle = (count: number, selDom: HTMLElement) => {
    switch (count) {
      case 0:
        //只有一个dom的时候，记录到选中数组并且着色
        selDomArr.push(selDom);
        selDom.classList.add("range");
        break;
      case 1:
        //两个的时候记录dom，把之间的dom染色
        selDom.classList.add("range");
        let firstSelDay=new Date(selDomArr[0].getAttribute('data-day') as string).getTime();
        let secondSelDay=new Date(selDom.getAttribute('data-day') as string).getTime();
        //选中的两天里数值小的是第一天数值大的是第二天
        if(firstSelDay<=secondSelDay){
          selDomArr.push(selDom);
        }else{
          selDomArr.unshift(selDom);
        }
        let dayDomArr = document.querySelectorAll("li[data-day]");
        let idx= Array.from(dayDomArr).findIndex(x=>x.getAttribute('data-day')===selDomArr[0].getAttribute('data-day'));
        for(let i = idx+1;i<dayDomArr.length;i++){
          //第一个
          if(dayDomArr[i].getAttribute('data-day')===selDomArr[1].getAttribute('data-day')){
            break;
          }
          dayDomArr[i].classList.add('selected');
        }
        break;
      case 2:
        //三个的时候清除所有颜色样式和选中数组并且按照1操作
        document.querySelectorAll(".range").forEach((item) => {
          item.classList.remove("range");
        });
        document.querySelectorAll(".selected").forEach((item) => {
          item.classList.remove("selected");
        });
        selDomArr.splice(0);
        selDomArr.push(selDom);
        selDom.classList.add("range");
    }
  };
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
      <div style={{ height: pageHeight, paddingTop: 72 }}>
        <section className="cal-body">
          {dateMonthArr.map((item, idx) => {
            let curYear = parseInt(item.split("-")[0]);
            let curMonth = parseInt(item.split("-")[1]);
            let dayCount = new Date(curYear, curMonth, 0).getDate();
            let dayArr = [];
            for (let i = 1; i <= dayCount; i++) {
              dayArr.push(i);
            }
            return (
              <Fragment key={idx}>
                <h4 className="cal-body-month">{`${item.replace(
                  "-",
                  "年"
                )}月`}</h4>
                <ul className="cal-body-grid">
                  {dayArr.map((dayItem, dayIdx) => {
                    return (
                      <li data-day={`${item}-${dayItem}`} onClick={selDomHandle} key={dayIdx}>
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
