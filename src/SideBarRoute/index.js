import React from 'react'

import { Text, View } from 'react-native'

/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 */

import SideBarRoute from './SideBarRoute'

/**
 * @param {{ navigation: NavigationScreenProp }} props
 * @returns {JSX.Element}
 */
const SideBarRouteRoute = ({ navigation }) => {
  const paginatedURL = navigation.getParam('paginatedURL')

  if (typeof paginatedURL !== 'string') {
    if (__DEV__) {
      throw new Error(
        `Expected paginatedUrl navigation parameter passed to /SideBar to be an string, instead got: '${typeof paginatedURL}'`
      )
    }

    return (
      <View>
        <Text>
          Error de url
        </Text>
      </View>
    )
  }

  return (
    <SideBarRoute
      paginatedURL={paginatedURL}
      navigation={navigation}
    />
  )
}

export default SideBarRouteRoute
