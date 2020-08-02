import React, { useEffect, useImperativeHandle, useState } from "react";
import { f7 } from "framework7-react";
import { Dom7 } from "framework7";
import pubSub from "pubsub-js";
import { Calendar } from "framework7/components/calendar/calendar";
let selDateArr: string[] = [];
let calendarInline: Calendar.Calendar;
function CalendarSel(props: any) {
  const { calendarRef, startDay, endDay } = props;
  useEffect(() => {
    selDateArr = []; //选择日期计数器，两个以后就关掉选择器，打开的时候初始化
  });
  const [initDomNum, setDomNum] = useState(0); //如果在useeffect里面第二个参数直接写中括号的话总是报警告，所以这里用一个state控制渲染次数，我这里只想渲染一次
  useEffect(() => {
    initCalendar();
  });
  const initCalendar = () => {
    if (initDomNum === 0) {
      setDomNum(1);
    } else {
      return;
    }
    var $$ = Dom7;
    var monthNames = [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ];
    calendarInline = f7.calendar.create({
      containerEl: "#calendar-inline-container",
      weekHeader: false,
      rangePicker: true,
      disabled: {
        to: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), //昨天的数据
      },
      value: [new Date(startDay), new Date(endDay)],
      renderToolbar: () => {
        return (
          '<div class="toolbar calendar-custom-toolbar no-shadow">' +
          '<div class="toolbar-inner">' +
          '<div class="left">' +
          '<a href="#" class="link icon-only"><i class="icon icon-back ' +
          (f7.theme === "md" ? "color-black" : "") +
          '"></i></a>' +
          "</div>" +
          '<div class="center"></div>' +
          '<div class="right">' +
          '<a href="#" class="link icon-only"><i class="icon icon-forward ' +
          (f7.theme === "md" ? "color-black" : "") +
          '"></i></a>' +
          "</div>" +
          "</div>" +
          "</div>"
        );
      },

      on: {
        init: function (c) {
          $$(".calendar-custom-toolbar .center").text(
            monthNames[c.currentMonth] + ", " + c.currentYear
          );
          $$(".calendar-custom-toolbar .left .link").on("click", function () {
            calendarInline.prevMonth(500);
          });
          $$(".calendar-custom-toolbar .right .link").on("click", function () {
            calendarInline.nextMonth(500);
          });
        },
        monthYearChangeStart: function (c) {
          $$(".calendar-custom-toolbar .center").text(
            monthNames[c.currentMonth] + ", " + c.currentYear
          );
        },
        dayClick: function (calendar, dayEl, year, month, day) {
          var previousSelectedDays: any = calendar.$el.find(
            ".calendar-day-selected-range"
          );

          if (previousSelectedDays.length > 1) {
            previousSelectedDays.forEach(function (el: any) {
              el.classList.remove("calendar-day-selected-range");
            });
          }
          let selDate = `${year}-${month}-${day}`;
          selDateArr.push(selDate);
          if (selDateArr.length >= 2) {
            pubSub.publish("closeCalendarPanel", false);
            pubSub.publish("setDate", selDateArr);
          }
          dayEl.classList.add("calendar-day-selected-range");
        },
        opened: function (calendar) {
          //上个月的，禁止选择的数据都不在查找开始结束日期的范围内
          var selectedDays = calendar.$el.find(
            ".calendar-day-selected:not(.calendar-day-prev):not(.calendar-day-next):not(.calendar-day-disabled)"
          );
          if (selectedDays.length) {
            selectedDays[0].classList.add("calendar-day-selected-range");
            selectedDays[selectedDays.length - 1].classList.add(
              "calendar-day-selected-range"
            );
          }
        },
      },
    });
  };
  useImperativeHandle(calendarRef, () => ({
    //打开日历的时候根据时间初始化日历，并且清空选中日历的数组
    openCalendar: () => {
      selDateArr.splice(0);
    },
  }));
  return (
    <div className="block block-strong no-padding no-margin">
      <div id="calendar-inline-container"></div>
    </div>
  );
}
export default React.forwardRef((props, ref) => (
  <CalendarSel {...props} calendarRef={ref} />
));
