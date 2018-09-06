import React from 'react'

import { Button } from 'native-base'
import { Linking, Text, View } from 'react-native'

import { TWITTER_VERIFIED_BLUE } from '../../constants/colors'

import styles from './style'

/**
 * @typedef {object} TweetProps
 * @prop {string} url
 */

/**
 * @type {React.SFC<TweetProps>}
 */
const Tweet = ({ url }) => (
  <View
    style={styles.tweetView}
  >
    <Button
      color={TWITTER_VERIFIED_BLUE}
      onPress={() => {
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url)
          }
          if (__DEV__) {
            throw new Error(
              `React native's Linking reports not being able to open this tweet's url, found url: ${url}`
            )
          }
        });
      }}
    >
      <Text>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Ir a tweet de @{url.slice(url.indexOf('.com/') + 5, url.indexOf('/status'))}
      </Text>
    </Button>
  </View>
)

export default Tweet
