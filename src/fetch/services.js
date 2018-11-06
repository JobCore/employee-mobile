import accountStore from '../components/Account/AccountStore';
import {checkInternetConnection} from 'react-native-offline';
import * as Flux from '../utils/flux-state';
import * as accountActions from '../components/Account/actions';
import {i18next} from '../i18n';
import {LOG, WARN, ERROR} from "../utils";

const API_URL = 'https://jobcore.herokuapp.com/api';

/**
 * POST method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth if endpoint needs token, true by default
 * @return {Promise}         the data from the endpoint
 */
export async function postData(url, data, isAuth = true) {
    await checkConnection();

    return timeout(20000, fetch(`${API_URL}${url}`, {
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en',
            'Content-Type': 'application/json',
            'Authorization': (isAuth) ? `jwt ${accountStore.getState('Login').token}` : '',
        },
        method: 'POST',
    }))
        .then(checkStatus)
        .then((res) => res)
        .catch((err) => Promise.reject(err));
}

/**
 * PUT method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth if endpoint needs token, true by default
 * @return {Promise}         the data from the endpoint
 */
export async function putData(url, data, isAuth = true) {
    await checkConnection();

    return timeout(20000, fetch(`${API_URL}${url}`, {
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en',
            'Content-Type': 'application/json',
            'Authorization': (isAuth) ? `jwt ${accountStore.getState('Login').token}` : '',
        },
        method: 'PUT',
    }))
        .then(checkStatus)
        .then((res) => res)
        .catch((err) => Promise.reject(err));
}

/**
 * GET method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth true if api requires token, true by default
 * @return {Promise}         the data from the endpoint
 */
export async function getData(url, isAuth = true) {
    await checkConnection();

    const headers = {
        'Accept': 'application/json',
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
        'Authorization': (isAuth) ? `jwt ${accountStore.getState('Login').token}` : '',
    };
    LOG(this, ["getData", url, headers]);

    return timeout(20000, fetch(`${API_URL}${url}`, {
        headers,
        method: 'GET',
    }))
        .then(checkStatus)
        .then((res) => res)
        .catch((err) => Promise.reject(err));
}

/**
 * DELETE method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth true if api requires token, true by default
 * @return {Promise}         the data from the endpoint
 */
export async function deleteData(url, isAuth = true) {
    await checkConnection();

    return timeout(20000, fetch(`${API_URL}${url}`, {
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en',
            'Content-Type': 'application/json',
            'Authorization': (isAuth) ? `jwt ${accountStore.getState('Login').token}` : '',
        },
        method: 'DELETE',
    }))
        .then(checkStatus)
        .then((res) => res)
        .catch((err) => Promise.reject(err));
}

/**
 * GET method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth true if api requires token, true by default
 * @return {Promise}         the data parsed to blob from the endpoint
 */
export async function downloadData(url, isAuth = true) {
    await checkConnection();

    return timeout(20000, fetch(`${API_URL}${url}`, {
        method: 'GET',
        headers: {
            'Authorization': (isAuth) ? `jwt ${accountStore.getState('Login').token}` : '',
        }
    })
        .then((response) => {
            if (response.status === 401 || response.status === 403) {
                accountActions.logoutOnUnautorized();
            }

            if (response.ok) return response.blob();

            return response.json().then((err) => {
                return Promise.reject(err);
            })
        }))
        .then((res) => res)
        .catch((err) => Promise.reject(err));
}

/**
 * POST method fetch (multipart/form-data)
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth true if api requires token, true by default
 * @return {Promise}         the data from the endpoint
 */
export async function postFormData(url, formData, isAuth = true) {
    await checkConnection();

    return timeout(20000, fetch(`${API_URL}${url}`, {
        body: formData,
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en',
            'Authorization': (isAuth) ? `jwt ${accountStore.getState('Login').token}` : '',
        },
        method: 'POST',
    }))
        .then(checkStatus)
        .then((res) => res)
        .catch((err) => Promise.reject(err));
}


/*
reject or resolve based on status then Parses the response to json
 */
function checkStatus(response) {
    LOG(this, ["services:checkStatus", response]);
    if (response && response.status === 401 || response.status === 403) {
        accountActions.logoutOnUnautorized();
    }

    if (response && response.ok) {
        if (response.status === 204) {
            return {status: 'No content response'}
        }

        return response.json().then((res) => {
            return Promise.resolve(res);
        })
    } else {
        return response.json().then((err) => {
            return Promise.reject(err);
        })
    }
}

/**
 * check if the device is connected to internet
 */
async function checkConnection() {
    const isConnected = await checkInternetConnection();

    if (!isConnected) {
        throw new Error(i18next.t('APP.noInternet'));
    }
}

/**
 * Timeout for fetch request
 * @param  {number} ms      milliseconds
 * @param  {promise} promise the fetch promise
 */
function timeout(ms, promise) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new Error(i18next.t('APP.timeout')));
        }, ms);
        promise.then(resolve, reject)
    })
}
