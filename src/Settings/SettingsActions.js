import { getAllKeys, getItem, setItem, removeItem } from '../utils/StorageTimeout'
import { FONT_SIZE_SETTING_KEY } from '../constants/others'
import { ASYNC_STORAGE_TIMEOUT, DEFAULT_FONT_SIZE } from '../constants/config'
import { BASE_URL } from '../constants/urls'


/**
 * @typedef {import('../constants/config').FontSize} FontSize
 */

/**
 * Defaults to DEFAULT_FONT_SIZE as found in constants/config if the font size
 * wasnt retrieved from AsyncStorage
 * @returns {Promise<number>} The font size selected
 */
export const fetchFontSize = () =>
  getItem(FONT_SIZE_SETTING_KEY, ASYNC_STORAGE_TIMEOUT)
    .then((stringOrNull) => {
      if (typeof stringOrNull === 'string') {
        return Number(stringOrNull)
      }
      return DEFAULT_FONT_SIZE
    })
    .catch((e) => {
      if (__DEV__) {
        throw e
      }
      return DEFAULT_FONT_SIZE
    })


/**
 * @param {FontSize} fontSize
 */
export const setFontSize = fontSize =>
  setItem(FONT_SIZE_SETTING_KEY, fontSize.toString(), ASYNC_STORAGE_TIMEOUT)


/**
 * @returns {Promise<any>}
 */
export const clearCache = () =>
  getAllKeys(ASYNC_STORAGE_TIMEOUT)
    .then(keys => keys.filter(key => key.indexOf(BASE_URL) === 0))
    .then(urls => urls.map(url => removeItem(url, ASYNC_STORAGE_TIMEOUT * 4)))
    .then(Promise.all)
