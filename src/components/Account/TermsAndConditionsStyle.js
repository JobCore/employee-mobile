import { StyleSheet } from 'react-native';
import { BLUE_DARK } from '../../shared/colorPalette';

export default StyleSheet.create({
  viewButtomLogin: {
    margin: 20,
    marginBottom: 0,
    borderRadius: 50,
    height: 55,
    backgroundColor: BLUE_DARK,
  },
  textButtom: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  termsText: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
  },
  termsTitleText: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
