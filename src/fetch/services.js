import accountStore from '../components/Account/AccountStore';
// import { checkInternetConnection } from 'react-native-offline';
import * as accountActions from '../components/Account/actions';
import { i18next } from '../i18n';
import { API_URL } from 'react-native-dotenv';

export const getAPIUrl = () => {
  console.log('API_URL: ', API_URL);
  return 'https://jobcore.herokuapp.com/api';
};

/**
 * POST method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth if endpoint needs token, true by default
 * @return {Promise}         the data from the endpoint
 */
export async function postData(url, data, isAuth = true) {
  await checkConnection();

  const options = {
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Accept-Language': i18next.language,
      'Content-Type': 'application/json',
      Authorization: isAuth
        ? `jwt ${accountStore.getState('Login').token}`
        : '',
    },
    method: 'POST',
  };

  const fullUrl = `${getAPIUrl()}${url}`;
  return timeout(20000, fetch(fullUrl, options))
    .then(checkStatus)
    .then((res) => {
      return res;
    })
    .catch(async (err) => {
      await Promise.reject(err);
    });
}

/**
 * PUT method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth if endpoint needs token, true by default
 * @return {Promise}         the data from the endpoint
 */
export async function putData(url, data, isAuth = true) {
  await checkConnection();

  return timeout(
    20000,
    fetch(`${getAPIUrl()}${url}`, {
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Accept-Language': i18next.language,
        'Content-Type': 'application/json',
        Authorization: isAuth
          ? `jwt ${accountStore.getState('Login').token}`
          : '',
      },
      method: 'PUT',
    }),
  )
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
    Accept: 'application/json',
    'Accept-Language': i18next.language,
    'Content-Type': 'application/json',
    Authorization: isAuth ? `jwt ${accountStore.getState('Login').token}` : '',
  };
  const fullUrl = `${getAPIUrl()}${url}`;
  console.log(`getData:`, headers, fullUrl);
  return timeout(
    20000,
    fetch(fullUrl, {
      headers,
      method: 'GET',
    }),
  )
    .then(checkStatus)
    .then((res) => res)
    .catch((err) => Promise.reject(err));
}

export const get = async (url, isAuth = true) => {
  await checkConnection();

  const headers = {
    Accept: 'application/json',
    'Accept-Language': i18next.language,
    'Content-Type': 'application/json',
    Authorization: isAuth ? `jwt ${accountStore.getState('Login').token}` : '',
  };
  const fullUrl = `${getAPIUrl()}${url}`;
  console.log(`getData:`, headers, fullUrl);
  return fetch(fullUrl, {
    headers,
    method: 'GET',
  })
    .then(checkStatus)
    .then((res) => res)
    .catch((err) => Promise.reject(err));
};

/**
 * DELETE method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth true if api requires token, true by default
 * @return {Promise}         the data from the endpoint
 */
export async function deleteData(url, isAuth = true) {
  await checkConnection();

  return timeout(
    20000,
    fetch(`${getAPIUrl()}${url}`, {
      headers: {
        Accept: 'application/json',
        'Accept-Language': i18next.language,
        'Content-Type': 'application/json',
        Authorization: isAuth
          ? `jwt ${accountStore.getState('Login').token}`
          : '',
      },
      method: 'DELETE',
    }),
  );
  // .then(checkStatus)
  // .then((res) => res)
  // .catch((err) => Promise.reject(err));
}

/**
 * GET method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth true if api requires token, true by default
 * @return {Promise}         the data parsed to blob from the endpoint
 */
export async function downloadData(url, isAuth = true) {
  await checkConnection();

  return timeout(
    20000,
    fetch(`${getAPIUrl()}${url}`, {
      method: 'GET',
      headers: {
        Authorization: isAuth
          ? `jwt ${accountStore.getState('Login').token}`
          : '',
      },
    }).then((response) => {
      if (response.status === 401 || response.status === 403) {
        response.json().then((res) => {
          accountActions.logoutOnUnautorized(res);
        });
      }

      if (response.ok) return response.blob();

      return response.json().then((err) => {
        return Promise.reject(err);
      });
    }),
  )
    .then((res) => res)
    .catch((err) => Promise.reject(err));
}

/**
 * PUT method fetch (multipart/form-data)
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth true if api requires token, true by default
 * @return {Promise}         the data from the endpoint
 */
export async function putFormData(url, formData, isAuth = true) {
  await checkConnection();

  return fetch(`${getAPIUrl()}${url}`, {
    body: formData,
    headers: {
      Accept: 'application/json',
      'Accept-Language': i18next.language,
      Authorization: isAuth
        ? `jwt ${accountStore.getState('Login').token}`
        : '',
    },
    method: 'PUT',
  })
    .then(checkStatus)
    .then((res) => res)
    .catch((err) => Promise.reject(err));
}

/**
 * PUT method fetch (multipart/form-data)
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth true if api requires token, true by default
 * @return {Promise}         the data from the endpoint
 */
export async function postFormData(url, formData, isAuth = true) {
  await checkConnection();

  return fetch(`${getAPIUrl()}${url}`, {
    body: formData,
    headers: {
      Accept: 'application/json',
      'Accept-Language': i18next.language,
      Authorization: isAuth
        ? `jwt ${accountStore.getState('Login').token}`
        : '',
    },
    method: 'POST',
  })
    .then(checkStatus)
    .then((res) => res)
    .catch((err) => Promise.reject(err));
}

/*
reject or resolve based on status then Parses the response to json
 */
export const checkStatus = (response) => {
  if (response && response.status === 500) {
    console.log('services:checkStatus:500', response);
    return response.text().then((res) => {
      console.log('services:checkStatus: 500:', res);
      return Promise.reject(new Error(res));
    });
  }

  if ((response && response.status === 401) || response.status === 403) {
    console.log('services:checkStatus:401|403', response);
    return response.json().then((res) => {
      accountActions.logoutOnUnautorized(res);
    });
  }

  if (response && response.ok) {
    if (response.status === 204) {
      return { status: 'No content response' };
    }
    console.log('services:checkStatus:response.ok:', response);
    return response.json().then((res) => {
      return Promise.resolve(res);
    });
  } else {
    console.log('services:checkStatus:code:', response.status, response);
    return response.json().then((err) => {
      const errorMessage = err[Object.keys(err)[0]];
      if (Array.isArray(errorMessage)) return Promise.reject(errorMessage[0]);
      return Promise.reject(errorMessage);
    });
  }
};

/**
 * check if the device is connected to internet
 */
async function checkConnection() {
  // const isConnected = await checkInternetConnection();
  // if (!isConnected) {
  //   throw new Error(i18next.t('APP.noInternet'));
  // }
}

/**
 * Timeout for fetch request
 * @param  {number} ms      milliseconds
 * @param  {promise} promise the fetch promise
 */
function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error(i18next.t('APP.timeout')));
    }, ms);
    promise.then(resolve, reject);
  });
}
