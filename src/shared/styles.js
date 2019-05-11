import { StyleSheet } from 'react-native';
import { BLUE_MAIN, WHITE_MAIN } from './colorPalette';
import { Platform } from 'react-native';
import { hasNotch } from './utils';

const PADDING_TOP = hasNotch() ? 40 : 20;
const HEIGHT = hasNotch() ? 100 : 70;

const headerStyles = StyleSheet.create({
  headerCustom: {
    backgroundColor: BLUE_MAIN,
    paddingTop: PADDING_TOP,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButtonImage: {
    resizeMode: 'contain',
    height: 32,
    width: 32,
    color: WHITE_MAIN,
    marginRight: -10,
  },
  leftButtonImage: {
    resizeMode: 'contain',
    height: 32,
    width: 32,
    color: WHITE_MAIN,
    marginLeft: 20,
  },
  titleHeader: {
    color: WHITE_MAIN,
    fontWeight: '500',
    fontSize: 18,
    width: 150,
  },
});

export { headerStyles };
