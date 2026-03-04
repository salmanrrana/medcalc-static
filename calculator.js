/**
 * Initialize a date calculator
 * @param {string} calculatorId - The ID of the calculator container
 * @param {Function} calculateFn - The calculation function (transplantDaysSince or chemoDaysSince)
 * @param {string} resultLabel - Label for the result
 */
function initializeCalculator(calculatorId, calculateFn, resultLabel) {
  const calculator = document.getElementById(calculatorId);
  if (!calculator) {
    console.warn(`Calculator with ID "${calculatorId}" not found`);
    return;
  }

  const startDateInput = calculator.querySelector('.start-date-input');
  const targetDateInput = calculator.querySelector('.target-date-input');
  const todayBtn = calculator.querySelector('.btn-today');
  const tomorrowBtn = calculator.querySelector('.btn-tomorrow');
  const errorMessage = calculator.querySelector('.error-message');
  const resultBox = calculator.querySelector('.result-box');
  const resultNumber = calculator.querySelector('.result-number');
  const resultUnit = calculator.querySelector('.result-unit');
  const placeholderBox = calculator.querySelector('.placeholder-box');

  // Set today's date as default for target date
  targetDateInput.value = formatDateForInput(new Date());

  // Recalculate on any date change
  const recalculate = () => {
    const startDateStr = startDateInput.value;
    const targetDateStr = targetDateInput.value;

    // Clear previous state
    errorMessage.classList.remove('show');
    resultBox.classList.remove('show');
    placeholderBox.classList.remove('show');

    if (!startDateStr) {
      placeholderBox.classList.add('show');
      return;
    }

    const startDate = parseDate(startDateStr);
    const targetDate = parseDate(targetDateStr);

    if (!startDate) {
      errorMessage.textContent =
        'Start date is invalid. Please use the date picker or enter a valid date in YYYY-MM-DD format.';
      errorMessage.classList.add('show');
      return;
    }

    if (!targetDate) {
      errorMessage.textContent =
        'Target date is invalid. Please use the date picker or enter a valid date in YYYY-MM-DD format.';
      errorMessage.classList.add('show');
      return;
    }

    const result = calculateFn(startDate, targetDate);

    if (result === null) {
      errorMessage.textContent =
        'Unable to calculate days. Both dates must be valid. Please verify your entries.';
      errorMessage.classList.add('show');
      return;
    }

    // Display result
    resultNumber.textContent = result;
    resultUnit.textContent = result === 1 ? 'Day' : 'Days';
    resultBox.classList.add('show');
    resultBox.setAttribute('aria-label', `${resultLabel}: ${result} ${result === 1 ? 'day' : 'days'}`);
  };

  // Event listeners
  startDateInput.addEventListener('change', recalculate);
  targetDateInput.addEventListener('change', recalculate);

  todayBtn.addEventListener('click', () => {
    try {
      targetDateInput.value = formatDateForInput(new Date());
      recalculate();
    } catch (error) {
      console.error('Failed to set date to today:', error);
      errorMessage.textContent = 'Failed to set date to today. Please use the date picker instead.';
      errorMessage.classList.add('show');
    }
  });

  tomorrowBtn.addEventListener('click', () => {
    try {
      targetDateInput.value = formatDateForInput(addDays(new Date(), 1));
      recalculate();
    } catch (error) {
      console.error('Failed to set date to tomorrow:', error);
      errorMessage.textContent = 'Failed to set date to tomorrow. Please use the date picker instead.';
      errorMessage.classList.add('show');
    }
  });
}
