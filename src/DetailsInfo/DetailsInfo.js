import React from 'react'

import { Container } from 'native-base'
import { Image, TouchableOpacity } from 'react-native'
import HTML from 'react-native-render-html'

import styles from './style'

/**
 * @template T
 * @typedef {import('react').SFC<T>} SFC
 */

/**
 * @template T, O, S
 * @typedef {import('react-navigation').NavigableComponent<T, O, S>} NavigableComponent
 */

/**
 * @typedef {object} DetailsInfoProps
 * @prop {string} htmlContent News item html to be rendered. This html can have
 * special <youtube> tags to be rendered natively
 */


/**
 * An individual news item spanning a whole screen.
 * @type {SFC<DetailsInfoProps>}
 */
const DetailsInfo = props => (
  <Container>
    <HTML html={props.htmlContent} />
  </Container>
)

DetailsInfo.navigationOptions = {
  title: 'Noticia',
  headerRight: (
    <TouchableOpacity style={styles.buttonRight}>
      <Image
        source={require('../assets/img/share.png')}
        style={styles.navRight}
      />
    </TouchableOpacity>
  ),
}

export default DetailsInfo
