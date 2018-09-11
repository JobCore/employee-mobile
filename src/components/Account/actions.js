import * as Flux from '../../utils/flux-state';

import { postData } from '../../fetch';
import { loginValidator, registerValidator } from './validators';

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

  postData('/api/login', { username_or_email: email, password: password }, false)
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
const register = (email, password) => {
  try {
    registerValidator(email, password);
  } catch (err) {
    return Flux.dispatchEvent('AccountStoreError', err);
  }

  postData('/api/register', { email: email, password: password }, false)
    .then((data) => {
      Flux.dispatchEvent('Register', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
}

export { login, register };
