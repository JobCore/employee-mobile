import React from 'react'
import { Image, ImageBackground, Linking, TouchableOpacity } from 'react-native'

import styles from './styles'


/**
 * @typedef {object} YoutubeProps
 * @prop {string} id
 */

/**
 * @param {string} id
 * @returns {void}
 */
const onPress = (id) => {
  const url = `https://www.youtube.com/watch?v=${id}`

  Linking
    .canOpenURL(url)
    .then((isSupported) => {
      if (isSupported) {
        Linking.openURL(url)
      } else {
        // eslint-disable-next-line no-lonely-if
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.warn(
            `Youtube URL not supported: ${url}`
          )
        }
      }
    })
    .catch(() => {})
}


/**
 * @type {React.SFC<YoutubeProps>}
 */
const Youtube = ({ id }) => (
  <TouchableOpacity
    onPress={onPress.bind(null, [id])}
  >
    <ImageBackground
      source={{
        uri: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      }}
      style={styles.imageBackground}
    >
      <Image
        // @ts-ignore
        source={require('../../../assets/img/youtube.png')}
        style={styles.icon}
      />
    </ImageBackground>
  </TouchableOpacity>
)

export default Youtube
