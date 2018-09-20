import { FETCH_TIMEOUT, ASYNC_STORAGE_TIMEOUT } from '../../../constants/config'
import timeoutFetch from '../../../utils/timeoutFetch'
import { getItem, setItem } from '../../../utils/StorageTimeout'


const TWEET_HEIGHT_STORAGE_PREFIX = 'TWEET_HEIGHT:'


/**
 * @param {string} url
 * @returns {Promise<string>}
 */
export const fetchTweetHTML = url =>
  timeoutFetch(
    // language spanish
    // omit script as we have it in tweet-js
    `https://publish.twitter.com/oembed?lang=es&url=${url}`,
    FETCH_TIMEOUT
  )
    .then(res => res.json())
    .then(res => res.html)
    .then((htmlOrUndef) => {
      if (typeof htmlOrUndef !== 'string') {
        throw new Error()
      }
      return htmlOrUndef
    })


/**
 * Sometimes react native caches the webview, and wont execute the injected
 * script. Which will show the webview at default height. We need to cache
 * the height for a given tweet after getting it the first time (when the
 * injected script is actually executed) and pass it as the default height.
 * @param {string} url
 * @returns {Promise<string|null>}
 */
export const fetchTweetHeightFromCache = url =>
  getItem(TWEET_HEIGHT_STORAGE_PREFIX + url, ASYNC_STORAGE_TIMEOUT)

/**
 * Saves a computed height for a tweet in AsyncStorage
 * @param {string} url Url of the tweet
 * @param {number} height Height computed by script injected to
 * <AutoHeightWebView />
 */
export const saveTweetHeightToCache = (url, height) =>
  setItem(
    TWEET_HEIGHT_STORAGE_PREFIX + url,
    height.toString(10),
    ASYNC_STORAGE_TIMEOUT
  )
