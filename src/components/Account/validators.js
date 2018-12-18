import * as utils from '../../utils';
import { i18next } from '../../i18n';

const loginValidator = (email, password) => {
  if (!utils.isValidString(email)) {
    throw new Error(i18next.t('LOGIN.emptyEmail'));
  }

  if (!utils.isValidString(password)) {
    throw new Error(i18next.t('LOGIN.emptyPassword'));
  }
};

const registerValidator = (email, password, firstName, lastName, bio) => {
  if (!utils.isValidString(firstName)) {
    throw new Error(i18next.t('REGISTER.emptyFirstName'));
  }

  if (!utils.isValidString(lastName)) {
    throw new Error(i18next.t('REGISTER.emptyLastName'));
  }

  if (!utils.isValidString(email)) {
    throw new Error(i18next.t('LOGIN.emptyEmail'));
  }

  if (!utils.isValidString(password)) {
    throw new Error(i18next.t('LOGIN.emptyPassword'));
  }

  if (!utils.isValidString(bio, true)) {
    throw new Error(i18next.t('REGISTER.invalidBio'));
  }
};

const passwordResetValidator = (email) => {
  if (!utils.isValidString(email)) {
    throw new Error(i18next.t('LOGIN.emptyEmail'));
  }
};

const editProfileValidator = (firstName, lastName, bio) => {
  if (!utils.isValidString(firstName)) {
    throw new Error(i18next.t('REGISTER.emptyFirstName'));
  }

  if (!utils.isValidString(lastName)) {
    throw new Error(i18next.t('REGISTER.emptyLastName'));
  }

  if (!utils.isValidString(bio, true)) {
    throw new Error(i18next.t('REGISTER.invalidBio'));
  }
};

export {
  loginValidator,
  registerValidator,
  passwordResetValidator,
  editProfileValidator,
};
