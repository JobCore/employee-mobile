import React from 'react'
import { Image, View, Text } from 'react-native'

import styles from './style'

/**
 * HTML Tag names for which we are going to implement renderers
 * @typedef {'img'|'twitter'} TagName
 */

/**
 * @typedef {object} HtmlAttribs
 * @prop {string} src For images
 */

/**
 * @typedef {(htmlAttribs: HtmlAttribs) => JSX.Element} Renderer
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
  twitter: ({ url }) => (
    <Text>
      {url}
    </Text>
  )
}

export default renderers
