import React from 'react'
import { Image, View } from 'react-native'

import styles from './style'
import Instagram from './embeds/Instagram'
import Soundcloud from './embeds/Soundcloud'
import Tweet from './embeds/Tweet'

/**
 * @typedef {'img'|'instagram'|'soundcloud'|'twitter'} TagName
 */

/**
 * @typedef {object} Attribs
 * @prop {string} src For images
 * @prop {string} url For tweets, instagram and soundcloud
 */

/**
 * @typedef {(attribs: Attribs) => React.ReactElement<any>} Renderer
 */


/**
 * @type {{ [k in TagName]: Renderer }}
 */

const renderers = {
  img: ({ src }) => (
    <View
      style={styles.imageView}
    >
      <Image
        source={{
          uri: src,
        }}
        style={styles.image}
      />
    </View>
  ),
  instagram: ({ url }) => (
    <Instagram
      url={url}
    />
  ),
  soundcloud: ({ url }) => (
    <Soundcloud
      url={url}
    />
  ),
  twitter: ({ url }) => (
    <Tweet
      url={url}
    />
  )
}

export default renderers
