import * as Flux from '../../utils/flux-state';
import accountStore from './AccountStore';

import { postData } from '../../fetch';
import { loginValidator, registerValidator, passwordResetValidator } from './validators';

/**
 * Action for login in the User
 * @param email
 * @param password
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
 * @param email
 * @param password
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
 * Action for changing password, an email will be sent to reset your password
 * @param email
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
 * Action for setting the stored user from AsyncStorage/Flux on app first load
 * @param user
 */
const setStoredUser = (user) => {
  Flux.dispatchEvent('Login', user);
}

export { login, register, passwordReset, setStoredUser, logout };
