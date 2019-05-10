import { StyleSheet } from 'react-native';
import {
  BLUE_MAIN,
  WHITE_MAIN,
  VIOLET_MAIN,
  GRAY_MAIN,
  RED_MAIN,
  BLACK_MAIN,
  BLUE_DARK,
  BG_GRAY_LIGHT,
} from '../../constants/colorPalette';

export default StyleSheet.create({
  mapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    marginTop: 10,
    marginBottom: 10,
    height: 270,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  viewShift: {
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 18,
    paddingTop: 0,
  },
  textAlreadyRated: {
    marginTop: 10,
    color: BLUE_MAIN,
    textAlign: 'center',
  },
  textLocation: {
    color: BLUE_DARK,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCustom: {
    backgroundColor: BLUE_MAIN,
  },
  titleHeader: {
    color: '#fff',
    fontWeight: '500',
  },
  buttomApply: {
    backgroundColor: BLUE_MAIN,
  },
  buttomReject: {
    backgroundColor: VIOLET_MAIN,
  },
  viewListItem: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  viewDataOffers: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 15,
  },
  textOne: {
    color: VIOLET_MAIN,
    fontSize: 12,
    textAlign: 'left',
  },
  textTwo: {
    color: GRAY_MAIN,
    fontSize: 12,
    textAlign: 'left',
  },
  textThree: {
    color: BLUE_MAIN,
    fontSize: 12,
    textAlign: 'left',
  },
  textRed: {
    color: RED_MAIN,
    fontSize: 12,
    textAlign: 'left',
  },
  textBlack: {
    color: BLACK_MAIN,
    fontSize: 12,
    textAlign: 'left',
  },
  viewTitleInfo: {
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  viewCrud: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 40,
    flex: 1,
  },
  viewButtomLeft: {
    width: '50%',
    marginRight: 5,
  },
  viewButtomClock: {
    width: '50%',
    marginRight: 5,
    marginTop: 25,
  },
  buttomLeft: {
    borderColor: 'transparent',
    backgroundColor: VIOLET_MAIN,
    height: 38,
  },
  buttomBlueDark: {
    borderColor: 'transparent',
    backgroundColor: BLUE_DARK,
    height: 38,
  },
  buttomBottom: {
    borderColor: 'transparent',
    backgroundColor: BLUE_DARK,
    height: 38,
    width: '100%',
  },
  viewButtomRight: {
    width: '50%',
    marginLeft: 5,
  },
  buttomRight: {
    borderColor: 'transparent',
    backgroundColor: BLUE_MAIN,
    height: 38,
  },
  textViolet: {
    color: VIOLET_MAIN,
  },
  textBlue: {
    color: BLUE_MAIN,
  },
  textWhite: {
    color: WHITE_MAIN,
  },
  textDark: {
    color: BLUE_DARK,
  },
  openDirectionButton: {
    borderColor: BLUE_DARK,
    marginTop: 10,
    alignSelf: 'center',
  },

  // Css New design
  bgInfo: {
    backgroundColor: BG_GRAY_LIGHT,
  },
  imgCover: {
    width: 50,
    height: 50,
  },
  bodyItemText: {
    marginTop: 10,
  },
  viewInfoDate: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    paddingBottom: 10,
  },
  viewContent: {
    width: '50%',
  },
  textTitle: {
    textAlign: 'center',
    color: BLUE_DARK,
    fontWeight: '800',
  },
  textSubTitle: {
    textAlign: 'center',
    color: BLUE_DARK,
    fontWeight: '100',
  },
  textCenter: {
    textAlign: 'center',
  },
  viewDir: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  viewAmount: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  viewTime: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: BLUE_MAIN,
    margin: 25,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 100,
  },
  viewCheck: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 25,
    marginLeft: 70,
    marginRight: 70,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 100,
  },
  viewBottom: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    left: 0,
    paddingLeft: 60,
    paddingRight: 60,
  },
});
