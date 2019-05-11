import * as utils from '../../shared';
import { i18next } from '../../i18n';
import moment from 'moment';

const rateEmployerValidator = (shiftId, employerId, rating, comments) => {
  if (!utils.isValidInteger(shiftId)) {
    throw new Error(i18next.t('MY_JOBS.invalidShift'));
  }

  if (!utils.isValidInteger(employerId)) {
    throw new Error(i18next.t('MY_JOBS.invalidEmployer'));
  }

  if (!utils.isValidInteger(rating)) {
    throw new Error(i18next.t('MY_JOBS.invalidRating'));
  } else if (rating < 0 || rating > 5) {
    throw new Error(i18next.t('MY_JOBS.invalidRating'));
  }

  if (!utils.isValidString(comments)) {
    throw new Error(i18next.t('MY_JOBS.invalidComments'));
  }
};

/**
 * Clock in/out validator
 * @param  {number} shiftId
 * @param  {string} latitude
 * @param  {string} longitude
 * @param  {Date} date
 */
const clockInOutValidator = (shiftId, latitude, longitude, date) => {
  if (!utils.isValidInteger(shiftId)) {
    throw new Error(i18next.t('MY_JOBS.invalidShift'));
  }

  if (!utils.isValidNumber(latitude, false, true)) {
    throw new Error(i18next.t('MY_JOBS.invalidLatitude'));
  }

  if (!utils.isValidNumber(longitude, false, true)) {
    throw new Error(i18next.t('MY_JOBS.invalidLongitude'));
  }

  if (!moment(date).isValid()) {
    throw new Error(i18next.t('MY_JOBS.invalidDate'));
  }
};

export { rateEmployerValidator, clockInOutValidator };
