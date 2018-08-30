/**
 * Validate if a string is valid or not
 * @param stringToTest The string to validate
 * @param allowEmpty If a empty string is valid or no
 * @return {boolean} If the string is valid
 */
const isValidString = (stringToTest, allowEmpty = false) => {
  if (typeof(stringToTest) !== 'string') return false;

  if (stringToTest.length === 0 && allowEmpty === false) return false;

  return true;
};

/**
 * Validate if a string is a valid number
 * @param stringToTest The string to validate
 * @return {boolean} If the string is a valid number
 */
const isValidNumber = (stringToTest, allowCero = false, allowNegative = false) => {
  const numberToTest = parseInt(stringToTest, 10);

  if (stringToTest.length === 0) return false;

  if (typeof(numberToTest) !== 'number') return false;

  if (numberToTest === 0 && allowCero === false) return false;

  if (numberToTest < 0 && allowNegative === false) return false;

  return true;
};

/**
 * Validate if a number is a valid integer
 * @param numberToTest The number to validate
 * @return {boolean} If the number is a valid integer
 */
const isValidInteger = (numberToTest, allowCero = false, allowNegative = false) => {
  if (!Number.isInteger(numberToTest)) return false;

  if (numberToTest === 0 && allowCero === false) return false;

  if (numberToTest < 0 && allowNegative === false) return false;

  return true;
};

export { isValidString, isValidNumber, isValidInteger };
