import React from 'react'

import { Body, Header, Icon, Left } from 'native-base'
import { Image } from 'react-native'

import { PITAZO_RED } from '../constants/colors'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 */

import styles from './style'


/**
 * @type {React.SFC<{navigation: NavigationScreenProp}>}
 */
const OfflineScreenHeader = ({ navigation }) => (
  <Header
    androidStatusBarColor={PITAZO_RED}
    style={styles.header}
    iosBarStyle="light-content"
    noShadow
  >
    <Left>
      <Icon
        name="md-arrow-back"
        android="md-arrow-back"
        ios="md-arrow-back"
        onPress={() => {
          navigation.goBack()
        }}
      />
    </Left>
    <Body>
      <Image
        // @ts-ignore
        source={require('../assets/img/logo.png')}
        style={styles.image}
      />
    </Body>
  </Header>
)

export default OfflineScreenHeader
