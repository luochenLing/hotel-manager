import React, { useState, useEffect, Fragment } from "react";
import "css/common/calendar.scss";
type propsTypes = {};
export default function Calendar(props: propsTypes) {
  const selDomArr: HTMLElement[] = []; //选中的dom
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
        selDomArr.push(selDom);
        selDom.classList.add("range");
        let count = 0;
        document.querySelectorAll(".cal-body-grid").forEach((ulItem: any) => {
          let liArr = ulItem.childNodes;
          let idx = -1;
          if (count === 1) {
            //中间的全部染色
            idx = 0;
          } else if (count <= 2 && count !== 1) {
            idx = Array.from(liArr).findIndex((liItem: any) =>
              liItem.classList.contains("range")
            );
            if (idx >= 0) {
              count++;
              //找到了开始li的位置才操作，没找到就不操作,找到第二个count的时候视为结束
              for (let i = idx; i <= liArr; i++) {
                liArr[i].classList.add("selected");
              }
            }
          }
        });
        // let dom = document.querySelector(".range")?.nextSibling as any;
        // while (true) {
        //   // debugger
        //   if (dom==null||dom.classList.contains("range")) {
        //     break;
        //   } else {
        //     dom.classList.add("selected");
        //     dom = dom.nextSibling;
        //   }
        // }
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
                      <li onClick={selDomHandle} key={dayIdx}>
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
