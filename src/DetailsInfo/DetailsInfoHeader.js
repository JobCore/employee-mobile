import React from 'react'
import { StatusBar, TouchableOpacity, Image } from 'react-native'
import { Header, Left, Body, Right } from 'native-base'

import { PITAZO_RED } from '../constants/colors'
import { HOME_SCREEN_ROUTE } from '../constants/routes'

import styles from './style'

/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 */


/**
 * @typedef {object} DetailsInfoHeaderProps
 * @prop {boolean} isFavorite
 * @prop {boolean} isLoadingFavorite
 * @prop {NavigationScreenProp} navigation
 * @prop {() => void} onPressFav
 * @prop {() => void} onPressShare
 */

/**
 * @type {React.SFC<DetailsInfoHeaderProps>}
 */
const DetailsInfoHeader = ({
  isFavorite,
  isLoadingFavorite,
  navigation,
  onPressFav,
  onPressShare,
}) => (
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

    <Right>
      <TouchableOpacity
        style={styles.favButtonTouchOpac}
        onPress={onPressFav}
      >
        {
          isFavorite
            ? (
              <Image
                // @ts-ignore
                source={require('../assets/img/sideBarFavIcon.png')}
                style={isLoadingFavorite ? styles.favBtnIsLoadingFav : null}
              />
            )
            : (
              <Image
                // @ts-ignore
                source={require('../assets/img/favoriteUnselected.png')}
                style={isLoadingFavorite ? styles.favBtnIsLoadingFav : null}
              />
            )
        }
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onPressShare}
        style={styles.buttonRight}
      >
        <Image
          // @ts-ignore
          source={require('../assets/img/share.png')}
        />
      </TouchableOpacity>
    </Right>
  </Header>
)

export default DetailsInfoHeader
