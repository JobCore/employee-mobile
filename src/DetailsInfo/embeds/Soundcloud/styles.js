import { StyleSheet } from 'react-native'

import { PITAZO_GRAY } from '../../../constants/colors'

export const SOUNDCLOUD_HEIGHT = 280

export default StyleSheet.create({
  imageBackground: {
    height: SOUNDCLOUD_HEIGHT,
  },
  loadingImage: {
    height: 128,
    width: 128,
  },
  loadingText: {
    color: '#333',
    fontFamily: 'Helvetica, Arial, sans-serif',
    textAlign: 'center',
  },
  mediaControl: {
    height: 128,
    width: 128,
  },
  radioWhenLoaded: {
    height: 128,
    width: 128,
  },
  timeText: {
    backgroundColor: '#111',
    color: '#efefef',
  },
  titleText: {
    backgroundColor: '#333',
    color: '#efefef',
  },
  touchableOpacity: {
    alignItems: 'center',
    backgroundColor: PITAZO_GRAY,
    height: SOUNDCLOUD_HEIGHT,
    justifyContent: 'center',
  },
})
