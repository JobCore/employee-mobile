import * as utils from '../../utils';

const registerValidator = (username, email, password) => {
  if (!utils.isValidString(username)) {
    throw new Error('LOGIN.emptyUsername');
  }

  if (!utils.isValidString(email)) {
    throw new Error('LOGIN.emptyEmail');
  }

  if (!utils.isValidString(password)){
    throw new Error('LOGIN.emptyPassword');
  }
}

export { registerValidator };
