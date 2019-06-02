/**
 * @file Utilities for checking a given object is really of type NewsItem.
 * Checks that the props are of the valid type, etc.
 */

/**
* @typedef {Error & { objResponse: any, type: string }} InvalidObjectSchemaError
* @typedef {import('../definitions').NewsItem} NewsItem
*/

/**
* @param {string} prop
* @param {string} expectedType
* @param {string} gotType
* @param {number} idx
*/
const errMsg = (prop, expectedType, gotType, idx) => `Bad property ${prop} received on news item from server/AsyncStorage, expected ${expectedType} got: ${gotType} at index ${idx} check the objResponse property on this error object to take a look at the object returned from the server/AsyncStorage`

/**
* @param {NewsItem} obj
* @param {number} i
* @param {ReadonlyArray<NewsItem>} arr
* @returns {boolean}
* @throws {InvalidObjectSchemaError}
*/
const isNewsItem = (obj, i, arr) => {
/**
* @type {InvalidObjectSchemaError|undefined}
*/
  let err
  if (typeof obj !== 'object') {
    err = Object.assign(
      new Error(
        `Expected an object for each item received in the array from the server/AsyncStorage, but got ${typeof obj} at index ${i} check the arrayResponse property on this error object to take a look at the whole array`
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
  if (typeof obj.contentBody !== 'string') {
    err = Object.assign(
      new Error(
        errMsg('contentBody', 'string', typeof obj.contentBody, i)
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

export default isNewsItem
