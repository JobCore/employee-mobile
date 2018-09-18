import React from 'react'

import { Header, Left, Button, Body, Right } from 'native-base'
import { Image } from 'react-native'

import { PITAZO_RED } from '../constants/colors'
import { OFFLINE_CONTENT_DOWNLOAD_ROUTE } from '../constants/routes'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 */

import styles from './style'


/**
 * @typedef {object} HomeScreenHeaderProps
 * @prop {NavigationScreenProp} navigation
 */


/**
 * @type {React.SFC<HomeScreenHeaderProps>}
 */
const HomeScreenHeader = ({ navigation }) => (
  <Header
    androidStatusBarColor={PITAZO_RED}
    style={styles.header}
    iosBarStyle="light-content"
    noShadow
  >
    <Left>
      <Button
        onPress={() => navigation.toggleDrawer()}
        transparent
      >
        <Image
          // @ts-ignore
          source={require('../assets/img/menu.png')}
        />
      </Button>
    </Left>
    <Body>
      <Image
        // @ts-ignore
        source={require('../assets/img/logo.png')}
        style={styles.image}
      />
    </Body>
    <Right>
      <Button
        onPress={() => {
          navigation.navigate(OFFLINE_CONTENT_DOWNLOAD_ROUTE)
        }}
        transparent
      >
        <Image
          // @ts-ignore
          source={require('../assets/img/download.png')}
        />
      </Button>
    </Right>
  </Header>
)

export default HomeScreenHeader
