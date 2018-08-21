/**
 * @typedef {import('react').CSSProperties} CSSProperties
 */

/**
 * @typedef {'p'} TagName
 */


/**
 * @type {{ [k in TagName]: CSSProperties }}
 */
const tagsCssProperties = {
  p: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'justify',
    paddingLeft: 15,
    paddingRight: 15,
  },
}

export default tagsCssProperties
