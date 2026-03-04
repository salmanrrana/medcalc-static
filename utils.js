/**
 * Calculate the day difference between two dates, returning null if either is invalid.
 * @param {Date} startDate - The start date
 * @param {Date} targetDate - The target date
 * @param {number} offset - Added to the raw difference (0 for day-0 counting, 1 for day-1 counting)
 * @returns {number|null} The difference in days or null if dates are invalid
 */
function daysSince(startDate, targetDate, offset) {
  if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
    return null;
  }
  if (!(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
    return null;
  }

  const diffTime = targetDate - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + offset;
}

/**
 * Calculate the number of days since a transplant date.
 * Day 0 = transplant day, Day 1 = next day, etc.
 * @param {Date} transplantDate - The date of the transplant procedure
 * @param {Date} targetDate - The target date to calculate from (defaults to today)
 * @returns {number|null} The number of days since transplant, or null if dates are invalid
 */
function transplantDaysSince(transplantDate, targetDate = new Date()) {
  return daysSince(transplantDate, targetDate, 0);
}

/**
 * Calculate the current chemotherapy day.
 * Day 1 = first chemo, Day 2 = second chemo, etc.
 * @param {Date} firstChemoDate - The date of the first chemotherapy treatment
 * @param {Date} targetDate - The target date to calculate from (defaults to today)
 * @returns {number|null} The current chemo day number, or null if dates are invalid
 */
function chemoDaysSince(firstChemoDate, targetDate = new Date()) {
  return daysSince(firstChemoDate, targetDate, 1);
}

/**
 * Format a Date object to YYYY-MM-DD string format
 * @param {Date} date - The date to format
 * @returns {string} The formatted date string
 */
function formatDateForInput(date) {
  if (!(date instanceof Date)) {
    throw new TypeError('formatDateForInput expects a Date object');
  }
  if (isNaN(date.getTime())) {
    throw new Error('formatDateForInput expects a valid Date');
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse a date string in YYYY-MM-DD format
 * @param {string} dateString - The date string to parse
 * @returns {Date|null} The parsed date or null if invalid
 */
function parseDate(dateString) {
  if (!dateString) return null;
  try {
    const date = new Date(dateString + 'T00:00:00Z');
    if (isNaN(date.getTime())) {
      return null;
    }
    return date;
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
}

/**
 * Add days to a date
 * @param {Date} date - The starting date
 * @param {number} days - Number of days to add
 * @returns {Date} New date with days added
 */
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Validate a URL
 * @param {string} urlString - The URL to validate
 * @returns {boolean} True if valid http/https URL
 */
function isValidUrl(urlString) {
  try {
    const url = new URL(urlString);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch (error) {
    return false;
  }
}
