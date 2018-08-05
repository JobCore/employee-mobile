import { StackNavigator } from 'react-navigation'

import DetailsInfo from '../DetailsInfo/DetailsInfo'

import Profile from './Profile'

export default StackNavigator({
  DetailsInfo: { screen: DetailsInfo },
  Profile: { screen: Profile },
})
