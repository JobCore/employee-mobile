/**
 * @file This file contains type definitions which don't belong in any other
 * specific file. If this were a typescript-files project, we'd have a file 
 * exporting interfaces, however, here we are leveraging typescript's support of
 * JSDoc including importing JSDoc typedefs from other files.
 * @author danlugo92
 */

/**
 * An object representing an individual news item as obtained from the API.
 * @typedef {object} NewsItem
 * @prop {number} id
 * @prop {string} title
 * @prop {string} image Url for banner image, can be an emptyString
 * @prop {Date} date
 * @prop {string} link
 * @prop {string} category
 * @prop {string} contentBody
 */

/**
 * Navigation state for react-navigation.
 * @typedef {{}} NavigationState
 */

// keeps off typscript and eslint from buggin
export default {}
