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
    marginTop: 40,
  },
  viewInput: {
    backgroundColor: 'transparent',
    borderColor: BLUE_MAIN,
    borderRadius: 50,
    borderWidth: 1,
    color: BLUE_DARK,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 0,
    width: '100%',
    justifyContent: 'space-between',
  },
  textButtom: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  garbageIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  formStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusStyle: {
    fontWeight: '600',
    color: BLUE_DARK,
  },
});
