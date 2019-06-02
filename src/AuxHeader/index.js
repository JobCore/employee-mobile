import React from 'react'

import { Left, Header, Text } from 'native-base'
import { Image, StatusBar, TouchableOpacity } from 'react-native'

import { PITAZO_RED } from '../constants/colors'
import { HOME_SCREEN_ROUTE } from '../constants/routes'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 */

import styles from './style'


/**
 * @typedef {object} AuxHeaderProps
 * @prop {NavigationScreenProp} navigation
 * @prop {string} leftText Text to render besides the back button
 */


/**
 * @type {React.SFC<AuxHeaderProps>}
 */
const AuxHeader = ({ navigation, leftText }) => (
  <Header
    androidStatusBarColor={PITAZO_RED}
    style={styles.root}
    iosBarStyle="light-content"
  >
    <StatusBar
      backgroundColor={PITAZO_RED}
      barStyle="light-content"
    />
    <Left
      style={styles.left}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(HOME_SCREEN_ROUTE)
        }}
      >
        <Image
          // @ts-ignore
          source={require('../assets/img/return.png')}
        />
      </TouchableOpacity>
      <Text
        style={styles.leftText}
      >
        {leftText}
      </Text>
    </Left>
  </Header>
)

export default AuxHeader
