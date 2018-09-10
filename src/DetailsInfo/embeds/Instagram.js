import React from 'react'

import { Linking, Text, View } from 'react-native'
import { Button } from 'native-base'

import { INSTAGRAM_MAGENTA } from '../../constants/colors'

import styles from './style'

/**
 * @typedef {object} InstagramProps
 * @prop {string} url
 */

/**
 * @type {React.SFC<InstagramProps>}
 */
const Instagram = ({ url }) => (
  <View
    style={styles.soundcloudView}
  >
    <Button
      color={INSTAGRAM_MAGENTA}
      onPress={() => {
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url)
          }
          if (__DEV__) {
            throw new Error(
              `React native's Linking reports not being able to open this instagram url, found url: ${url}`
            )
          }
        })
      }}
    >
      <Text>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Ver post de instagram en navegador
      </Text>
    </Button>
  </View>
)

export default Instagram
