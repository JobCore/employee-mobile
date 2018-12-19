import * as utils from '../../utils';
import { i18next } from '../../i18n';

const rateJobValidator = (shiftId, employerId, rating, comments) => {
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

export { rateJobValidator };
