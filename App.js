// Find out why eslint is complaining here
/* eslint-disable react/no-unused-state */

import React, { Component } from 'react'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

import { HOME_SCREEN_ROUTE, VIEW_ITEM_ROUTE, FAVORITES_ROUTE,
         REGION_GRAN_CARACAS_ROUTE, REGION_CENTRO_ROUTE, REGION_GUAYANA_ROUTE,
         REGION_LOS_ANDES_ROUTE, REGION_LOS_LLANOS_ROUTE,
         REGION_OCCIDENTE_ROUTE, REGION_ORIENTE_ROUTE, SECTION_SUCESOS_ROUTE,
         SECTION_POLITICA_ROUTE, SECTION_ECONOMIA_ROUTE, SECTION_DEPORTES_ROUTE,
         SECTION_TECNOLOGIA_ROUTE, SECTION_INTERNACIONAL_ROUTE,
         SECTION_REPORTAJES_ROUTE, SECTION_SALUD_ROUTE, SECTION_OPINION_ROUTE,
         SECTION_MIGRACION_ROUTE, SECTION_MAS_NOTICIAS_ROUTE,
         RESTFUL_INVESTIGACIONES_ROUTE, RESTFUL_EL_PITAZO_EN_LA_CALLE_ROUTE,
         RESTFUL_ALIANZAS_ROUTE, MEDIA_FOTOGALERIAS_ROUTE, MEDIA_VIDEOS_ROUTE,
         MEDIA_INFOGRAFIAS_ROUTE, RADIO_ROUTE,
         ABOUTUS_ROUTE } from './src/constants/routes'
import HomeScreen from './src/HomeScreen'
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
  [HOME_SCREEN_ROUTE]: { screen: HomeScreen },

  [REGION_GRAN_CARACAS_ROUTE]: props => <SideBarRoute {...props} />,
  [REGION_CENTRO_ROUTE]: props => <SideBarRoute {...props} />,
  [REGION_GUAYANA_ROUTE]: props => <SideBarRoute {...props} />,
  [REGION_LOS_ANDES_ROUTE]: props => <SideBarRoute {...props} />,
  [REGION_LOS_LLANOS_ROUTE]: props => <SideBarRoute {...props} />,
  [REGION_OCCIDENTE_ROUTE]: props => <SideBarRoute {...props} />,
  [REGION_ORIENTE_ROUTE]: props => <SideBarRoute {...props} />,

  [SECTION_SUCESOS_ROUTE]: props => <SideBarRoute {...props} />,
  [SECTION_POLITICA_ROUTE]: props => <SideBarRoute {...props} />,
  [SECTION_ECONOMIA_ROUTE]: props => <SideBarRoute {...props} />,
  [SECTION_DEPORTES_ROUTE]: props => <SideBarRoute {...props} />,
  [SECTION_TECNOLOGIA_ROUTE]: props => <SideBarRoute {...props} />,
  [SECTION_INTERNACIONAL_ROUTE]: props => <SideBarRoute {...props} />,
  [SECTION_REPORTAJES_ROUTE]: props => <SideBarRoute {...props} />,
  [SECTION_SALUD_ROUTE]: props => <SideBarRoute {...props} />,
  [SECTION_OPINION_ROUTE]: props => <SideBarRoute {...props} />,
  [SECTION_MIGRACION_ROUTE]: props => <SideBarRoute {...props} />,
  [SECTION_MAS_NOTICIAS_ROUTE]: props => <SideBarRoute {...props} />,

  [RESTFUL_INVESTIGACIONES_ROUTE]: props => <SideBarRoute {...props} />,
  [RESTFUL_EL_PITAZO_EN_LA_CALLE_ROUTE]: props => <SideBarRoute {...props} />,
  [RESTFUL_ALIANZAS_ROUTE]: props => <SideBarRoute {...props} />,

  [MEDIA_FOTOGALERIAS_ROUTE]: props => <SideBarRoute {...props} />,
  [MEDIA_VIDEOS_ROUTE]: props => <SideBarRoute {...props} />,
  [MEDIA_INFOGRAFIAS_ROUTE]: props => <SideBarRoute {...props} />,

  [RADIO_ROUTE]: props => <SideBarRoute {...props} />,

  [ABOUTUS_ROUTE]: { screen: HomeScreen },

  [FAVORITES_ROUTE]: { screen: Favorites },
}, {
  contentComponent: props => <SideBar {...props} />,
})


/**
 * Switches between the main navigator (drawer plus lists of articles) and
 * an individual article view.
 */
const MainDrawerNavigatorArticleViewStackNavigator = createStackNavigator({
  [MAIN_DRAWER_NAVIGATOR_ROUTE]: MainDrawerNavigator,
  [VIEW_ITEM_ROUTE]: DetailsInfo,
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
