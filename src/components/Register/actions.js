//import Flux from 'flux-state';

import { postData } from '../../fetch';
import { registerValidator } from './validators';

const register = async (username, email, password) => {
  try {
    registerValidator(username, email, password);
  } catch (err) {
    throw err;
    // return Flux.dispatchEvent('AuthStoreError', err);
  }

  return await postData('/api/register', {
    username: username,
    email: email,
    password: password }, false)
    // .then((res) => {
    //   Flux.dispatchEvent('login', res);
    // })
    // .catch((err) => {
    //   Flux.dispatchEvent('AuthStoreError', err);
    // });
}

export { register };
