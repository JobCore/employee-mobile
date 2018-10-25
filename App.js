import React, { Component } from "react";
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { YellowBox, Image } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Warning: Failed prop type', 'Module RCTImageLoader']);

import { Root } from "native-base";

import LoginScreen from './src/components/Account/LoginScreen';
import RegisterScreen from './src/components/Account/RegisterScreen';
import EditProfile from './src/components/Account/EditProfile';
import ForgotScreen from './src/components/Account/ForgotScreen';

import DashboardScreen from './src/components/Dashboard';
import JobInvites from './src/components/Invite/JobInvites';
import InviteDetails from './src/components/Invite/InviteDetails';
import JobPreferences from './src/components/Invite/JobPreferences';
import Position from './src/components/Invite/Position';
import Availability from './src/components/Invite/Availability';
import MyJobs from './src/components/MyJobs';
import JobDetailsScreen from './src/components/MyJobs/JobDetails';

import { DASHBOARD_ROUTE, TABBAR_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, FORGOT_ROUTE, JOB_INVITES_ROUTE, JOB_PREFERENCES_ROUTE, MYJOBS_ROUTE, SETTING_ROUTE, APP_ROUTE, STACK_ROUTE, AUTH_ROUTE, RESET_ROUTE, AVAILABILITY_ROUTE, INVITE_DETAILS_ROUTE, EDIT_PROFILE_ROUTE, POSITION_ROUTE, JOB_DETAILS_ROUTE } from './src/constants/routes'
import { BLUE_MAIN, BLUE_DARK, BLUE_LIGHT, GRAY_MAIN, BLUE_SEMI_LIGHT } from './src/constants/colorPalette'

import SettingScreen from './src/components/Setting';

import Splash from './src/components/Splash';

window.DEBUG = true;

export const AppStack = createStackNavigator({
    [DASHBOARD_ROUTE]: DashboardScreen,
    [SETTING_ROUTE]: SettingScreen,
});

export const AuthStack = createStackNavigator({
    [LOGIN_ROUTE]: LoginScreen,
    [REGISTER_ROUTE]: RegisterScreen,
    [FORGOT_ROUTE]: ForgotScreen,
});

export const Tabs = createBottomTabNavigator({
        [DASHBOARD_ROUTE]: { screen: DashboardScreen,},
        [JOB_INVITES_ROUTE]: {screen: JobInvites, },
        [JOB_PREFERENCES_ROUTE]: {screen: JobPreferences, },
        [MYJOBS_ROUTE]: {screen: MyJobs, },
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
                borderTopColor: 'transparent'
            },
            tabStyle: {
                width: 100,
            },
        },
    }
);

const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: Splash,
        [APP_ROUTE]: createStackNavigator({
            ['Tabs']: Tabs,
            [SETTING_ROUTE]: SettingScreen,
            [RESET_ROUTE]: ForgotScreen,
            [EDIT_PROFILE_ROUTE]: EditProfile,
            [AVAILABILITY_ROUTE]: Availability,
            [POSITION_ROUTE]: Position,
            [INVITE_DETAILS_ROUTE]: InviteDetails,
            [JOB_DETAILS_ROUTE]: JobDetailsScreen,
        }, {navigationOptions: {header: null}}),
        [AUTH_ROUTE]: AuthStack,
        [STACK_ROUTE]: AppStack
    },

    {
        initialRouteName: 'AuthLoading',
    }
);

export default () => <Root>
    <SwitchNavigator/>
  </Root>
