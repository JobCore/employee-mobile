/**
 * @typedef {import('react').CSSProperties} CSSProperties
 */

/**
 * Names of CSS classes that we expect to find in the html passed into
 * <DetailsInfo /> and for which we have to define CSS properties.
 * @typedef {'size-full'} NewsItemClassName
 */


/**
 * @type {{ [k in NewsItemClassName]: CSSProperties }}
 */
const classCssProperties = {
  'size-full': {

  },
}

export default classCssProperties
