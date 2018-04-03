export const Weekdays = {
  Sunday: 'Sunday',
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday'
};

export const Months = {
  January: 'January',
  February: 'February',
  March: 'March',
  April: 'April',
  May: 'May',
  June: 'June',
  July: 'July',
  August: 'August',
  September: 'September',
  October: 'October',
  November: 'November',
  December: 'December'
};

export function getYearForRange({ start, end }) {
  if (start) {
    return start.getFullYear();
  }
  if (end) {
    return end.getFullYear();
  }
  return (new Date()).getFullYear();
};

export function getMonthForRange({ start, end }) {
  if (start) {
    return start.getMonth();
  }
  if (end) {
    return end.getMonth();
  }
  return (new Date()).getMonth();
};

export function abbreviationForWeekday(weekday) {
  return Weekdays[weekday].substring(0, 2);
};

const WEEK_LENGTH = 7;

export function getWeeksForMonth(month, year) {
  const firstOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstOfMonth.getDay();
  const weeks = [[]];

  let currentWeek = weeks[0];
  let currentDate = firstOfMonth;

  for (let i = 0; i < firstDayOfWeek; i++) {
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
};

export function dateIsInRange(day = null, range) {
  if (day == null) { return false; }

  const { start, end } = range;

  return Boolean((start && day > start) && (end && day < end));
};

export function dateIsSelected(day = null, range) {
  if (day == null) { return false; }
  const {start, end} = range;

  return Boolean((start && isSameDay(start, day)) || (end && isSameDay(end, day)));
};

export function isSameDay(day1, day2) {
  return (
    (day1.getDate() === day2.getDate()) &&
    (day1.getMonth() === day2.getMonth()) &&
    (day1.getFullYear() === day2.getFullYear())
  );
};

export function getNewRange(range = undefined, selected) {
  if (range == null) {
    return { start: selected, end: selected };
  }

  const { start, end } = range;

  if (end && start !== end) {
    return { start: selected, end: selected };
  }

  if (start) {
    if (selected < start) {
      return { start: selected, end: selected };
    }
    return { start, end: selected };
  }

  if (end) {
    if (selected < end) {
      return { start: selected, end };
    }
    return { start: (start || end), end: selected };
  }

  return { start: selected, end: selected };
};

export function getNextDisplayMonth(month) {
  let i = Months.indexOf(month);

  if (i === 11) {
    return 0;
  }
  return i + 1;
}

export function getNextDisplayYear(month, year) {
  let i = Months.indexOf(month);

  if (i === 11) {
    return year + 1;
  }
  return year;
}

export function getPreviousDisplayMonth(month) {
  let i = Months.indexOf(month);

  if (i === 0) {
    return 11;
  }
  return i - 1;
}

export function getPreviousDisplayYear(month, year) {
  let i = Months.indexOf(month);

  if (i === 0) {
    return year - 1;
  }
  return year;
}

export function isDateAfter(date, dateToCompare) {
  return date.getTime() > dateToCompare.getTime();
};

export function isDateBefore(date, dateToCompare) {
  return date.getTime() < dateToCompare.getTime();
};
