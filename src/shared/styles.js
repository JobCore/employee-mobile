import { StyleSheet } from 'react-native'
import { BLUE_MAIN, WHITE_MAIN } from './colorPalette'
import { hasNotch } from './utils'

const PADDING_TOP = hasNotch() ? 20 : 5
const HEIGHT = hasNotch() ? 90 : 60

const headerStyles = StyleSheet.create({
  headerCustom: {
    alignItems: 'center',
    backgroundColor: BLUE_MAIN,
    height: HEIGHT,
    justifyContent: 'center',
    paddingTop: PADDING_TOP,
  },
  leftButtonImage: {
    color: WHITE_MAIN,
    fontSize: 25,
    fontWeight: '100',
    height: 30,
    marginTop: 5,
    resizeMode: 'contain',
    textAlign: 'center',
    width: 30,
  },
  modalTitleHeader: {
    color: WHITE_MAIN,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
    width: 150,
  },
  titleHeader: {
    color: WHITE_MAIN,
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 30,
    textAlign: 'left',
    width: 150,
  },
})

export { headerStyles }
