import { paginatedUrlBuilder } from '../constants/urls'
import { FETCH_TIMEOUT } from '../constants/config'

import rawToNewsItem from './rawToNewsItem'
import isRawNewsItem from './isRawNewsItem'
import timeoutFetch from './timeoutFetch'
import timeoutPromise from './timeoutPromise';

/**
 * @typedef {import('../definitions').RawNewsItem} RawNewsItem
 * @typedef {import('../definitions').NewsItem} NewsItem
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
*
* @param {string} url
* @throws {Error}
*/
export const baseFetcher = async (url) => {
  const response = await fetch(url)

  if (response.status === 400) {
    throw new Error('BAD_PARAMETER')
  }

  if (response.status === 404) {
    throw new Error(`404 URL DOESNT EXISTS URL GIVEN: ${url}`)
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

  const correctArrayTypes = items.every(isRawNewsItem)

  if (!correctArrayTypes) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error(
        `BAD_OBJECT_TYPE_RESPONSE error, json received: ${JSON.stringify(items)}`
      )
    }
    throw new Error('BAD_OBJECT_TYPE_RESPONSE')
  }

  return items.map(rawToNewsItem)
}

/**
 *
 * @param {string} url
 * @returns {(pageNumber: number) => Promise<NewsItem[]>}
 */
export const buildPaginatedUrlFetcher = url =>
  pageNumber =>
    timeoutPromise(
      baseFetcher(paginatedUrlBuilder(url, pageNumber)),
      FETCH_TIMEOUT
    )
