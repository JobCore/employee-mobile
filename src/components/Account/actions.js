import * as Flux from '../../utils/flux-state';
import accountStore from './AccountStore';
import fcmStore from '../Dashboard/FcmStore';
import { LOG } from '../../utils';
import { postData, putData, deleteData } from '../../fetch';
import {
  loginValidator,
  registerValidator,
  passwordResetValidator,
  editProfileValidator,
} from './validators';

/**
 * Login action
 * @param  {string} email
 * @param  {string} password
 */
const login = (email, password, fcmToken) => {
  try {
    loginValidator(email, password);
  } catch (err) {
    return Flux.dispatchEvent('AccountStoreError', err);
  }

  postData(
    '/login',
    { username_or_email: email, password: password, registration_id: fcmToken },
    false,
  )
    .then((data) => {
      data.fcmToken = fcmToken;
      Flux.dispatchEvent('Login', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
};

/**
 * Action for registering the User
 * @param  {string} email
 * @param  {string} password
 * @param  {string} firstName
 * @param  {string} lastName
 */
const register = (email, password, firstName, lastName, bio) => {
  try {
    registerValidator(email, password, firstName, lastName, bio);
  } catch (err) {
    return Flux.dispatchEvent('AccountStoreError', err);
  }

  postData(
    '/user/register',
    {
      account_type: 'employee',
      first_name: firstName,
      last_name: lastName,
      username: email,
      email: email,
      password: password,
      bio,
    },
    false,
  )
    .then((data) => {
      Flux.dispatchEvent('Register', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
};

/**
 * Edit profile action
 * @param  {string | number} userId
 * @param  {string} firstName
 * @param  {string} lastName
 */
const editProfile = (userId, firstName, lastName, bio) => {
  try {
    editProfileValidator(firstName, lastName, bio);
  } catch (err) {
    return Flux.dispatchEvent('AccountStoreError', err);
  }

  putData(`/profiles/${userId}`, {
    first_name: firstName,
    last_name: lastName,
    bio,
  })
    .then((data) => {
      Flux.dispatchEvent('EditProfile', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
};

/**
 * Action for changing password, an email will be sent to reset your password
 * @param {string} email
 */
const passwordReset = (email) => {
  try {
    passwordResetValidator(email);
  } catch (err) {
    return Flux.dispatchEvent('AccountStoreError', err);
  }

  postData('/user/password/reset', { email }, false)
    .then((data) => {
      Flux.dispatchEvent('PasswordReset', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
};

/**
 * Action for logOut, YOU MUST CLEAR ALL flux stores you need here
 * // YOU MUST use logoutOnUnautorized For unautorized API error
 * (status 401/403)
 */
const logout = () => {
  let fcmTokenStored;

  try {
    fcmTokenStored =
      fcmStore.getState('UpdateFcmToken') ||
      accountStore.getState('Login').fcmToken;
  } catch (e) {
    LOG(this, 'failed to get fcmToken from Store');
  }

  if (!fcmTokenStored) {
    LOG(this, 'No Token on state');
    accountStore.clearState();
    return Flux.dispatchEvent('Logout', {});
  }

  deleteData(`/employees/me/devices/${fcmTokenStored}`)
    .then(() => {
      accountStore.clearState();
      Flux.dispatchEvent('Logout', {});
    })
    .catch((err) => {
      Flux.dispatchEvent('Logout', {});
      Flux.dispatchEvent('AccountStoreError', err);
    });
};

/**
 * Logout on unautorized API response (status 401/403)
 * YOU MUST use this for unautorized API error
 */
const logoutOnUnautorized = () => {
  accountStore.clearState();
  return Flux.dispatchEvent('Logout', {});
};

/**
 * Action for setting/updating the stored user from AsyncStorage/Flux or to ser user on app first load
 * @param {object} user
 */
const setStoredUser = (user) => {
  // setTimeout to avoid "cannot dispatch in the middle of dispatch"
  setTimeout(() => {
    Flux.dispatchEvent('Login', user);
  });
};

export {
  login,
  register,
  passwordReset,
  setStoredUser,
  logout,
  logoutOnUnautorized,
  editProfile,
};
