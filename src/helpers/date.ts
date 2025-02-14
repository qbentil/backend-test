"use strict";

import dayjs from "dayjs";

export function __getDateStart(_date: Date | string): Date {
  return new Date(new Date(_date).setHours(0, 0, 0, 0));
}

export function __getDateEnd(_date: Date | string): Date {
  return new Date(new Date(_date).setHours(23, 59, 59, 999));
}

export function __getNights(
  _startDate: Date | string,
  _endDate: Date | string,
): number {
  const start = new Date(_startDate); //clone
  const end = new Date(_endDate); //clone
  let nightsCount = 0;

  while (end > start) {
    if (dayjs(start).startOf("day").isSame(dayjs(end).startOf("day"))) {
      break;
    }
    nightsCount++;
    start.setDate(start.getDate() + 1);
  }

  return nightsCount;
}

export function __roundToHour(_date: Date | string): Date {
  const date = new Date(_date);
  date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
  date.setMinutes(0, 0, 0);

  return date;
}

export default {
  __getDateStart,
  __getDateEnd,
  __getNights,
  __roundToHour,
};
