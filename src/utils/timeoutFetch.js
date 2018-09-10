import mockPromise from './mockPromise'

/**
 * Fetch with timeout, as simply as that.
 * @param {string} url
 * @param {number} timeout
 */
const timeoutFetch = (url, timeout) => {
  if (typeof timeout !== 'number') {
    throw new TypeError(
      'Must specify timeout argument when calling timeoutFetch()'
    )
  }

  return Promise.race([
    mockPromise(timeout, null, true),
    fetch(url),
  ])
}

export default timeoutFetch
