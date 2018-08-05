import { StackNavigator } from 'react-navigation'

import DetailsInfo from '../DetailsInfo/DetailsInfo'
import ProfileScreen from '../ProfileScreen/Profile'

export default StackNavigator({
  DetailsInfo: { screen: DetailsInfo },
  ProfileScreen: { screen: ProfileScreen },
})
