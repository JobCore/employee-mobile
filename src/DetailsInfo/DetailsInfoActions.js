import { insert, replace } from 'ramda'
import moment from 'moment'
/**
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

/**
 * @param {NewsItem} newsItem
 */
export const htmlProcess = ({ category, contentBody: html, date, title }) => {
  html = replace(/<strong>/g, '', html)
  html = replace(/<\/strong>/g, '', html)
  // photo caption
  html = replace("<p class=\"wp-caption-text\"", '<p photocaption="true"', html)
  const indexOfOpeningTag = html.indexOf('<img')
  const indexOfClosingTag = html.indexOf('>', indexOfOpeningTag)
  const titleTag =
    `<title text="${title}" category="${category.toUpperCase()}"></title>`
  const dateTag =
    `<date formatted="${moment(date).locale('es').format('lll')}"></date>`
  if (indexOfOpeningTag === -1) {
    return titleTag.concat(dateTag).concat(html)
  }


  // @ts-ignore
  return insert(indexOfClosingTag + 1, titleTag.concat(dateTag), html).join('')
}
