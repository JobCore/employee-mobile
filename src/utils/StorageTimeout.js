import { AsyncStorage } from 'react-native'

import mockPromise from './mockPromise'


/**
 * AsyncStorage.getItem() with timeout
 * @param {string} key AsyncStorage key
 * @param {number} timeout Timeout in milliseconds
 * @returns {Promise<string|null>}
 */
export const getItem = (key, timeout) => {
  if (typeof timeout !== 'number') {
    throw new TypeError(
      'Must specify timeout argument when calling getItem()'
    )
  }

  return Promise.race([
    mockPromise(timeout, null, true),
    AsyncStorage.getItem(key),
  ])
}


/**
 * AsyncStorage.getItem() with timeout
 * @param {string} key AsyncStorage key
 * @param {string} string String to save
 * @param {number} timeout Timeout in milliseconds
 * @returns {Promise<void>}
 */
export const setItem = (key, string, timeout) => {
  if (typeof timeout !== 'number') {
    throw new TypeError(
      'Must specify timeout argument when calling setItem()'
    )
  }
  if (typeof string !== 'string') {
    `Must specify string argument when calling setItem, found: ${typeof string}`
  }

  return Promise.race([
    mockPromise(timeout, null, true),
    AsyncStorage.setItem(key, string),
  ])
}


/**
 * AsyncStorage.removeItem() with timeout
 * @param {string} key AsyncStorage key
 * @param {number} timeout Timeout in milliseconds
 * @returns {Promise<void>}
 */
export const removeItem = (key, timeout) => {
  if (typeof timeout !== 'number') {
    throw new TypeError(
      'Must specify timeout argument when calling getItem()'
    )
  }

  return Promise.race([
    mockPromise(timeout, null, true),
    AsyncStorage.removeItem(key),
  ])
}


/**
 * AsyncStorage.getAllKeys() with timeout
 * @param {number} timeout Timeout in milliseconds
 * @returns {Promise<ReadonlyArray<string>>}
 */
export const getAllKeys = (timeout) => {
  if (typeof timeout !== 'number') {
    throw new TypeError(
      'Must specify timeout argument when calling getAllKeys()'
    )
  }

  return Promise.race([
    mockPromise(timeout, null, true),
    AsyncStorage.getAllKeys(),
  ])
}
