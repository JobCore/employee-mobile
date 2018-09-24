import { PITAZO_SOUNDCLOUD_CLIENT_ID,
         PITAZO_SOUNDCLOUD_CLIENT_ALTID, 
         FETCH_TIMEOUT } from '../../../constants/config'
import timeoutFetch from '../../../utils/timeoutFetch'

/**
 * @typedef {import('./SoundcloudJSON').SoundcloudJSON} SoundcloudJSON
 */

/**
 * @param {string} clientId
 * @param {string} trackId
 * @returns {string}
 */
const buildFetchUrl = (clientId, trackId) => (
  `http://api.soundcloud.com/tracks/${trackId}?client_id=${clientId}`
)

/**
 * @param {SoundcloudJSON} json
 * @throws {Error}
 */
const checkSoundcloudJson = (json) => {
  if (typeof json !== 'object') {
    throw new Error(
      `Soundcluod json isnt an object, instead got: ${typeof json}`
    )
  }

  const typeofartworkUrl = typeof json.artwork_url

  if (typeofartworkUrl === 'undefined') {
    throw new Error(
      'Soundcloud json response artwork_url is undefined'
    )
  }

  if (typeofartworkUrl !== null && typeofartworkUrl !== 'string') {
    throw new Error(
      `Soundcloud json response artwork_url isn't string or null, instead got: ${typeofartworkUrl}`
    )
  }

  if (typeof json.original_format !== 'string') {
    throw new Error(
      `Soundcloud json response field original_format isn't string, instead got: ${typeof json.original_format}`
    )
  }

  if (typeof json.stream_url !== 'string') {
    throw new Error(
      `Soundcloud json response field stream_url isn't string, instead got: ${typeof json.stream_url}`
    )
  }

  if (typeof json.title !== 'string') {
    throw new Error(
      `Soundcloud json response field title isn't string, instead got: ${typeof json.title}`
    )
  }

  if (typeof json.duration !== 'number') {
    throw new Error(
      `Soundcloud json response field duration isn't a number, instead got: ${typeof json.duration}`
    )
  }
}

/**
 * @param {string} srcUrl
 * @returns {string}
 */
export const extractTrackIdFromIframeSrc = (srcUrl) => {
  const searchStr = 'api.soundcloud.com/tracks/'
  const start = srcUrl.indexOf(searchStr) + searchStr.length
  const end = srcUrl.indexOf('&amp', start)

  return srcUrl.slice(start, end)
}

/**
 * @param {string} trackId
 * @returns {Promise<SoundcloudJSON>}
 */
export const fetchSoundcloudJson = async (trackId) => {
  const primaryJson = timeoutFetch(
    buildFetchUrl(PITAZO_SOUNDCLOUD_CLIENT_ID, trackId),
    FETCH_TIMEOUT
  )
    .then(res => res.json())

  const secondJson = timeoutFetch(
    buildFetchUrl(PITAZO_SOUNDCLOUD_CLIENT_ALTID, trackId),
    FETCH_TIMEOUT
  )
    .then(res => res.json())

  const json1 = await primaryJson
  const json2 = await secondJson

  const chosenJson = Object.keys(json1) > Object.keys(json2)
    ? json1
    : json2

  checkSoundcloudJson(chosenJson)

  return chosenJson
}
