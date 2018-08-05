import { StackNavigator } from 'react-navigation'

import DetailsInfo from '../DetailsInfo/DetailsInfo'

import TabOne from './TabOne'

export default StackNavigator({
  DetailsInfo: { screen: DetailsInfo },
  TabOne: { screen: TabOne },
})
