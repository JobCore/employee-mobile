import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import { YellowBox } from 'react-native';

import { Root } from 'native-base';
import LoginScreen from './src/components/Account/LoginScreen';
import RegisterScreen from './src/components/Account/RegisterScreen';
import EditProfile from './src/components/Account/EditProfile';
import UploadDocumentScreen from './src/components/Account/UploadDocumentScreen';
import BankAccounts from './src/components/BankAccounts/BankAccounts';
import AddBankAccount from './src/components/BankAccounts/AddBankAccount';
import ForgotScreen from './src/components/Account/ForgotScreen';
import TermsAndConditionsScreen from './src/components/Account/TermsAndConditionsScreen';
import ChangePassword from './src/components/Account/ChangePassword';
import PublicProfile from './src/components/Account/PublicProfile';
import Profile from './src/components/Account/Profile';
import DashboardScreen from './src/components/Dashboard';
import JobInvites from './src/components/Invite/JobInvites';
import InviteDetailsV2 from './src/components/Invite/InviteDetailsV2';
import JobPreferences from './src/components/Invite/JobPreferences';
import Position from './src/components/Invite/Position';
import Availability from './src/components/Invite/Availability';
import MyJobs from './src/components/MyJobs';
import RateEmployer from './src/components/MyJobs/RateEmployer';
import UpcomingJobScreen from './src/components/MyJobs/UpcomingJobScreen';
import JobDetailsNewOneScreen from './src/components/MyJobs/WorkModeScreen';
import JobDetailsNewTwoScreen from './src/components/MyJobs/JobDetailsNewTwo';
import JobPaymentsScreen from './src/components/MyJobs/JobPayments';
import WorkModeScreen from './src/components/MyJobs/WorkModeScreen';
import Reviews from './src/components/MyJobs/Reviews';
import Help from './src/components/Help';
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
  INVITE_DETAILS_ROUTE_V2,
  POSITION_ROUTE,
  EDIT_LOCATION_ROUTE,
  RATE_EMPLOYER_ROUTE,
  REVIEWS_ROUTE,
  JOB_DETAILS_NEW_ONE_ROUTE,
  JOB_DETAILS_NEW_TWO_ROUTE,
  JOB_PAYMENTS_ROUTE,
  HELP_ROUTE,
  TERMS_AND_CONDITIONS_ROUTE,
} from './src/constants/routes';
import {
  BLUE_DARK,
  BLUE_LIGHT,
  GRAY_MAIN,
  BLUE_SEMI_LIGHT,
} from './src/shared/colorPalette';

import SettingScreen from './src/components/Setting';
import Splash from './src/components/Splash';
import EditLocation from './src/components/Invite/EditLocation';
import ApplicationDetailScreen from './src/components/MyJobs/ApplicationDetailScreen';
import JobCompletedScreen from './src/components/MyJobs/JobCompletedScreen';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Warning: Failed prop type',
  'Module RCTImageLoader',
]);
window.DEBUG = false;

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
  [TERMS_AND_CONDITIONS_ROUTE]: TermsAndConditionsScreen,
});

export const Tabs = createBottomTabNavigator(
  {
    [DASHBOARD_ROUTE]: { screen: DashboardScreen },
    [JOB_INVITES_ROUTE]: { screen: JobInvites },
    [JOB_PREFERENCES_ROUTE]: { screen: JobPreferences },
    [MYJOBS_ROUTE]: { screen: MyJobs },
    [Profile.routeName]: { screen: Profile },
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
    Tabs,
    [SETTING_ROUTE]: SettingScreen,
    [RESET_ROUTE]: ChangePassword,
    [UploadDocumentScreen.routeName]: UploadDocumentScreen,
    [BankAccounts.routeName]: BankAccounts,
    [AddBankAccount.routeName]: AddBankAccount,
    [EditProfile.routeName]: EditProfile,
    [PublicProfile.routeName]: PublicProfile,
    [EDIT_LOCATION_ROUTE]: EditLocation,
    [AVAILABILITY_ROUTE]: Availability,
    [POSITION_ROUTE]: Position,
    [RATE_EMPLOYER_ROUTE]: RateEmployer,
    [REVIEWS_ROUTE]: Reviews,
    // [INVITE_DETAILS_ROUTE]: {
    //   screen: InviteDetails,
    //   path: 'invite/:inviteId',
    // },
    [INVITE_DETAILS_ROUTE_V2]: {
      screen: InviteDetailsV2,
      path: 'invite/:inviteId',
    },
    [UpcomingJobScreen.routeName]: {
      screen: UpcomingJobScreen,
      path: 'shift/:shiftId',
    },
    [WorkModeScreen.routeName]: {
      screen: WorkModeScreen,
    },
    [JOB_DETAILS_NEW_ONE_ROUTE]: {
      screen: JobDetailsNewOneScreen,
    },
    [JOB_DETAILS_NEW_TWO_ROUTE]: {
      screen: JobDetailsNewTwoScreen,
    },
    [JOB_PAYMENTS_ROUTE]: {
      screen: JobPaymentsScreen,
    },
    [ApplicationDetailScreen.routeName]: {
      screen: ApplicationDetailScreen,
      path: 'application/:applicationId',
    },
    [JobCompletedScreen.routeName]: {
      screen: JobCompletedScreen,
      path: 'job-completed/:shiftId',
    },
    [HELP_ROUTE]: {
      screen: Help,
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
