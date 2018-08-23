import React from 'react'

import { DrawerNavigator } from 'react-navigation'

import SideBar from '../SideBar/SideBar'

import HomeScreen from './HomeScreen'

import Favorites from '../Favorites'

import { HOME_SCREEN_ROUTE, VIEW_ITEM_ROUTE, FAVORITES_ROUTE } from '../constants/routes'
import DetailsInfo from '../DetailsInfo'

export default DrawerNavigator(
  {
    [FAVORITES_ROUTE]: { screen: Favorites },
    [HOME_SCREEN_ROUTE]: { screen: HomeScreen },
    [VIEW_ITEM_ROUTE]: { screen: DetailsInfo },
  },
  {
    contentComponent: props => <SideBar {...props} />,
    initialRouteName: HOME_SCREEN_ROUTE,
  }
)
