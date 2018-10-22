import * as Flux from '../../utils/flux-state';
import accountStore from './AccountStore';

import { postData, putData } from '../../fetch';
import { loginValidator, registerValidator, passwordResetValidator, editProfileValidator } from './validators';

/**
 * Login action
 * @param  {string} email
 * @param  {string} password
 */
const login = (email, password) => {
  try {
    loginValidator(email, password);
  } catch (err) {
    return Flux.dispatchEvent('AccountStoreError', err);
  }

  postData('/login', { username_or_email: email, password: password }, false)
    .then((data) => {
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
const register = (email, password, firstName, lastName) => {
  try {
    registerValidator(email, password, firstName, lastName);
  } catch (err) {
    return Flux.dispatchEvent('AccountStoreError', err);
  }

  postData('/user/register', {
      account_type: 'employee',
      first_name: firstName,
      last_name: lastName,
      username: email,
      email: email,
      password: password,
    }, false)
    .then((data) => {
      Flux.dispatchEvent('Register', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
}

/**
 * Edit profile action
 * @param  {string | number} userId
 * @param  {string} firstName
 * @param  {string} lastName
 */
const editProfile = (userId, firstName, lastName) => {
  try {
    editProfileValidator(firstName, lastName);
  } catch (err) {
    return Flux.dispatchEvent('AccountStoreError', err);
  }

  putData(`/profiles/${userId}`, {
      first_name: firstName,
      last_name: lastName,
    })
    .then((data) => {
      Flux.dispatchEvent('EditProfile', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
}

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
}

/**
 * Action for logOut, YOU MUST CLEAR ALL flux stores you need here
 */
const logout = () => {
  accountStore.clearState();

  Flux.dispatchEvent('Logout', {});
}

/**
 * Action for setting/updating the stored user from AsyncStorage/Flux on app first load
 * @param {object} user
 */
const setStoredUser = (user) => {
  // setTimeout to avoid "cannot dispatch in the middle of dispatch"
  setTimeout(() => {
    Flux.dispatchEvent('Login', user);
  });
}

export { login, register, passwordReset, setStoredUser, logout, editProfile };
