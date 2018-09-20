import accountStore from '../components/Account/AccountStore';
import * as Flux from '../utils/flux-state';
import { LOG, WARN, ERROR } from "../utils";

const API_URL = 'https://jobcore.herokuapp.com/api';

/**
 * POST method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth if endpoint needs token, true by default
 * @return {Promise}         the data from the endpoint
 */
export function postData(url, data, isAuth = true) {
  return new Promise((resolve, reject) => {

    return fetch(`${API_URL}${url}`, {
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en',
          'Content-Type': 'application/json',
          'Authorization': (isAuth) ? `jwt ${accountStore.getState('Login').token}` : '',
        },
        method: 'POST',
      })
      .then(checkStatus)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

/**
 * PUT method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth if endpoint needs token, true by default
 * @return {Promise}         the data from the endpoint
 */
export function putData(url, data, isAuth = true) {
  return new Promise((resolve, reject) => {

    return fetch(`${API_URL}${url}`, {
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en',
          'Content-Type': 'application/json',
          'Authorization': (isAuth) ? `jwt ${accountStore.getState('Login').token}` : '',
        },
        method: 'PUT',
      })
      .then(checkStatus)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

/**
 * GET method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth true if api requires token, true by default
 * @return {Promise}         the data from the endpoint
 */
export function getData(url, isAuth = true) {
  return new Promise((resolve, reject) => {
    return fetch(`${API_URL}${url}`, {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en',
          'Content-Type': 'application/json',
          'Authorization': (isAuth) ? `jwt ${accountStore.getState('Login').token}` : '',
        },
        method: 'GET',
      })
      .then(checkStatus)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

/**
 * DELETE method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth true if api requires token, true by default
 * @return {Promise}         the data from the endpoint
 */
export function deleteData(url, isAuth = true) {
  return new Promise((resolve, reject) => {

    return fetch(`${API_URL}${url}`, {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en',
          'Content-Type': 'application/json',
          'Authorization': (isAuth) ? `jwt ${accountStore.getState('Login').token}` : '',
        },
        method: 'DELETE',
      })
      .then(checkStatus)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

/**
 * GET method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth true if api requires token, true by default
 * @return {Promise}         the data parsed to blob from the endpoint
 */
export function downloadData(url, isAuth = true) {
  return new Promise((resolve, reject) => {

    return fetch(`${API_URL}${url}`, {
        method: 'GET',
        headers: {
          'Authorization': (isAuth) ? `jwt ${accountStore.getState('Login').token}` : '',
        }
      })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          Flux.dispatchEvent('Logout', {});
        }

        if (response.ok) return response.blob();

        return response.json().then((err) => {
          return Promise.reject(err);
        })
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

/**
 * POST method fetch (multipart/form-data)
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth true if api requires token, true by default
 * @return {Promise}         the data from the endpoint
 */
export function postFormData(url, formData, isAuth = true) {
  return new Promise((resolve, reject) => {
    return fetch(`${API_URL}${url}`, {
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Accept-Language': i18next.language,
          'Authorization': (isAuth) ? `jwt ${accountStore.getState('Login').token}` : '',
        },
        method: 'POST',
      })
      .then(checkStatus)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}


/*
reject or resolve based on status then Parses the response to json
 */
function checkStatus(response) {
  if (response.status === 401 || response.status === 403) {
    Flux.dispatchEvent('Logout', {});
  }

  if (response.ok) {
    if (response.status === 204) {
      return { status: 'No content response'}
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
