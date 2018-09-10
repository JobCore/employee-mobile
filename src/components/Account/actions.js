import * as Flux from '../../utils/flux-state';

import {postData} from '../../fetch';
import {loginValidator, registerValidator} from './validators';

/**
 * Action for login in the User
 * @param usernameOrEmail
 * @param password
 */
const login = (usernameOrEmail, password) => {
    try {
        loginValidator(usernameOrEmail, password);
    } catch (err) {
        return Flux.dispatchEvent('AccountStoreError', err);
    }

	postData('/api/login', {username_or_email: usernameOrEmail, password: password}, false)
	.then((data) => {
		Flux.dispatchEvent('Login', loginData);
	})
	.catch((err) => {
        return Flux.dispatchEvent('AccountStoreError', err);
    });
};

/**
 * Action for registering the User
 * @param username
 * @param email
 * @param password
 * @return {Promise<*>}
 */
const register = async (username, email, password) => {
    try {
        registerValidator(username, email, password);
    } catch (err) {
        return Flux.dispatchEvent('AccountStoreError', err);
    }

    let data;

    try {
        data = await postData('/api/register', {username: username, email: email, password: password}, false);
    } catch (err) {
        throw err;
        return Flux.dispatchEvent('AccountStoreError', err);
    }

    Flux.dispatchEvent('Register', data);
}

export {login, register};
