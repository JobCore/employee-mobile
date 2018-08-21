/**
 * @file Ideally these URLs should be set through environment variables however
 * react native doesn't offer a built in way to pass them in.
 * We might try:
 * https://www.npmjs.com/package/babel-plugin-transform-inline-environment-variables
 * In the future.
 * We also export builder functions to error-check and correctly build paginated
 * /limited urls to be used elsewhere.
 * @author danlugo92
 */

const BASE = 'https://elpitazo-api.cobuildlab.com/portal'

/**
 * Url pointing to JSON data representing the latest news.
 * Paginated through GET parameter `page`. Key=`page` Value={positive integer}
 * @type {string}
 */
const LATEST_URL = `${BASE}/last`

/**
 * Url pointing to JSON data representing the news of the "REGIONS" category.
 * Paginated through GET parameter `page`. Key=`page` Value={positive integer}
 * @type {string}
 */
const REGIONS_URL = `${BASE}/regions`

/**
 * Url pointing to JSON data representing news with the most views.
 * Non-paginated.
 * Limitable through GET parameter `limit`. Key=`limit` Value={positive integer}
 * @type {string}
 */
const MOST_SEEN_URL = `${BASE}/mostseen`


/**
 * Construct a valid latest news url.
 * @param {number} pageNumber A page number between 1 and MAX_SAFE_INTEGER - 1
 * @returns {string} A valid latest news url to be passed to fetch()
 */
export const buildLatestNewsUrl = (pageNumber) => {
  if (!Number.isInteger(pageNumber)) {
    throw new TypeError(
      'Page number argument must be an integer'
    )
  }
  if (pageNumber < 1 || pageNumber > Number.MAX_SAFE_INTEGER - 1) {
    throw new RangeError(
      'Page number argument outside of boundaries, must be a positive integer between 1 and MAX_SAFE_INTEGER - 1'
    )
  }

  return `${LATEST_URL}?page=${pageNumber}`
}

/**
 * Construct a valid regions url.
 * @param {number} pageNumber A page number between 1 and MAX_SAFE_INTEGER - 1
 * @returns {string} A valid regions news url to be passed to fetch()
 */
export const buildRegionsNewsUrl = (pageNumber) => {
  if (!Number.isInteger(pageNumber)) {
    throw new TypeError(
      'Page number argument must be an integer'
    )
  }
  if (pageNumber < 1 || pageNumber > Number.MAX_SAFE_INTEGER - 1) {
    throw new RangeError(
      'Page number argument outside of boundaries, must be a positive integer between 1 and MAX_SAFE_INTEGER - 1'
    )
  }

  return `${REGIONS_URL}?page=${pageNumber}`
}

/**
 * Construct a valid most seen url.
 * @param {number} limitItems Limit number of items to fetch to this number.
 * Must be a positive integer between 1 and MAX_SAFE_INTEGER - 1
 * @returns {string} A valid most seen news url to be passed to fetch()
 */
export const buildMostSeenUrl = (limitItems) => {
  if (!Number.isInteger(limitItems)) {
    throw new TypeError(
      'Page number argument must be an integer'
    )
  }
  if (limitItems < 1 || limitItems > Number.MAX_SAFE_INTEGER - 1) {
    throw new RangeError(
      'Page number argument outside of boundaries, must be a positive integer between 1 and MAX_SAFE_INTEGER - 1'
    )
  }

  return `${MOST_SEEN_URL}?limit=${limitItems}`
}
