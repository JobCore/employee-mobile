/* eslint-disable no-param-reassign */
/* eslint-disable operator-linebreak */
import { insert, replace } from 'ramda'
import moment from 'moment'
import 'moment/locale/es' // https://github.com/jalaali/moment-jalaali/issues/142
/**
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

/**
 * @param {NewsItem} newsItem
 */
export const htmlProcess = ({
  author: { name: authorName },
  category,
  contentBody: html,
  date,
  title,
}) => {
  html = replace(/<strong>/g, '', html)
  html = replace(/<\/strong>/g, '', html)
  // photo caption
  html = replace('<p class="wp-caption-text"', '<p photocaption="true"', html)
  const indexOfOpeningTag = html.indexOf('<img')
  const indexOfClosingTag = html.indexOf('>', indexOfOpeningTag)
  const authorTag = `<author name="${authorName}"></author>`
  const titleTag =
    `<title text="${title}" category="${category.toUpperCase()}"></title>`
  const dateTag =
    `<date formatted="${moment(date).locale('es').format('lll')}"></date>`
  if (indexOfOpeningTag === -1) {
    return titleTag.concat(dateTag).concat(authorTag).concat(html)
  }


  // @ts-ignore
  return insert(indexOfClosingTag + 1, titleTag.concat(dateTag).concat(authorTag), html).join('')
}
