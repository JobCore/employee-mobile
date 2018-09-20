import { StyleSheet } from 'react-native'

import { PADDING_LEFT, PADDING_RIGHT } from '../../style'

export const INSTAGRAM_DEFAULT_HEIGHT = 150


export default StyleSheet.create({
  bodyText: {
    fontSize: 16,
    lineHeight: 22,
    paddingLeft: PADDING_LEFT,
    paddingRight: PADDING_RIGHT,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  instagramIcon: {
    flexGrow: 1,
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
})
