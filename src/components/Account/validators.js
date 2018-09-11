import * as utils from '../../utils';
import { i18next } from '../../i18n';

const loginValidator = (email, password) => {
    if (!utils.isValidString(email)) {
        throw new Error(i18next.t('LOGIN.emptyEmail'));
    }

    if (!utils.isValidString(password)) {
        throw new Error(i18next.t('LOGIN.emptyPassword'));
    }
};

const registerValidator = (email, password) => {
    if (!utils.isValidString(email)) {
        throw new Error(i18next.t('LOGIN.emptyEmail'));
    }

    if (!utils.isValidString(password)) {
        throw new Error(i18next.t('LOGIN.emptyPassword'));
    }
}


export {loginValidator, registerValidator};
