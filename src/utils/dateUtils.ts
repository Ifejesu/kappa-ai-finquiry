
/**
 * Format a date as a relative time string (e.g. "2 hours ago", "in 3 days")
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
  const isFuture = diffInSeconds > 0;
  const absDiff = Math.abs(diffInSeconds);
  
  // Time units in seconds
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;
  
  let value: number;
  let unit: string;
  
  if (absDiff < minute) {
    value = absDiff;
    unit = 'second';
  } else if (absDiff < hour) {
    value = Math.floor(absDiff / minute);
    unit = 'minute';
  } else if (absDiff < day) {
    value = Math.floor(absDiff / hour);
    unit = 'hour';
  } else if (absDiff < week) {
    value = Math.floor(absDiff / day);
    unit = 'day';
  } else if (absDiff < month) {
    value = Math.floor(absDiff / week);
    unit = 'week';
  } else if (absDiff < year) {
    value = Math.floor(absDiff / month);
    unit = 'month';
  } else {
    value = Math.floor(absDiff / year);
    unit = 'year';
  }
  
  // Add plural 's' if value is not 1
  if (value !== 1) {
    unit += 's';
  }
  
  return isFuture ? `in ${value} ${unit}` : `${value} ${unit} ago`;
};

/**
 * Format a date as a string (e.g. "Jan 1, 2021")
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Format a date as a time string (e.g. "12:34 PM")
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};
