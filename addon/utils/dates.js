import { isNone, isPresent } from '@ember/utils';

export const weekdays = {
  Sunday: 'Sunday',
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
};

export const weekdaysArray = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const monthsArray = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getYearForRange({ start, end }) {
  if (isPresent(start)) {
    return start.getFullYear();
  }

  if (isPresent(end)) {
    return end.getFullYear();
  }

  return new Date().getFullYear();
}

export function getMonthForRange({ start, end }) {
  if (isPresent(start)) {
    return start.getMonth();
  }

  if (isPresent(end)) {
    return end.getMonth();
  }

  return new Date().getMonth();
}

export function abbreviationForWeekday(weekday) {
  return weekdays[weekday].substring(0, 2);
}

const WEEK_LENGTH = 7;

export function getWeeksForMonth(month, year, weekStartsOn) {
  const firstOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstOfMonth.getDay();
  const weeks = [[]];

  let currentWeek = weeks[0];
  let currentDate = firstOfMonth;

  const orderedWeekday = getWeekdaysOrdered(weekStartsOn);
  for (
    let i = 0;
    i < orderedWeekday.indexOf(weekdaysArray[firstDayOfWeek]);
    i++
  ) {
    currentWeek.push(null);
  }

  while (currentDate.getMonth() === month) {
    if (currentWeek.length === WEEK_LENGTH) {
      currentWeek = [];
      weeks.push(currentWeek);
    }

    currentWeek.push(currentDate);
    currentDate = new Date(year, month, currentDate.getDate() + 1);
  }

  while (currentWeek.length < 7) {
    currentWeek.push(null);
  }

  return weeks;
}

export function dateIsInRange(day, range) {
  if (isNone(day)) {
    return false;
  }

  const { start, end } = range;

  return isPresent(start) && day > start && isPresent(end) && day < end;
}

export function dateIsSelected(day, range) {
  if (isNone(day)) {
    return false;
  }

  const { start, end } = range;

  return (
    (isPresent(start) && isSameDay(start, day)) ||
    (isPresent(end) && isSameDay(end, day))
  );
}

export function isSameDay(day1, day2) {
  return (
    day1.getDate() === day2.getDate() &&
    day1.getMonth() === day2.getMonth() &&
    day1.getFullYear() === day2.getFullYear()
  );
}

export function getNewRange(range, selected) {
  if (isNone(range)) {
    return { start: selected, end: selected };
  }

  let { start, end } = range;

  if (isPresent(end) && start !== end) {
    return { start: selected, end: selected };
  }

  if (isPresent(start)) {
    if (selected < start) {
      return { start: selected, end: selected };
    }

    return { start, end: selected };
  }

  if (isPresent(end)) {
    if (selected < end) {
      return { start: selected, end };
    }

    return { start: start || end, end: selected };
  }

  return { start: selected, end: selected };
}

export function getNextDisplayMonth(month) {
  if (month === 11) {
    return 0;
  }

  return month + 1;
}

export function getNextDisplayYear(month, year) {
  if (month === 11) {
    return year + 1;
  }

  return year;
}

export function getPreviousDisplayMonth(month) {
  if (month === 0) {
    return 11;
  }

  return month - 1;
}

export function getPreviousDisplayYear(month, year) {
  if (month === 0) {
    return year - 1;
  }

  return year;
}

export function isDateAfter(date, dateToCompare) {
  return date.getTime() > dateToCompare.getTime();
}

export function isDateBefore(date, dateToCompare) {
  return date.getTime() < dateToCompare.getTime();
}

export function getWeekdaysOrdered(weekStartsOn) {
  const weekDays = [...weekdaysArray];
  const restOfDays = weekDays.splice(weekStartsOn);
  return [...restOfDays, ...weekDays];
}
