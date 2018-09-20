import { StyleSheet } from 'react-native'

export const INSTAGRAM_DEFAULT_HEIGHT = 150

export default StyleSheet.create({
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
