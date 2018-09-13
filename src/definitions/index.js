/**
 * @file This file contains type definitions which don't belong in any other
 * specific file. If this were a typescript-files project, we'd have a file
 * exporting interfaces, however, here we are leveraging typescript's support of
 * JSDoc including importing JSDoc typedefs from other files.
 * @author danlugo92
 */

/**
 * News item as it comes from the server, with a 'content-body' prop instead of
 * 'contentBody'
 * @typedef {Pick<NewsItem, Exclude<keyof NewsItem, 'contentBody'>> & { 'content-body': string }} RawNewsItem
 */

/**
 * An object representing an individual news item as obtained from the API.
 * @typedef {object} NewsItem
 * @prop {number} id
 * @prop {{ name: string }} author
 * @prop {string} title
 * @prop {string} image Url for banner image, can be an emptyString
 * @prop {string} date
 * @prop {string} link
 * @prop {string} category
 * @prop {string} contentBody
 */


/**
 * @typedef {import('react-navigation').NavigationScreenProp<{routeName: string}>} NavigationScreenProp
 */

// keeps off typscript and eslint from buggin
export default {}
