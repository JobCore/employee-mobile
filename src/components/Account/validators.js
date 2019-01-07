import * as utils from '../../utils';
import { i18next } from '../../i18n';

const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

const loginValidator = (email, password) => {
  if (!utils.isValidString(email)) {
    throw new Error(i18next.t('LOGIN.emptyEmail'));
  }

  if (!utils.isValidString(password)) {
    throw new Error(i18next.t('LOGIN.emptyPassword'));
  }
};

const registerValidator = (email, password, firstName, lastName) => {
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

const editProfilePictureValidator = (image) => {
  const { uri, name, type } = image;

  if (!utils.isValidString(uri)) {
    throw new Error(i18next.t('EDIT_PROFILE.invalidImage'));
  }
  if (!utils.isValidString(name)) {
    throw new Error(i18next.t('EDIT_PROFILE.invalidImage'));
  }

  if (utils.isValidString(type)) {
    let isValidType = false;
    for (const validType of validFileTypes) {
      if (type === validType) isValidType = true;
    }

    if (!isValidType) {
      throw new Error(i18next.t('EDIT_PROFILE.invalidImage'));
    }
  } else throw new Error(i18next.t('EDIT_PROFILE.invalidImage'));
};

export {
  loginValidator,
  registerValidator,
  passwordResetValidator,
  editProfileValidator,
  editProfilePictureValidator,
};
