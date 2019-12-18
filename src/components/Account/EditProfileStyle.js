import { StyleSheet, Platform, Dimensions } from 'react-native';
import { BLUE_MAIN, BLUE_DARK } from '../../shared/colorPalette';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  borderNone: {
    borderBottomColor: 'transparent',
  },
  pickerItem: {
    width: 225,
  },
  container: {
    paddingHorizontal: 35,
  },
  itemTextBio: {
    borderBottomColor: 'transparent',
    marginBottom: 10,
  },
  labelForm: {
    color: BLUE_DARK,
  },
  profileImg: {
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  textBio: {
    color: BLUE_DARK,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
  },
  textButtom: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  textButtomChangePassword: {
    color: BLUE_DARK,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 20,
    marginRight: 10,
    textAlign: 'right',
  },
  activateToachIdText: {
    color: BLUE_DARK,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 10,
    textAlign: 'right',
    marginTop: 5,
  },
  textButtomSave: {
    color: BLUE_DARK,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 10,
    marginTop: 5,
    textAlign: 'right',
  },
  textButtomSignUp: {
    color: BLUE_DARK,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    paddingBottom: 15,
  },
  viewBackground: {
    backgroundColor: '#ccc',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
  },
  viewButtomChangePassword: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
  },
  viewButtomLogin: {
    backgroundColor: BLUE_DARK,
    borderRadius: 50,
    height: 45,
    marginBottom: 0,
  },
  viewButtomSignUp: {
    backgroundColor: 'transparent',
    marginTop: 20,
    textAlign: 'center',
  },
  viewForm: {
    marginBottom: 20,
    marginTop: 0,
    paddingLeft: 35,
    paddingRight: 35,
    width,
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
  viewLogo: {
    alignSelf: 'center',
    height: 90,
    resizeMode: 'contain',
    width: '100%',
    ...Platform.select({
      android: {
        marginTop: '10%',
      },
    }),
  },
  viewTextArea: {
    backgroundColor: 'transparent',
    borderColor: BLUE_MAIN,
    color: BLUE_DARK,
    paddingLeft: 10,
    paddingRight: 10,
    ...Platform.select({
      ios: {
        paddingTop: 10,
        paddingBottom: 10,
      },
    }),
    marginBottom: 10,
  },
});
