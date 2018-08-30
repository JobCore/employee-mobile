//import Flux from 'flux-state';

import { postData } from '../../fetch';
import { loginValidator } from './validators';

const login = async (username_or_email, password) => {
  try {
    loginValidator(username_or_email, password);
  } catch (err) {
    throw err;
    // return Flux.dispatchEvent('AuthStoreError', err);
  }

  return await postData('/api/login', { username_or_email: username_or_email, password: password }, false)
    // .then((res) => {
    //   Flux.dispatchEvent('login', res);
    // })
    // .catch((err) => {
    //   Flux.dispatchEvent('AuthStoreError', err);
    // });
}

export { login };
