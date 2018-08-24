/**
 * @file Ideally base URL should be set through environment variables however
 * react native doesn't offer a built in way to pass them in.
 * We might try:
 * https://www.npmjs.com/package/babel-plugin-transform-inline-environment-variables
 * In the future.
 * We also export builder functions to error-check and correctly build paginated
 * /limited urls to be used elsewhere.
 * @author danlugo92
 */

const BASE = 'https://elpitazo-api.cobuildlab.com'

/**
 * Url pointing to JSON data representing the latest news.
 * Paginated through GET parameter `page`. Key=`page` Value={positive integer}
 * @type {string}
 */
const LATEST_URL = `${BASE}/portal/last`

/**
 * Url pointing to JSON data representing the news of the "REGIONS" category.
 * Paginated through GET parameter `page`. Key=`page` Value={positive integer}
 * @type {string}
 */
const REGIONS_URL = `${BASE}/portal/regions`

/**
 * Url pointing to JSON data representing news with the most views.
 * Non-paginated.
 * Limitable through GET parameter `limit`. Key=`limit` Value={positive integer}
 * @type {string}
 */
const MOST_SEEN_URL = `${BASE}/portal/mostseen`


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
      'limitItems argument must be an integer'
    )
  }
  if (limitItems < 1 || limitItems > Number.MAX_SAFE_INTEGER - 1) {
    throw new RangeError(
      'limitItems argument outside of boundaries, must be a positive integer between 1 and MAX_SAFE_INTEGER - 1'
    )
  }

  return `${MOST_SEEN_URL}?limit=${limitItems}`
}


/**
 * A paginated url build constructs a valid url for a given paginated API
 * endpoint.
 * @param {string} url Url for API endpoint, assumes no other parameter than
 * page
 * @param {number} pageNumber A page number between 1 and MAX_SAFE_INTEGER - 1
 * @returns {string} A valid url to be passed to fetch()
 * @throws {TypeError} If the page number isn't provided or isn't a number
 * @throws {RangeError} If the page number is outside of the range specified
 * @typedef {(pageNumber: number) => string} PaginatedUrlBuilder
 */
export const paginatedUrlBuilder = (url, pageNumber) => {
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

  return `${url}?page=${pageNumber}`
}

// SIDEBAR URLS

const SIDEBAR_BASE = `${BASE}/sidebar`


// REGIONS

const REGION_BASE = `${SIDEBAR_BASE}/regions`

export const REGION_GRAN_CARACAS_URL = `${REGION_BASE}/gran-caracas`
export const REGION_CENTRO_URL = `${REGION_BASE}/centro`
export const REGION_GUAYANA_URL = `${REGION_BASE}/guayana`
export const REGION_LOS_ANDES_URL = `${REGION_BASE}/los-andes`
export const REGION_LOS_LLANOS_URL = `${REGION_BASE}/los-llanos`
export const REGION_OCCIDENTE_URL = `${REGION_BASE}/occidente`
export const REGION_ORIENTE_URL = `${REGION_BASE}/oriente`


// SECTIONS

const SECTIONS_BASE = `${SIDEBAR_BASE}/sections`

export const SECTION_SUCESOS_URL = `${SECTIONS_BASE}/sucesos`
export const SECTION_POLITICA_URL = `${SECTIONS_BASE}/politica`
export const SECTION_ECONOMIA_URL = `${SECTIONS_BASE}/economia`
export const SECTION_DEPORTES_URL = `${SECTIONS_BASE}/deportes`
export const SECTION_TECNOLOGIA_URL = `${SECTIONS_BASE}/tecnologia`
export const SECTION_INTERNACIONAL_URL = `${SECTIONS_BASE}/internacional`
export const SECTION_SALUD_URL = `${SECTIONS_BASE}/salud`
export const SECTION_REPORTAJES_URL = `${SECTIONS_BASE}/reportajes`
export const SECTION_OPINION_URL = `${SECTIONS_BASE}/opinion`
export const SECTION_MIGRACION_URL = `${SECTIONS_BASE}/migracion`
export const SECTION_MAS_NOTICIAS_URL = `${SECTIONS_BASE}/mas-noticias`


// RESTFUL

const RESTFUL_BASE = `${SIDEBAR_BASE}/restful`

export const RESTFUL_INVESTIGACIONES_URL = `${RESTFUL_BASE}/investigaciones`
export const RESTFUL_EL_PITAZO_EN_LA_CALLE_URL = `${RESTFUL_BASE}/pitazo-en-la-calle`
export const RESTFUL_ALIANZAS_URL = `${RESTFUL_BASE}/alianzas`


// MEDIA

const MEDIA_BASE = `${SIDEBAR_BASE}/media`

export const MEDIA_FOTOGALERIAS_URL = `${MEDIA_BASE}/fotogalerias`
export const MEDIA_VIDEOS_URL = `${MEDIA_BASE}/videos`
export const MEDIA_INFOGRAFIAS_URL = `${MEDIA_BASE}/infografias`


export const RADIO_URL = `${SIDEBAR_BASE}/radio`

export const ABOUT_US_URL = `${SIDEBAR_BASE}/about-us`
