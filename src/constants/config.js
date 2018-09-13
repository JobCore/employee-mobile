/**
 * @type {number}
 */
export const MOST_SEEN_LIMIT = 20

/**
 * @type {number}
 */
export const ON_END_REACHED_TRESHOLD = 0.1

/**
 * Timeout in milliseconds when fetching data from the server.
 * @type {number}
 */
export const FETCH_TIMEOUT = 10000

/**
 * Timeout in milliseconds when fetching data from AsyncStorage
 * @type {number}
 */
export const ASYNC_STORAGE_TIMEOUT = 3000


/**
 * The offline content download takes more time than other usual downloads.
 * It downloads about 1.3MB in one go.
 * @type {number}
 */
export const OFFLINE_CONTENT_DOWNLOAD_TIMEOUT = 10000

/**
 * @type {string}
 */
export const PITAZO_SOUNDCLOUD_CLIENT_ID = 'Iy5e1Ri4GTNgrafaXe4mLpmJLXbXEfBR'

/**
 * Small font size setting for the individual article view.
 */
export const SMALL_FONT_SIZE = 12

/**
 * Medium font size setting for the individual article view.
 */
export const MEDIUM_FONT_SIZE = 16

/**
 * Small font size setting for the individual article view.
 */
export const LARGE_FONT_SIZE = 20

/**
 * @type {FontSize}
 */
export const DEFAULT_FONT_SIZE = MEDIUM_FONT_SIZE

/**
 * @typedef {typeof SMALL_FONT_SIZE|typeof MEDIUM_FONT_SIZE|typeof LARGE_FONT_SIZE} FontSize
 */
