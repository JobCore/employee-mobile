import { StyleSheet, Platform, Dimensions } from 'react-native';
var width = Dimensions.get('window').width;
import { BLUE_MAIN, BLUE_DARK } from '../../constants/colorPalette';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 35,
  },
  profileImg: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  viewLogo: {
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 90,
    ...Platform.select({
      android: {
        marginTop: '10%',
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
    marginTop: 0,
    marginBottom: 20,
  },
  viewButtomLogin: {
    marginBottom: 0,
    borderRadius: 50,
    height: 55,
    backgroundColor: BLUE_DARK,
  },
  viewButtomSignUp: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginTop: 20,
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
    color: BLUE_DARK,
  },
  viewButtomChangePassword: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
  },
  textButtomChangePassword: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    marginRight: 10,
    color: BLUE_DARK,
    marginBottom: 10,
  },
  textButtomSave: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    marginTop: 5,
    marginRight: 10,
    color: BLUE_DARK,
  },
  viewTextArea: {
    backgroundColor: 'transparent',
    borderColor: BLUE_MAIN,
    color: BLUE_DARK,
    paddingLeft: 10,
    marginBottom: 10,
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
