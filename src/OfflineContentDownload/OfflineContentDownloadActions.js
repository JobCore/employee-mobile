/* eslint-disable no-return-assign */
import { AsyncStorage } from 'react-native'

import { BASE_URL, OFFLINE_CONTENT_DOWNLOAD_URL } from '../constants/urls'
import { OFFLINE_CONTENT_DOWNLOAD_TIMEOUT } from '../constants/config'
import mockPromise from '../utils/mockPromise';

import fakeData from './fakeData.json'
import timeoutFetch from '../utils/timeoutFetch';


/**
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

/**
 * Holds the state for whether the offline content is being downloading
 */
let _staticIsDownloading = false

export const staticIsDownloading = () => _staticIsDownloading

/**
 * True if there was an error in the last download
 */
let _staticThereWasError = false

export const staticThereWasError = () => _staticThereWasError

/**
 * True if the last download completed sucessfully
 */
let _staticAlreadyDownloaded = false

export const staticAlreadyDownloaded = () => _staticAlreadyDownloaded

/**
 * Takes a base url and the object parsed from the big json from the backend
 * through the download content for offline use service. e.g.:
 * {
 *   portal: {
 *     last: [{ foo: 'baz'}],
 *   },
 *   sidebar: {
 *     regions: {
 *       caracas: [{ foo: 'bar'}],
 *     },
 *   },
 * }
 * And returns an object mapping urls to content looking like this
 * (say base url was `asd.com`):
 * {
 *   'asd.com/portal/last': [{ foo: 'baz'}],
 *   'asd.com/sidebar/regions/caracas': [{ foo: 'bar'}],
 * }
 * Each of the keys of the object will be used as the key for offline
 * AsyncStorage and matches the url for the given online service for that
 * content.
 * @param {string} previousUrlPart
 * @param {object} itemsObject
 * @returns {{[k: string]: NewsItem[]}}
 */
const mapJsonToAsyncStorageKey = (previousUrlPart, itemsObject) => {
  /**
   * @type {{[k: string]: NewsItem[]}}
   */
  let map = {}

  Object.entries(itemsObject).forEach(([urlPart, itemsObjectOrItemsArray]) => {
    const appendedUrl = previousUrlPart + '/' + urlPart

    if (Array.isArray(itemsObjectOrItemsArray)) {
      map[appendedUrl] = itemsObjectOrItemsArray
    } else {
      map = {
        ...map,
        ...mapJsonToAsyncStorageKey(appendedUrl, itemsObjectOrItemsArray),
      }
    }
  })

  return map
}

/**
 * Gets the news content from the server, processes it and saves it to offline
 * storage.
 * @returns {Promise<void[]>}
 */
export const getOfflineContentAndSaveToAsyncStorage = () =>
// @ts-ignore
  ((_staticIsDownloading = true) || (_staticThereWasError = false)) &&
    timeoutFetch(OFFLINE_CONTENT_DOWNLOAD_URL, OFFLINE_CONTENT_DOWNLOAD_TIMEOUT)
      .then(res => res.json())
      .then(parsedJson => mapJsonToAsyncStorageKey(BASE_URL, parsedJson))
      .then(map => Object.entries(map))
      .then(entries => entries.map(([url , newsItems]) => {
        return AsyncStorage.setItem(url, JSON.stringify(newsItems))
      }))
      .then(asyncStoragePromises => Promise.all(asyncStoragePromises))
      .then(voidPromise => (_staticAlreadyDownloaded = true) && voidPromise)
      .catch(() => {
        _staticThereWasError = true
      })
      // https://github.com/facebook/react-native/issues/17972
      .finally(data => (_staticIsDownloading = false) || data)


// This is complicated service/screen. here's a mockup budnle to test it


/**
 * @param {boolean=} fail
 * @returns {Promise<void[]>}
 */
export const mockProcess =
  fail =>
    // @ts-ignore
    ((_staticIsDownloading = true) || (_staticThereWasError = false)) &&
      mockPromise(1000, fakeData, fail)
        .then(fakeDataRes => mapJsonToAsyncStorageKey(BASE_URL, fakeDataRes))
        .then(map => Object.entries(map))
        .then(entries => entries.map(([url , newsItems]) => {
          return AsyncStorage.setItem(url, JSON.stringify(newsItems))
        }))
        .then(asyncStoragePromises => Promise.all(asyncStoragePromises))
        .then(voidPromise => (_staticAlreadyDownloaded = true) && voidPromise)
        .catch(() => {
          _staticThereWasError = true
        })
        // https://github.com/facebook/react-native/issues/17972
        .finally(data => (_staticIsDownloading = false) || data)
