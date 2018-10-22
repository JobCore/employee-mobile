import { StyleSheet, Platform } from 'react-native';
import { BLUE_MAIN, BLUE_DARK, WHITE_MAIN, BLUE_LIGHT } from '../../constants/colorPalette'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderLabel: {
    textAlign: 'center',
    color: BLUE_DARK,
    marginTop: 20,
  },
  sliderValue: {
    marginLeft: 0,
    marginRight: 0,
    textAlign: 'left',
    color: BLUE_DARK,
  },
  sliderMaxValue: {
    fontSize: 12,
    textAlign: 'left',
    color: BLUE_DARK,
  },
  radioButtonLeft: {
    color: BLUE_DARK,
    marginLeft: 10,
    marginRight: 7,
  },
  radioButtonRight: {
    color: BLUE_DARK,
    marginLeft: 7,
    marginRight: 10,
  },
  textAlldayOr: {
    color: BLUE_DARK,
    textAlign: 'center',
    fontSize: 12,
  },
  textDay: {
    textAlign: 'left',
    color: BLUE_DARK,
  },
  textHour: {
    color: BLUE_DARK,
  },
  buttonHour: {
    borderColor: BLUE_DARK,
  },
  textToView: {
    marginLeft: 5,
    marginRight: 5,
  },
  textTo: {
    color: BLUE_DARK,
  },
  buttonPosition: {
    textAlign: 'center',
    backgroundColor: BLUE_LIGHT,
  },
  headerCustom:{
    backgroundColor: BLUE_MAIN,
  },
  titleHeader:{
    color: WHITE_MAIN,
    fontWeight: '500',
    fontSize: 18,
  },
  viewHeader:{
    backgroundColor: BLUE_LIGHT,
    borderRadius: 50,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20
  },
  viewContainer: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  textHeader:{
    color: BLUE_DARK,
    fontSize: 14,
    textAlign: 'center'
  },
  itemSelectCheck:{
    marginLeft: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  IconCheck:{
    fontSize: 20,
    color: BLUE_DARK
  },
  textList:{
    color: BLUE_DARK
  },
  weekendsText: {
    color: BLUE_DARK
  },
  accordionAvailability:{
    borderColor: 'transparent',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
  },
  textAvailability:{
    textAlign: 'center',
    color: BLUE_DARK,
    fontSize: 16,
  },
  accordionPosition:{
    borderColor: 'transparent',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
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
  viewInvite:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 70,
    marginTop: 50
  },
  titleInvite:{
    color: BLUE_DARK,
    fontSize: 14,
    marginBottom: 10
  },
  itemInvite:{
    padding: 14,
    fontSize: 14,
    color: BLUE_DARK
  },
  buttomLeftActive:{
    backgroundColor: BLUE_MAIN,
    borderColor:'transparent',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttomLeftDesactive:{
    backgroundColor: 'transparent',
    borderColor: BLUE_MAIN,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  labelForm:{
    color: BLUE_DARK
  },
});
