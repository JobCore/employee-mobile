import {
  StyleSheet,
  // Platform,
  Dimensions,
} from 'react-native';
import { BLUE_MAIN, BLUE_DARK, WHITE_MAIN } from '../../shared/colorPalette';
var height = Dimensions.get('window').height;

// const { width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    height: '80%',
    paddingHorizontal: 35,
  },
  buttonContainer: {
    paddingHorizontal: 35,
    marginBottom: 40,
    marginTop: 40,
  },
  viewButtomLogin: {
    backgroundColor: BLUE_DARK,
    borderRadius: 50,
    height: 45,
    // marginTop: 40,
    justifyContent: 'center',
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
    fontWeight: '800',
    textAlign: 'center',
    color: WHITE_MAIN,
  },
  noDocsText: {
    fontSize: 16,
    height: 50,
    fontWeight: '800',
    textAlign: 'center',
    color: BLUE_DARK,
    marginTop: height / 3,
  },
  garbageIcon: {
    width: 20,
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
