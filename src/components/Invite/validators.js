import * as utils from '../../utils';
import { i18next } from '../../i18n';

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

export {
  editPositionsValidator,
};
