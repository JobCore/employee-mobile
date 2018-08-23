import React from 'react'

import SideBarRoute from './SideBarRoute'

const SideBarRouteRoute = ({ navigation }) => {
  let fetcherFunction = navigation.getParam('fetcherFunction')

  if (typeof fetcherFunction !== 'function') {
    if (__DEV__) {
      throw new Error(
        `Expected fetcherFunction navigation param inside SideBarRoute route to be a function, instead got: ${typeof fetcherFunction}`
      )
    }
    fetcherFunction = () => {}
  }

  return (
    <SideBarRoute
      fetcherFunction={fetcherFunction}
      navigation={navigation}
    />
  )
}

export default SideBarRouteRoute