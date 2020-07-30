import React, { useEffect, useImperativeHandle } from "react";
import { f7 } from "framework7-react";
import { Dom7 } from "framework7";
let selDateArr: string[] = [];
const CalendarSel = (props: any, ref: any) => {
  // const [selDateArr, setSelDateArr] = useState([""]); //点击选中日期的时候存储的数组
  useEffect(() => {
    initCalendar();
  }, []);
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
          let selDate = `${year}-${month}-${day}`;
          // setSelDateArr([...selDateArr, selDate]);
          selDateArr.push(selDate);
          //点击两个以内加样式
          if (selDateArr.length <= 2) {
            dayEl.children[0].classList.remove("calendar-day-number");
            dayEl.children[0].classList.add("active");
          } else {
            // setSelDateArr([""]);
            // selDateArr.splice(0);
          }
          //两次以上的时候关闭界面
        },
      },
    });
  };
  useImperativeHandle(ref, () => ({
    test: () => {
      test()
    },
  }));
  const test = () => {
    console.log(11);
  };

  return (
    <div className="block block-strong no-padding no-margin">
      <div id="calendar-inline-container"></div>
    </div>
  );
};
export default React.forwardRef((props, ref) => (
  <CalendarSel props={props} ref={ref} />
));
