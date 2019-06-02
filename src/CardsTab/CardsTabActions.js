import { buildLatestNewsUrl, buildMostSeenUrl,
         buildRegionsNewsUrl } from '../constants/urls'
import { baseFetcher } from '../utils/fetchers'


/**
* @typedef {import('../definitions').NewsItem} NewsItem
*/


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
