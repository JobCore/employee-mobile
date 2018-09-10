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
 * @typedef {object} SettingsHeaderProps
 * @prop {NavigationScreenProp} navigation
 */


/**
 * @type {React.SFC<SettingsHeaderProps>}
 */
const SettingsHeader = ({ navigation }) => (
  <Header
    androidStatusBarColor={PITAZO_RED}
    style={styles.header}
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
        style={styles.headerText}
      >
        Ajustes
      </Text>
    </Left>
  </Header>
)

export default SettingsHeader
