import { StyleSheet, Dimensions } from 'react-native'

import { PITAZO_GRAY } from '../../constants/colors'


export const MAX_HEIGHT = 320


export default StyleSheet.create({
  landscape: {
    width: Dimensions.get('window').width,
  },
  portraitOrUnknown: {
    backgroundColor: PITAZO_GRAY,
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
  },
  spinner: {
    backgroundColor: PITAZO_GRAY,
    height: 1, // scrollview wont shrink on height change, it will only grow
  },
  square: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
  },
})
