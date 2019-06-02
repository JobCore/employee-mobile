/**
 * Fake promise generator
 * @param {number} milliseconds Time in which the promise will resolve or reject
 * @param {any} resolveData Data with which the promise will resolve
 * @param {boolean=} fail Pass true to make the promise reject
 */
const mockPromise = (milliseconds, resolveData, fail) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject()
      } else {
        resolve(resolveData)
      }
    }, milliseconds)
  })

export default mockPromise
