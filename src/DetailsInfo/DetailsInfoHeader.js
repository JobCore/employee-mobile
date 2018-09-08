import React from 'react'
import { StatusBar, TouchableOpacity, Image } from 'react-native'
import { Header, Left, Body } from 'native-base'

import { PITAZO_RED } from '../constants/colors'

import styles from './style'

/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 */

/**
 * @typedef {object} HeaderRightProps
 * @prop {boolean} isLoadingFavorite
 * @prop {() => void} onPressFav
 * @prop {() => void} onPressShare
 */

/**
 * @typedef {object} DetailsInfoHeaderProps
 * @prop {NavigationScreenProp} navigation
 * @prop {(React.SFC<{}>)=} Right
 */

/**
 * @type {React.SFC<DetailsInfoHeaderProps>}
 */
const DetailsInfoHeader = ({ navigation, Right }) => (
  <Header
    androidStatusBarColor={PITAZO_RED}
    style={styles.header}
    iosBarStyle="light-content"
  >
    <StatusBar
      backgroundColor={PITAZO_RED}
      barStyle="light-content"
    />
    <Left>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Image
        // @ts-ignore
          source={require('../assets/img/return.png')}
        />
      </TouchableOpacity>
    </Left>

    <Body>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(HOME_SCREEN_ROUTE)
        }}
      >
        <Image
          // @ts-ignore
          source={require('../assets/img/logo.png')}
          style={styles.headerImage}
        />
      </TouchableOpacity>
    </Body>

    {
      Right
        ? <Right />
        : null
    }
  </Header>
)

export default DetailsInfoHeader
