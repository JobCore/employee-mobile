import { StyleSheet, Platform } from 'react-native';
import {
  BLUE_MAIN,
  VIOLET_MAIN,
  BLUE_DARK,
  WHITE_MAIN,
  BLUE_LIGHT,
  GRAY_LIGHT,
} from '../../shared/colorPalette';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderLabel: {
    textAlign: 'center',
    color: BLUE_DARK,
  },
  textButton: {
    textAlign: 'center',
    color: BLUE_DARK,
  },
  titleInvite: {
    color: BLUE_DARK,
    fontSize: 14,
    marginBottom: 10,
  },
  buttonLeftActive: {
    backgroundColor: BLUE_MAIN,
    borderColor: 'transparent',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonLeftInactive: {
    backgroundColor: 'transparent',
    borderColor: BLUE_MAIN,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonRightActive: {
    backgroundColor: BLUE_MAIN,
    borderColor: 'transparent',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonRightInactive: {
    backgroundColor: 'transparent',
    borderColor: BLUE_MAIN,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  itemInvite: {
    padding: 14,
    fontSize: 14,
    color: BLUE_DARK,
  },
  viewPositions: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  textPositions: {
    textAlign: 'center',
    fontSize: 12,
    color: GRAY_LIGHT,
  },
  buttonRounded: {
    textAlign: 'center',
    backgroundColor: BLUE_LIGHT,
  },
  viewButtonPosition: {
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  viewButtonAvailability: {
    marginTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  viewButtonLocation: {
    marginTop: 30,
    marginBottom: 15,
    ...Platform.select({
      android: {
        paddingLeft: 1,
        paddingRight: 1,
      },
    }),
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
  headerCustom: {
    backgroundColor: BLUE_MAIN,
  },
  titleHeader: {
    color: WHITE_MAIN,
    fontWeight: '500',
    fontSize: 18,
  },
  viewHeader: {
    backgroundColor: BLUE_LIGHT,
    borderRadius: 50,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  textHeader: {
    color: BLUE_DARK,
    fontSize: 14,
    textAlign: 'center',
  },
  contentScroll: {
    height: 350,
    borderWidth: 1,
    borderColor: BLUE_MAIN,
    borderRadius: 35,
    paddingBottom: 50,
    paddingTop: 5,
    borderTopColor: 'transparent',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  itemSelectCheck: {
    marginLeft: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  IconCheck: {
    fontSize: 20,
    color: BLUE_DARK,
  },
  textList: {
    color: BLUE_DARK,
  },
  weekendsText: {
    color: BLUE_DARK,
  },
  accordionAvailability: {
    borderColor: 'transparent',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
  },
  textAvailability: {
    textAlign: 'center',
    color: BLUE_DARK,
    fontSize: 16,
  },
  textLocation: {
    textAlign: 'center',
    fontSize: 12,
    color: GRAY_LIGHT,
  },
  accordionPosition: {
    borderColor: 'transparent',
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  viewCrud: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
  },
  viewButtomLeft: {
    width: '50%',
    marginRight: 5,
  },
  buttomLeft: {
    backgroundColor: BLUE_DARK,
  },
  textButtomLeft: {
    color: WHITE_MAIN,
  },
  viewButtomRight: {
    width: '50%',
    marginLeft: 5,
  },
  buttomRight: {
    backgroundColor: 'transparent',
    borderColor: VIOLET_MAIN,
    borderWidth: 1,
  },
  textButtomRight: {
    color: VIOLET_MAIN,
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
  viewInvite: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 70,
    marginTop: 50,
  },
  viewInviteToggle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  labelForm: {
    color: BLUE_DARK,
  },
  viewWarning: {
    backgroundColor: '#ff7272',
    padding: 15,
  },
});
