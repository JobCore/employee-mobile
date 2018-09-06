/**
 * @typedef {import('react').CSSProperties} CSSProperties
 */

/**
 * Names of CSS classes that we expect to find in the html passed into
 * <DetailsInfo /> and for which we have to define CSS properties.
 * @typedef {'title'} NewsItemClassName
 */


/**
 * @type {{ [k in NewsItemClassName]: CSSProperties }}
 */
const classCssProperties = {
  'title': {
    paddingLeft: 15,
    paddingRight: 15,
  },
}

export default classCssProperties
