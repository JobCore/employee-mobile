import { StyleSheet } from 'react-native';
import { BLUE_MAIN, BLUE_DARK, WHITE_MAIN } from '../../shared/colorPalette';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleHeader: {
    color: WHITE_MAIN,
    fontWeight: '500',
    fontSize: 18,
  },
  welcomeItem: {
    paddingHorizontal: 30,
    marginLeft: 0,
  },
  textHello: {
    textAlign: 'center',
    color: BLUE_DARK,
    fontSize: 22,
    fontWeight: '600',
  },
  textWelcome: {
    textAlign: 'center',
    color: BLUE_DARK,
    fontSize: 18,
    fontWeight: '500',
    // marginBottom: 40,
    // ...Platform.select({
    //   android: {
    //     marginBottom: 15,
    //   },
    // }),
  },
  viewDashboard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  viewInvite: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  viewItemJobsLeft: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  viewItemJobsRight: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  titleItem: {
    textAlign: 'center',
    color: BLUE_DARK,
    fontSize: 12,
    marginBottom: 15,
  },
  titleInvite: {
    color: BLUE_DARK,
    fontSize: 14,
    marginBottom: 10,
  },
  itemInvite: {
    padding: 14,
    fontSize: 14,
    color: BLUE_DARK,
  },
  itemData: {
    color: BLUE_DARK,
    fontSize: 18,
    marginTop: 10,
  },
  iconSize: {
    width: 40,
    height: 40,
    alignSelf: 'center',
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
  pointActive: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: 'red',
  },
});
