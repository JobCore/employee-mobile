/**
 * @typedef {import('./InstagramJSON').InstagramJSON} InstagramJSON
 */

/**
 * @param {string} url
 * @returns {Promise<InstagramJSON>}
 */
export const fetchInstagramJSON = url =>
  fetch(`https://api.instagram.com/oembed?url=${url}`)
    .then(res => res.json())
