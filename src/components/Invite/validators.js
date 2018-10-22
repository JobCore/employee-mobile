import * as utils from '../../utils';
import { i18next } from '../../i18n';
import moment from 'moment';

const editPositionsValidator = (positions) => {
  if (!Array.isArray(positions)) {
    throw new Error(i18next.t('JOB_PREFERENCES.invalidPositions'));
  }

  for (const positionId of positions) {
    if (!utils.isValidInteger(positionId)) {
      throw new Error(i18next.t('JOB_PREFERENCES.invalidPositions'));
    }
  }

  if (!positions.length) {
    throw new Error(i18next.t('JOB_PREFERENCES.youMustSelectOnePosition'));
  }
}

const editAvailabilityDatesValidator = (startingAt, endingAt, availabilityId) => {
  if (!utils.isValidInteger(availabilityId)) {
    throw new Error(i18next.t('JOB_PREFERENCES.invalidAvailability'));
  }

  if (moment(startingAt).isSameOrAfter(endingAt)) {
    throw new Error(i18next.t('JOB_PREFERENCES.invalidAvailabilityDates'));
  }
}

const editAvailabilityAlldayValidator = (allday, availabilityId) => {
  if (!utils.isValidInteger(availabilityId)) {
    throw new Error(i18next.t('JOB_PREFERENCES.invalidAvailability'));
  }

  if (typeof(allday) !== 'boolean') {
    throw new Error(i18next.t('JOB_PREFERENCES.invalidAllday'));
  }
}

export {
  editPositionsValidator,
  editAvailabilityDatesValidator,
  editAvailabilityAlldayValidator,
};
