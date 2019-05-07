import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Warning: Failed prop type',
  'Module RCTImageLoader',
]);

import { Root } from 'native-base';

import LoginScreen from './src/components/Account/LoginScreen';
import RegisterScreen from './src/components/Account/RegisterScreen';
import EditProfile from './src/components/Account/EditProfile';
import ForgotScreen from './src/components/Account/ForgotScreen';
import ChangePassword from './src/components/Account/ChangePassword';
import Profile from './src/components/Account/Profile';

import DashboardScreen from './src/components/Dashboard';
import JobInvites from './src/components/Invite/JobInvites';
import InviteDetails from './src/components/Invite/InviteDetails';
import InviteDetailsNew from './src/components/Invite/InviteDetailsNew';
import JobPreferences from './src/components/Invite/JobPreferences';
import Position from './src/components/Invite/Position';
import Availability from './src/components/Invite/Availability';
import MyJobs from './src/components/MyJobs';
import RateEmployer from './src/components/MyJobs/RateEmployer';
import JobDetailsScreen from './src/components/MyJobs/JobDetails';
import JobDetailsNewScreen from './src/components/MyJobs/JobDetailsNew';
import JobDetailsNewOneScreen from './src/components/MyJobs/JobDetailsNewOne';
import JobDetailsNewTwoScreen from './src/components/MyJobs/JobDetailsNewTwo';
import JobWorkModeScreen from './src/components/MyJobs/JobWorkMode';
import Reviews from './src/components/MyJobs/Reviews';

import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  FORGOT_ROUTE,
  JOB_INVITES_ROUTE,
  JOB_PREFERENCES_ROUTE,
  MYJOBS_ROUTE,
  SETTING_ROUTE,
  APP_ROUTE,
  AUTH_ROUTE,
  RESET_ROUTE,
  AVAILABILITY_ROUTE,
  INVITE_DETAILS_ROUTE,
  INVITE_DETAILS_NEW_ROUTE,
  EDIT_PROFILE_ROUTE,
  PROFILE_ROUTE,
  POSITION_ROUTE,
  JOB_DETAILS_ROUTE,
  APPLICATION_DETAILS_ROUTE,
  EDIT_LOCATION_ROUTE,
  RATE_EMPLOYER_ROUTE,
  REVIEWS_ROUTE,
  JOB_DETAILS_NEW_ROUTE,
  JOB_DETAILS_NEW_ONE_ROUTE,
  JOB_DETAILS_NEW_TWO_ROUTE,
  JOB_WORK_MODE_ROUTE,
} from './src/constants/routes';
import {
  BLUE_DARK,
  BLUE_LIGHT,
  GRAY_MAIN,
  BLUE_SEMI_LIGHT,
} from './src/constants/colorPalette';

import SettingScreen from './src/components/Setting';

import Splash from './src/components/Splash';
import EditLocation from './src/components/Invite/EditLocation';

window.DEBUG = true;

export const AuthStack = createStackNavigator({
  [LOGIN_ROUTE]: {
    screen: LoginScreen,
    path: 'login/:email',
  },
  [REGISTER_ROUTE]: {
    screen: RegisterScreen,
    path: 'register',
  },
  [FORGOT_ROUTE]: ForgotScreen,
});

export const Tabs = createBottomTabNavigator(
  {
    [DASHBOARD_ROUTE]: { screen: DashboardScreen },
    [JOB_INVITES_ROUTE]: { screen: JobInvites },
    [JOB_PREFERENCES_ROUTE]: { screen: JobPreferences },
    [MYJOBS_ROUTE]: { screen: MyJobs },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeBackgroundColor: BLUE_SEMI_LIGHT,
      inactiveBackgroundColor: BLUE_LIGHT,
      activeTintColor: BLUE_DARK,
      inactiveTintColor: GRAY_MAIN,
      showLabel: true,
      showIcon: true,
      labelStyle: {
        fontSize: 10,
      },
      style: {
        backgroundColor: BLUE_LIGHT,
        height: 60,
        borderTopColor: 'transparent',
      },
      tabStyle: {
        width: 100,
      },
    },
  },
);

export const AppStack = createStackNavigator(
  {
    ['Tabs']: Tabs,
    [SETTING_ROUTE]: SettingScreen,
    [RESET_ROUTE]: ChangePassword,
    [EDIT_PROFILE_ROUTE]: EditProfile,
    [PROFILE_ROUTE]: Profile,
    [EDIT_LOCATION_ROUTE]: EditLocation,
    [AVAILABILITY_ROUTE]: Availability,
    [POSITION_ROUTE]: Position,
    [RATE_EMPLOYER_ROUTE]: RateEmployer,
    [REVIEWS_ROUTE]: Reviews,
    [INVITE_DETAILS_ROUTE]: {
      screen: InviteDetails,
      path: 'invite/:inviteId',
    },
    [INVITE_DETAILS_NEW_ROUTE]: {
      screen: InviteDetailsNew,
    },
    [JOB_DETAILS_ROUTE]: {
      screen: JobDetailsScreen,
      path: 'shift/:shiftId',
    },
    [JOB_DETAILS_NEW_ROUTE]: {
      screen: JobDetailsNewScreen,
    },
    [JOB_DETAILS_NEW_ONE_ROUTE]: {
      screen: JobDetailsNewOneScreen,
    },
    [JOB_DETAILS_NEW_TWO_ROUTE]: {
      screen: JobDetailsNewTwoScreen,
    },
    [JOB_WORK_MODE_ROUTE]: {
      screen: JobWorkModeScreen,
    },
    [APPLICATION_DETAILS_ROUTE]: {
      screen: JobDetailsScreen,
      path: 'application/:applicationId',
    },
  },
  { navigationOptions: { header: null } },
);

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: Splash,
    [AUTH_ROUTE]: AuthStack,
    [APP_ROUTE]: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const prefix = 'https://talent.jobcore.co/';

export default () => (
  <Root>
    <SwitchNavigator uriPrefix={prefix} />
  </Root>
);
