import { StyleSheet, Platform } from 'react-native';
import { BLUE_MAIN, BLUE_DARK, WHITE_MAIN } from '../../constants/colorPalette';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCustom: {
    backgroundColor: BLUE_MAIN,
  },
  titleHeader: {
    color: WHITE_MAIN,
    fontWeight: '500',
    fontSize: 18,
  },
  textHello: {
    textAlign: 'center',
    marginTop: 30,
    color: BLUE_DARK,
    fontSize: 22,
    fontWeight: '600',
  },
  textWelcome: {
    textAlign: 'center',
    marginTop: 10,
    color: BLUE_DARK,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 60,
    ...Platform.select({
      android: {
        marginBottom: 35,
      },
    }),
  },
  viewDashboard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 50,
  },
  viewInvite: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 70,
  },
  viewItemJobsLeft: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginRight: 5,
  },
  viewItemJobsRight: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
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
  imgJobs: {
    width: 25,
    height: 25,
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
