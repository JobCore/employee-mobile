import * as utils from '../../utils';

const loginValidator = (username_or_email, password) => {
  if (!utils.isValidString(username_or_email)) {
    throw new Error('LOGIN.emptyUsernameOrEmail');
  }

  if (!utils.isValidString(password)){
    throw new Error('LOGIN.emptyPassword');
  }
}

export { loginValidator };
