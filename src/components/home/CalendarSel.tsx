import React, { useEffect, useImperativeHandle } from "react";
import { f7 } from "framework7-react";
import { Dom7 } from "framework7";
// import pubSub from "pubsub-js";
import { Calendar } from "framework7/components/calendar/calendar";
let selDateArr: string[] = [];
let calendarInline: Calendar.Calendar;
function CalendarSel(props: any) {
  const { calendarRef } = props;

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
    calendarInline = f7.calendar.create({
      containerEl: "#calendar-inline-container",
      weekHeader: false,
      rangePicker: true,
      disabled: {
        to: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
      value: [new Date(), new Date(new Date().getTime() + 24 * 60 * 60 * 4000)],
      // rangesClasses:['calendar-day-number'],
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

          dayEl.classList.add("calendar-day-selected-range");
        },
        opened: function (calendar) {
          console.log(calendar);
          var selectedDays = calendar.$el.find(
            ".calendar-day-selected:not(.calendar-day-prev):not(.calendar-day-next)"
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
    initCalendarActive: () => {
      document.querySelectorAll(".active").forEach((item) => {
        item.classList.remove("active");
      });
      document.querySelectorAll(".calendar-day-selected").forEach((item) => {
        item.classList.remove("calendar-day-selected");
      });
    },
    openCalendar: () => {
      // calendarInline.open();
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
