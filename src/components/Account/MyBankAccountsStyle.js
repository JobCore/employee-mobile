import {
  StyleSheet,
  // Platform,
  // Dimensions
} from 'react-native';
import { BLUE_MAIN, BLUE_DARK } from '../../shared/colorPalette';

// const { width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    paddingHorizontal: 35,
  },
  viewButtomLogin: {
    backgroundColor: BLUE_DARK,
    borderRadius: 50,
    height: 45,
    marginBottom: 0,
  },
  viewInput: {
    backgroundColor: 'transparent',
    borderColor: BLUE_MAIN,
    borderRadius: 50,
    borderWidth: 1,
    color: BLUE_DARK,
    height: 40,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 0,
    width: '100%',
  },
  textButtom: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
