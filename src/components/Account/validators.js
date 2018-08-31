import * as utils from '../../utils/index';

const loginValidator = (username_or_email, password) => {
    if (!utils.isValidString(username_or_email)) {
        throw new Error('LOGIN.emptyUsernameOrEmail');
    }

    if (!utils.isValidString(password)) {
        throw new Error('LOGIN.emptyPassword');
    }
};

const registerValidator = (username, email, password) => {
    if (!utils.isValidString(username)) {
        throw new Error('LOGIN.emptyUsername');
    }

    if (!utils.isValidString(email)) {
        throw new Error('LOGIN.emptyEmail');
    }

    if (!utils.isValidString(password)) {
        throw new Error('LOGIN.emptyPassword');
    }
}


export {loginValidator, registerValidator};
