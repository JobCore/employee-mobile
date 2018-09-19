import React, { Component } from "react";
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { YellowBox, Image } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Warning: Failed prop type', 'Module RCTImageLoader']);

import { Root } from "native-base";

import LoginScreen from './src/components/Account/LoginScreen';
import RegisterScreen from './src/components/Account/RegisterScreen';
import ForgotScreen from './src/components/Account/ForgotScreen';

import DashboardScreen from './src/components/Dashboard';
import JobInvites from './src/components/Invite/JobInvites';
import JobPreferences from './src/components/Invite/JobPreferences';
import MyJobs from './src/components/MyJobs';

import { DASHBOARD_ROUTE, TABBAR_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, FORGOT_ROUTE, JOB_INVITES_ROUTE, JOB_PREFERENCES_ROUTE, MYJOBS_ROUTE, SETTING_ROUTE, APP_ROUTE, STACK_ROUTE, AUTH_ROUTE, RESET_ROUTE } from './src/constants/routes'
import { BLUE_MAIN, BLUE_DARK, BLUE_LIGHT, GRAY_MAIN } from './src/constants/colorPalette'

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
            activeTintColor: BLUE_DARK,
            inactiveTintColor: GRAY_MAIN,
            showLabel: true,
            showIcon: true,
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: BLUE_LIGHT,
                height: 85,
                paddingBottom: 10,
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
