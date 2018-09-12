import { AsyncStorage } from 'react-native'
import { getItem, setItem, removeItem } from '../utils/StorageTimeout'

import isNewsItem from '../utils/isNewsItem'
import { ASYNC_STORAGE_TIMEOUT } from '../constants/config'
/**
 * @typedef {import('../definitions').NewsItem} NewsItem
 */


/**
 * Prefix to use in AsyncStorage keys to differentiate favorites from other
 * content
 */
const FAV_KEY_PREFIX = 'FAV:'


/**
 * @type {Function[]}
 */
const subscribers = []

const notifySubscribers = () => {
  subscribers.forEach((subscriber) => {
    subscriber()
  })
}

/**
 *
 * @param {Function} fn
 */
export const subscribe = (fn) => {
  subscribers.push(fn)
}

/**
 * @param {Function} fn
 */
export const unsubscribe = (fn) => {
  subscribers.splice(subscribers.indexOf(fn), 1)
}

subscribe(() => {
  if (__DEV__) {
    AsyncStorage.getAllKeys().then((keys) => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.warn(`favs is now of length: ${keys.length}`)
      }
    })
  }
})


/**
 * @param {NewsItem} newsItem
 * @returns {Promise<void>}
 */
export const saveNewsItem = async (newsItem) => {
  isNewsItem(newsItem, 0, [])

  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.warn(`add ${newsItem.id} to favorites`)
  }

  const key = FAV_KEY_PREFIX + newsItem.id.toString()

  const alreadyExists = await getItem(key, ASYNC_STORAGE_TIMEOUT) !== null

  if (alreadyExists) {
    throw new Error(
      'trying to save to favorites an article already in it, this is probably an interface error, the app is showing a save favorite icon somewhere even though the article is already saved'
    )
  }

  const json = JSON.stringify(newsItem)

  return setItem(key, json, ASYNC_STORAGE_TIMEOUT)
    .then(notifySubscribers)
}


/**
 * @param {number} id Unique id of the news item to get
 * @returns {Promise<NewsItem>}
 */
export const getSavedNewsItem = async (id) => {
  const key = FAV_KEY_PREFIX + id.toString()

  const json = await getItem(key, ASYNC_STORAGE_TIMEOUT)

  if (json === null) {
    throw new Error(
      'trying to get a news item from the favorites which isnt in there'
    )
  }

  const obj = JSON.parse(json)

  isNewsItem(obj, 0, [])

  return /** @type {NewsItem} */ (obj)
}


/**
 * @param {number} id
 */
export const detectFavorite = async (id) => {
  try {
    await getSavedNewsItem(id)
    return true
  } catch (e) { // TODO: Don't use exceptions for control flow...
    return false
  }
}


/**
 * @param {number} id
 */
export const removeNewsItem = async (id) => {
  if (!detectFavorite(id)) {
    throw new Error(
      'trying to remove a news item from favorites even though it isnt on favorites'
    )
  }

  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.warn(`remove ${id} from favorites`)
  }

  const key = FAV_KEY_PREFIX + id

  return removeItem(key, ASYNC_STORAGE_TIMEOUT).then(notifySubscribers)
}

/**
 * @returns {Promise<NewsItem[]>} NewsItems saved in async storage as favorites
 */
export const getAllFavorites = async () => {
  const keys = await AsyncStorage.getAllKeys()

  if (!Array.isArray(keys)) {
    throw new Error(
      `Expected an array of keys from AsyncStorage, got instead a ${typeof keys}`
    )
  }

  if (!keys.every(key => typeof key === 'string')) {
    throw new Error(
      'Expected an array of keys from AsyncStorage, got another type in the array'
    )
  }

  const onlyFavKeys = keys.filter(key => key.indexOf(FAV_KEY_PREFIX) === 0)

  /**
   * @type {ReadonlyArray<string|null>}
   */
  const itemsJson = await Promise.all(
    onlyFavKeys
      .map((key, _, arr) => getItem(key, ASYNC_STORAGE_TIMEOUT * arr.length))
  )

  if (!itemsJson.every(itemJson => typeof itemJson === 'string')) {
    throw new Error(
      'Expected an array of json strings from AsyncStorage, got another type in the array'
    )
  }

  /**
   * @type {NewsItem[]}
   */
  const items = itemsJson.map(json =>
    JSON.parse(/** @type {string} */ (json))) // we already checked their all strings

  if (!items.every(isNewsItem)) {
    throw new Error()
  }

  return items
}
