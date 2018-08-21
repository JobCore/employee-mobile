import React from 'react'

import { DrawerNavigator } from 'react-navigation'

import SideBar from '../SideBar/SideBar'

import HomeScreen from './HomeScreen'

import { HOME_SCREEN_ROUTE, VIEW_ITEM_ROUTE } from '../constants/routes'
import DetailsInfo from '../DetailsInfo'

export default DrawerNavigator(
  {
    [HOME_SCREEN_ROUTE]: { screen: HomeScreen },
    [VIEW_ITEM_ROUTE]: { screen: DetailsInfo },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  }
)
