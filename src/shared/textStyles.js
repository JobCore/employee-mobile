import { StyleSheet } from 'react-native';
import {
  WHITE_MAIN,
  VIOLET_MAIN,
  GRAY_MAIN,
  RED_MAIN,
  BLUE_MAIN,
  BLACK_MAIN,
} from './colorPalette';

export default StyleSheet.create({
  title: {
    color: WHITE_MAIN,
    fontWeight: '500',
    fontSize: 18,
  },
  textEmployer: {
    color: VIOLET_MAIN,
    textAlign: 'left',
  },
  textGray: {
    color: GRAY_MAIN,
    textAlign: 'left',
  },
  textRed: {
    color: RED_MAIN,
    textAlign: 'left',
  },
  textShiftTitle: {
    color: BLUE_MAIN,
    textAlign: 'left',
  },
  textBlack: {
    color: BLACK_MAIN,
  },
});
