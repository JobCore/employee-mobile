import { StyleSheet, Platform, Dimensions } from 'react-native';
var width = Dimensions.get('window').width;
import { BLUE_MAIN, BLUE_DARK, WHITE_MAIN, VIOLET_MAIN } from '../../constants/colorPalette'

export default styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCustom:{
    backgroundColor: BLUE_MAIN,
  },
  titleHeader:{
    color: WHITE_MAIN,
    fontWeight: '500',
    fontSize: 18,
  },
  viewForm:{
    width: width,
    paddingLeft: 35,
    paddingRight: 35,
    marginTop: '15%',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        paddingTop: 0,
      },
  }),
  },
  viewButtomLogin:{
    marginBottom: 0,
    borderRadius: 50,
    height: 55,
    backgroundColor: BLUE_DARK,
  },
  viewButtomSignUp:{
    borderRadius: 50,
    height: 55,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  textButtom:{
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  textButtomSignUp:{
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 25,
    color: BLUE_DARK
  },
  textButtomSave:{
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    marginTop: 5,
    marginRight: 10,
    color: BLUE_DARK
  },
  viewInput:{
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
  borderNone:{
    borderBottomColor: 'transparent'
  },
  labelForm:{
    color: BLUE_DARK,
  },
  labelBank:{
    color: BLUE_DARK,
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 18,
    fontWeight: '500'
  },
  viewCrud:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
    marginBottom: 20
  },
  viewButtomLeft:{
    width: '50%',
    marginRight: 5,
  },
  buttomLeft:{
    backgroundColor: 'transparent',
  },
  textButtomLeft:{
    color: BLUE_MAIN
  },
  viewButtomRight:{
    width: '50%',
    marginLeft: 5,
  },
  buttomRight:{
    backgroundColor: 'transparent',
  },
  textButtomRight:{
    color: VIOLET_MAIN
  },


});
