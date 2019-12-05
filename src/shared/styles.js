import { StyleSheet } from 'react-native';
import { BLUE_MAIN, WHITE_MAIN } from './colorPalette';
import { hasNotch } from './utils';

const PADDING_TOP = hasNotch() ? 20 : 10;
const HEIGHT = hasNotch() ? 90 : 70;

const headerStyles = StyleSheet.create({
  headerCustom: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: BLUE_MAIN,
    height: HEIGHT,
    justifyContent: 'center',
    paddingBottom: 0,
    paddingTop: PADDING_TOP,
  },
  leftButtonImage: {
    color: WHITE_MAIN,
    fontSize: 35,
    fontWeight: '100',
    height: 30,
    resizeMode: 'contain',
    textAlign: 'center',
    width: 30,
  },
  backButton: {
    // color: WHITE_MAIN,
    fontSize: 35,
    // fontWeight: '100',
    height: 25,
    // resizeMode: 'contain',
    // textAlign: 'center',
    width: 25,
  },
  modalTitleHeader: {
    color: WHITE_MAIN,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  titleHeader: {
    color: WHITE_MAIN,
    fontSize: 18,
    fontWeight: '500',
  },
});

export { headerStyles };
