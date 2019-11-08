import moment from 'moment';
import { Platform, Dimensions } from 'react-native';

/**
 * Is on production or not
 */
export const PROD = true;

/**
 * Validate if a string is valid or not
 * @param stringToTest The string to validate
 * @param allowEmpty If a empty string is valid or no
 * @return {boolean} If the string is valid
 */
const isValidString = (stringToTest, allowEmpty = false) => {
  if (typeof stringToTest !== 'string') return false;

  if (stringToTest.length === 0 && allowEmpty === false) return false;

  return true;
};

/**
 * Validate if a string is a valid number
 * @param stringToTest The string to validate
 * @return {boolean} If the string is a valid number
 */
const isValidNumber = (
  stringToTest,
  allowCero = false,
  allowNegative = false,
) => {
  const numberToTest = parseInt(stringToTest, 10);

  if (stringToTest.length === 0) return false;

  if (typeof numberToTest !== 'number') return false;

  if (numberToTest === 0 && allowCero === false) return false;

  if (numberToTest < 0 && allowNegative === false) return false;

  return true;
};

/**
 * Validate if a number is a valid integer
 * @param numberToTest The number to validate
 * @return {boolean} If the number is a valid integer
 */
const isValidInteger = (
  numberToTest,
  allowCero = false,
  allowNegative = false,
) => {
  if (!Number.isInteger(numberToTest)) return false;

  if (numberToTest === 0 && allowCero === false) return false;

  if (numberToTest < 0 && allowNegative === false) return false;

  return true;
};

const LOG = (obj, msg) => {
  console.log(obj.__proto__.constructor.name, msg);
};

const WARN = (obj, msg) => {
  console.warn(obj.__proto__.constructor.name, msg);
};
const ERROR = (obj, msg) => {
  console.error(obj.__proto__.constructor.name, msg);
};

/**
 * Compares if two date's month and year are equal
 * @param  {string} date1 a valid string moment date
 * @param  {string} date2 a valid string moment date
 * @return {boolean} true if dates has the same month and year
 */
const equalMonthAndYear = (date1, date2) => {
  return (
    moment(date1).get('month') === moment(date2).get('month') &&
    moment(date1).get('year') === moment(date2).get('year')
  );
};

/**
 * Error handler for stores
 * @return {[type]} [description]
 */
const storeErrorHandler = (err) => {
  if (err.detail) {
    return err.detail;
  }
  if (err.details) {
    return err.details;
  }
  if (err.non_field_errors) {
    return err.non_field_errors.join(', ');
  }
  if (err.message) {
    return err.message;
  }
  if (err.error) {
    return err.error;
  }

  return err;
};

export const hasNotch = () => {
  if (Platform.OS !== 'ios') return false;
  const dim = Dimensions.get('window');
  return dim.height > 812 || dim.width > 812;
};

export {
  isValidString,
  isValidNumber,
  isValidInteger,
  LOG,
  WARN,
  ERROR,
  equalMonthAndYear,
  storeErrorHandler,
};
