import mockPromise from './mockPromise'

/**
 * @template T
 * @param {Promise<T>} promise
 * @param {number} timeout
 */
const timeoutPromise = (promise, timeout) => {
  if (typeof timeout !== 'number') {
    throw new TypeError(
      'Must specify timeout argument when calling timeoutPromise()'
    )
  }

  return Promise.race([
    mockPromise(timeout, null, true),
    promise,
  ])
}

export default timeoutPromise
