import { StyleSheet, Platform, Dimensions } from 'react-native';
var width = Dimensions.get('window').width;
import { BLUE_MAIN, BLUE_DARK } from '../../constants/colorPalette';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewLogo: {
    width: '75%',
    height: 75,
    ...Platform.select({
      android: {
        marginTop: '20%',
      },
    }),
  },
  viewBackground: {
    backgroundColor: '#ccc',
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  viewForm: {
    width: width,
    paddingLeft: 35,
    paddingRight: 35,
    marginTop: '20%',
    marginBottom: 20,
  },
  viewButtomLogin: {
    marginBottom: 0,
    borderRadius: 50,
    height: 55,
    backgroundColor: BLUE_DARK,
  },
  viewButtomSignUp: {
    borderRadius: 50,
    height: 55,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  textButtom: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  textButtomSignUp: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 25,
    color: BLUE_DARK,
  },
  textButtomSave: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    marginTop: 5,
    marginRight: 10,
    color: BLUE_DARK,
  },

  viewInput: {
    backgroundColor: 'transparent',
    height: 55,
    width: '100%',
    borderColor: BLUE_MAIN,
    color: BLUE_DARK,
    borderRadius: 50,
    borderWidth: 1,
    paddingLeft: 20,
    paddingTop: 12,
    paddingRight: 10,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        paddingTop: 0,
      },
    }),
  },
  borderNone: {
    borderBottomColor: 'transparent',
  },
  labelForm: {
    color: BLUE_DARK,
  },
});
