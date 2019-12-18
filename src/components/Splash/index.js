import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  APP_ROUTE,
  AUTH_ROUTE,
  UPDATE_APP_ROUTE,
} from '../../constants/routes';
import store from '../Account/AccountStore';
import { getData } from '../../fetch';
import DeviceInfo from 'react-native-device-info';
import { LOG } from '../../shared';
import accountStore from '../Account/AccountStore';
import * as accountActions from '../Account/actions';
import SPLASH_IMG from '../../assets/image/splash.png';

class Splash extends Component {
  state = {
    currentVersion: DeviceInfo.getBuildNumber(),
  };
  componentDidMount() {
    const { currentVersion } = this.state;
    // console.log('current version ', currentVersion);
    getData('/version', false)
      .then((response) => {
        if (currentVersion < response.version) {
          this.props.navigation.navigate(UPDATE_APP_ROUTE);
        }
      })
      .catch((err) => {
        console.log('fetch error:', err);
      });
    setTimeout(() => {
      this._bootstrapAsync();
    }, 1000);

    this.loginSubscription = accountStore.subscribe('Login', (user) =>
      this.loginHandler(user),
    );
  }

  componentWillUnmount() {
    this.loginSubscription.unsubscribe();
  }

  loginHandler = async (user) => {
    let status;
    let token;

    try {
      token = user.token;
      status = user.user.profile.status;
    } catch (e) {
      LOG(this, e);
    }
    console.log(`DEBUG:token:`, token);
    if (token && status && status !== 'PENDING_EMAIL_VALIDATION') {
      return this.props.navigation.navigate(APP_ROUTE);
    }

    this.props.navigation.navigate(AUTH_ROUTE);
  };

  // Fetch the token from AsycnStorage/FluxState then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let userData = await store.getState('Login');

    if (!userData || !userData.token) {
      const userString = await AsyncStorage.getItem('user');

      try {
        userData = JSON.parse(userString);
      } catch (e) {
        LOG(this, e);
      }
    }

    accountActions.setStoredUser(userData || {});
  };

  // Render any loading content that you like here
  render() {
    return <ImageBackground source={SPLASH_IMG} style={styles.imgSplash} />;
  }
}

export default Splash;

const styles = StyleSheet.create({
  imgSplash: { width: '100%', height: '100%' },
});
