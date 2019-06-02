/**
 * @typedef {import('../definitions').RawNewsItem} RawNewsItem
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

/**
 * Maps a RawNewsItem to a NewsItem
 * @param {RawNewsItem} rawNewsItem
 * @returns {NewsItem}
 */
const rawToNewsItem = rawNewsItem => Object.assign({}, rawNewsItem, {
  // REPLACE THIS WHEN PRODUCTION SERVER WILL BE USED
  contentBody: rawNewsItem['content-body'].replace('https://', 'http://'),
  // REPLACE THIS WHEN PRODUCTION SERVER WILL BE USED
  image: rawNewsItem.image.replace('https://', 'http://'),
  'content-body': undefined, // lighten up the object
})

export default rawToNewsItem
