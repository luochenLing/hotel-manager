import React, { useEffect } from "react";
import { f7 } from "framework7-react";
import { Dom7 } from "framework7";
export default function CalendarSel() {
  const initCalendar = () => {
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
    var calendarInline = f7.calendar.create({
      containerEl: "#calendar-inline-container",
      weekHeader: false,
      rangePicker: true,
      disabled: {
        to: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
      value: [new Date(), new Date(new Date().getTime() + 24 * 60 * 60 * 4000)],
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
        dayClick: (
          calendar: any,
          dayEl: HTMLElement,
          year: number,
          month: number,
          day: number
        ) => {
          //点击两次以上的时候清空样式再加样式
          //点击两个以内加样式
          //两次以上的时候关闭界面
          console.log(dayEl);
        },
      },
    });
  };

  useEffect(() => {
    initCalendar();
  }, []);

  return (
    <div className="block block-strong no-padding no-margin">
      <div id="calendar-inline-container"></div>
    </div>
  );
}
