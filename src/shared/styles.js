import { StyleSheet } from 'react-native';
import { BLUE_MAIN, WHITE_MAIN } from './colorPalette';
import { hasNotch } from './utils';

const PADDING_TOP = hasNotch() ? 20 : 5;
const HEIGHT = hasNotch() ? 90 : 60;

const headerStyles = StyleSheet.create({
  headerCustom: {
    backgroundColor: BLUE_MAIN,
    paddingTop: PADDING_TOP,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButtonImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
    color: WHITE_MAIN,
    textAlign: 'center',
    marginTop: 5,
    fontSize: 25,
    fontWeight: '100'
  },
  titleHeader: {
    color: WHITE_MAIN,
    fontWeight: '500',
    fontSize: 18,
    width: 150,
    textAlign: 'left',
    marginLeft: -70
  },
  modalTitleHeader: {
    color: WHITE_MAIN,
    fontWeight: '500',
    fontSize: 18,
    width: 150,
    textAlign: 'left'
  }
});

export { headerStyles };
