// Find out why eslint is complaining here
/* eslint-disable react/no-unused-state */

import React, { Component } from 'react'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

import { HOME_SCREEN_ROUTE, VIEW_ITEM_ROUTE, FAVORITES_ROUTE,
         REGION_GRAN_CARACAS_ROUTE, REGION_CENTRO_ROUTE, REGION_GUAYANA_ROUTE, REGION_LOS_ANDES_ROUTE, REGION_LOS_LLANOS_ROUTE, REGION_OCCIDENTE_ROUTE, REGION_ORIENTE_ROUTE, SECTION_SUCESOS_ROUTE, SECTION_POLITICA_ROUTE, SECTION_ECONOMIA_ROUTE, SECTION_DEPORTES_ROUTE, SECTION_TECNOLOGIA_ROUTE, SECTION_INTERNACIONAL_ROUTE, SECTION_REPORTAJES_ROUTE, SECTION_SALUD_ROUTE, SECTION_OPINION_ROUTE, SECTION_MIGRACION_ROUTE, SECTION_MAS_NOTICIAS_ROUTE, RESTFUL_INVESTIGACIONES_ROUTE, RESTFUL_EL_PITAZO_EN_LA_CALLE_ROUTE, RESTFUL_ALIANZAS_ROUTE, MEDIA_FOTOGALERIAS_ROUTE, MEDIA_VIDEOS_ROUTE, MEDIA_INFOGRAFIAS_ROUTE, RADIO_ROUTE, ABOUTUS_ROUTE } from './src/constants/routes'
import HomeScreen from './src/HomeScreen'
import HomeScreenView from './src/HomeScreen/HomeScreen'
import Favorites from './src/Favorites'
import DetailsInfo from './src/DetailsInfo'
import SideBarRoute from './src/SideBarRoute'
import SideBar from './src/SideBar/SideBar'

/**
 * Route for main initial screen. Not exported as it will only be navigated to
 * from the view item route by method of goBack()
 * @type {'MAIN_DRAWER_NAVIGATOR_ROUTE'}
 */
const MAIN_DRAWER_NAVIGATOR_ROUTE = 'MAIN_DRAWER_NAVIGATOR_ROUTE'

const MainDrawerNavigator = createDrawerNavigator({
  [HOME_SCREEN_ROUTE]: { screen: HomeScreenView },

  [REGION_GRAN_CARACAS_ROUTE]: { screen: SideBarRoute },
  [REGION_CENTRO_ROUTE]: { screen: SideBarRoute },
  [REGION_GUAYANA_ROUTE]: { screen: SideBarRoute },
  [REGION_LOS_ANDES_ROUTE]: { screen: SideBarRoute },
  [REGION_LOS_LLANOS_ROUTE]: { screen: SideBarRoute },
  [REGION_OCCIDENTE_ROUTE]: { screen: SideBarRoute },
  [REGION_ORIENTE_ROUTE]: { screen: SideBarRoute },

  [SECTION_SUCESOS_ROUTE]: { screen: SideBarRoute },
  [SECTION_POLITICA_ROUTE]: { screen: SideBarRoute },
  [SECTION_ECONOMIA_ROUTE]: { screen: SideBarRoute },
  [SECTION_DEPORTES_ROUTE]: { screen: SideBarRoute },
  [SECTION_TECNOLOGIA_ROUTE]: { screen: SideBarRoute },
  [SECTION_INTERNACIONAL_ROUTE]: { screen: SideBarRoute },
  [SECTION_REPORTAJES_ROUTE]: { screen: SideBarRoute },
  [SECTION_SALUD_ROUTE]: { screen: SideBarRoute },
  [SECTION_OPINION_ROUTE]: { screen: SideBarRoute },
  [SECTION_MIGRACION_ROUTE]: { screen: SideBarRoute },
  [SECTION_MAS_NOTICIAS_ROUTE]: { screen: SideBarRoute },

  [RESTFUL_INVESTIGACIONES_ROUTE]: { screen: SideBarRoute },
  [RESTFUL_EL_PITAZO_EN_LA_CALLE_ROUTE]: { screen: SideBarRoute },
  [RESTFUL_ALIANZAS_ROUTE]: { screen: SideBarRoute },

  [MEDIA_FOTOGALERIAS_ROUTE]: { screen: SideBarRoute },
  [MEDIA_VIDEOS_ROUTE]: { screen: SideBarRoute },
  [MEDIA_INFOGRAFIAS_ROUTE]: { screen: SideBarRoute },

  [RADIO_ROUTE]: { screen: SideBarRoute },

  [ABOUTUS_ROUTE]: { screen: HomeScreen },

  [FAVORITES_ROUTE]: { screen: Favorites },
}, {
  contentComponent: props => <SideBar {...props} />,
  navigationOptions: {
    header: {
      visible: false,
    },
  },
})


/**
 * Stack switching from the main navigator (drawer plus lists of articles) and
 * an individual article view.
 */
const MainDrawerNavigatorArticleViewStackNavigator = createStackNavigator({
  [MAIN_DRAWER_NAVIGATOR_ROUTE]: MainDrawerNavigator,
  [VIEW_ITEM_ROUTE]: {
    screen: DetailsInfo,
  },
}, {
  initialRouteName: MAIN_DRAWER_NAVIGATOR_ROUTE,
  navigationOptions: {
    header: null,
  },
})


export default class AwesomeApp extends Component {
  constructor() {
    super()
    this.state = {
      isReady: false,
    }
  }

  async componentWillMount() {
    this.setState({ isReady: true })
  }

  render() {
    return <MainDrawerNavigatorArticleViewStackNavigator />
  }
}
