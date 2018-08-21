import { buildLatestNewsUrl, buildMostSeenUrl,
         buildRegionsNewsUrl } from '../constants/urls'

/**
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

/**
 * News item as it comes from the server, with a 'content-body' prop instead of
 * 'contentBody'
 * @typedef {Pick<NewsItem, Exclude<keyof NewsItem, 'contentBody'>> & { 'content-body': string }} RawNewsItem
 */


/**
 * Expected server response when there's parameter error.
 * HTTP header status=400
 * @typedef {{ error: string , message: string }} ParameterErrorServerResponse
 */

/**
 * Expected server response when there's no communication with elpitazo
 * HTTP header status=200 (OK response but an empty array)
 * @typedef {never[]} EmptyServerResponse
 */

/**
 * @typedef {Error & { objResponse: any, type: string }} InvalidObjectSchemaError
 */

/**
 * @param {string} prop
 * @param {string} expectedType
 * @param {string} gotType
 * @param {number} idx
 */
const errMsg = (prop, expectedType, gotType, idx) => `Bad property ${prop} received on news item from server, expected ${expectedType} got: ${gotType} at index ${idx} check the objResponse property on this error object to take a look at the object returned from the server`

/**
 * @param {RawNewsItem} obj
 * @param {number} i
 * @param {ReadonlyArray<RawNewsItem>} arr
 * @returns {boolean}
 * @throws {InvalidObjectSchemaError}
 */
const isNewsItem = (obj, i, arr) => {
  
  /**
   * @type {InvalidObjectSchemaError|undefined}
   */
  let err = undefined
  if (typeof obj !== 'object') {
    err = Object.assign(
      new Error(
       `Expected an object for each item received in the array from the server, but got ${typeof obj} at index ${i} check the arrayResponse property on this error object to take a look at the whole array`
      ),
      {
        objResponse: arr,
        type: 'InvalidObjectSchemaError',
      }
    )
  }
  if (typeof obj.id !== 'number') {
    err = Object.assign(
      new Error(
        errMsg('id', 'number', typeof obj.id, i)
      ),
      {
        objResponse: obj,
        type: 'InvalidObjectSchemaError',
      }
    )
  }
  if (typeof obj.title !== 'string') {
    err = Object.assign(
      new Error(
        errMsg('title', 'string', typeof obj.title, i)
      ),
      {
        objResponse: obj,
        type: 'InvalidObjectSchemaError',
      }
    )
  }
  if (typeof obj.image !== 'string') {
    err = Object.assign(
      new Error(
        errMsg('image', 'string', typeof obj.image, i)
      ),
      {
        objResponse: obj,
        type: 'InvalidObjectSchemaError',
      }
    )
  }
  if (typeof obj.date !== 'string') {
    err = Object.assign(
      new Error(
        errMsg('date', 'string', typeof obj.date, i)
      ),
      {
        objResponse: obj,
        type: 'InvalidObjectSchemaError',
      }
    )
  }
  if (typeof obj.link !== 'string') {
    err = Object.assign(
      new Error(
        errMsg('link', 'string', typeof obj.link, i)
      ),
      {
        objResponse: obj,
        type: 'InvalidObjectSchemaError',
      }
    )
  }
  if (typeof obj.category !== 'string') {
    err = Object.assign(
      new Error(
        errMsg('category', 'string', typeof obj.category, i)
      ),
      {
        objResponse: obj,
        type: 'InvalidObjectSchemaError',
      }
    )
  }
  if (typeof obj['content-body'] !== 'string') {
    err = Object.assign(
      new Error(
        errMsg('content-body', 'string', typeof obj['content-body'], i)
      ),
      {
        objResponse: obj,
        type: 'InvalidObjectSchemaError',
      }
    )
  }
  if (err) {
    throw err
  }
  return true
}


/**
 * Maps a RawNewsItem to a NewsItem
 * @param {RawNewsItem} rawNewsItem
 * @returns {NewsItem}
 */
const rawToNewsItem = rawNewsItem => Object.assign({}, rawNewsItem, {
  // REPLACE THIS WHEN PRODUCTION SERVER WILL BE USED
  contentBody: rawNewsItem['content-body'].replace('https://', 'http://'),
  // REPLACE THIS WHEN PRODUCTION SERVER WILL BE USED
  image: rawNewsItem.image.replace('https://', 'http://'),
})

/**
 * 
 * @param {string} url
 * @throws {Error}
 */
const baseFetcher = async (url) => {
  const response = await fetch(url)

  if (response.status === 400) {
    throw new Error('BAD_PARAMETER')
  }

  if (response.status !== 200) {
    throw new Error('NON_OK_RESPONSE')
  }

  /**
   * @type {RawNewsItem[]}
   */
  const items = await response.json()

  if (!Array.isArray(items)) {
    throw new Error('NON_ARRAY_RESPONSE')
  }

  const correctArrayTypes = items.every(isNewsItem)

  if (!correctArrayTypes) {
    if (__DEV__) {
      console.error(
        `BAD_OBJECT_TYPE_RESPONSE error, json received: ${JSON.stringify(items)}`
      )
    }
    throw new Error('BAD_OBJECT_TYPE_RESPONSE')
  }

  return items.map(rawToNewsItem)
}

/**
 * Fetch page n of latest news
 * @param {number} pageNumber A page number between 1 and MAX_SAFE_INTEGER - 1
 * @returns {Promise<NewsItem[]>}
 */
export const fetchLatestNews = async (pageNumber) => {
  const url = buildLatestNewsUrl(pageNumber)

  return baseFetcher(url)
}

/**
 * Fetch page n of region news
 * @param {number} pageNumber A page number between 1 and MAX_SAFE_INTEGER - 1
 * @returns {Promise<NewsItem[]>}
 */
export const fetchRegionNews = async (pageNumber) => {
  const url = buildRegionsNewsUrl(pageNumber)

  return baseFetcher(url)
}

/**
 * @param {number} limitItems Limit number of items to fetch to this number.
 * Must be a positive integer between 1 and MAX_SAFE_INTEGER - 1
 * @returns {Promise<NewsItem[]>}
 */
export const fetchMostSeenNews = async (limitItems) => {
  const url = buildMostSeenUrl(limitItems)

  return baseFetcher(url)
}
