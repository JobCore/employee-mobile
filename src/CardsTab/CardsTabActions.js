import { buildLatestNewsUrl, buildRegionsNewsUrl, buildMostSeenUrl } from '../constants/urls'

/**
 * @typedef {import('../definitions').NewsItem} NewsItem
 */


/**
 * Fetch page n of latest news
 * @param {number} pageNumber A page number between 1 and MAX_SAFE_INTEGER - 1
 * @returns {Promise<NewsItem[]>}
 */
export const fetchLatestNews = (pageNumber) => {
  const url = buildLatestNewsUrl(pageNumber)
  return fetch(url)
    .then(response => response.json())
}

/**
 * Fetch page n of region news
 * @param {number} pageNumber A page number between 1 and MAX_SAFE_INTEGER - 1
 * @returns {Promise<NewsItem[]>}
 */
export const fetchRegionNews = (pageNumber) => {
  const url = buildRegionsNewsUrl(pageNumber)
  return fetch(url)
    .then(response => response.json())
}

/**
 * @param {number} limitItems Limit number of items to fetch to this number.
 * Must be a positive integer between 1 and MAX_SAFE_INTEGER - 1
 * @returns {Promise<NewsItem[]>}
 */
export const fetchMostSeenNews = (limitItems) => {
  const url = buildMostSeenUrl(limitItems)
  return fetch(url)
    .then(response => response.json())
}
