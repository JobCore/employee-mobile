import { StyleSheet } from 'react-native';
import {
  BLUE_MAIN,
  WHITE_MAIN,
  VIOLET_MAIN,
  BLUE_DARK,
  GRAY_DARK,
} from '../../shared/colorPalette';

export default StyleSheet.create({
  content: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  textShift: {
    color: BLUE_DARK,
    textAlign: 'center',
  },
  textRate: {
    marginTop: 15,
    textAlign: 'center',
    color: GRAY_DARK,
  },
  starsView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  viewTextArea: {
    backgroundColor: 'transparent',
    borderColor: BLUE_MAIN,
    color: BLUE_DARK,
    marginTop: 30,
    marginBottom: 10,
  },
  viewCrud: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  viewButtomLeft: {
    width: '48%',
  },
  buttomLeft: {
    backgroundColor: VIOLET_MAIN,
    borderColor: VIOLET_MAIN,
    color: WHITE_MAIN,
  },
  viewButtomRight: {
    width: '48%',
  },
  buttomRight: {
    backgroundColor: BLUE_MAIN,
    borderColor: BLUE_MAIN,
    color: WHITE_MAIN,
  },
  textViolet: {
    color: VIOLET_MAIN,
  },
  textBlue: {
    color: BLUE_MAIN,
  },
  textWhite: {
    color: WHITE_MAIN,
  },
});
