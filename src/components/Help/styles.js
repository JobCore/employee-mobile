import { StyleSheet, Dimensions } from 'react-native'

import {
  BLUE_MAIN,
  BLUE_DARK,
  WHITE_MAIN
} from '../../shared/colorPalette'

const styles = StyleSheet.create({
  view: {
    backgroundColor: WHITE_MAIN,
  },
  viewItem: {
    paddingTop: 100,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100
  },
  itemText: {
    color: BLUE_MAIN,
    paddingLeft: 30,
    paddingRight: 30
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BLUE_DARK,
    backgroundColor: BLUE_DARK
  },
  inactiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BLUE_MAIN,
    backgroundColor: WHITE_MAIN
  }
})

export { styles }
