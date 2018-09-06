import React from 'react'

import { Linking, Text, View } from 'react-native'
import { Button } from 'native-base'

import { SOUNDCLOUD_ORANGE } from '../../constants/colors'

import styles from './style'

/**
 * @typedef {object} SoundcloudProps
 * @prop {string} url
 */

/**
 * @type {React.SFC<SoundcloudProps>}
 */
const Soundcloud = ({ url }) => (
  <View
    style={styles.soundcloudView}
  >
    <Button
      color={SOUNDCLOUD_ORANGE}
      onPress={() => {
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url)
          }
          if (__DEV__) {
            throw new Error(
              `React native's Linking reports not being able to open this soundcloud url, found url: ${url}`
            )
          }
        })
      }}
    >
      <Text>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Escuchar Audio de Soundcloud en Navegador
      </Text>
    </Button>
  </View>
)

export default Soundcloud
