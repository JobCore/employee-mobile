import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, ImageBackground } from 'react-native';
import { APP_ROUTE, AUTH_ROUTE } from '../../constants/routes';
import store from '../Account/AccountStore';
import { LOG } from '../../shared';
import accountStore from '../Account/AccountStore';
import * as accountActions from '../Account/actions';
import SPLASH_IMG from '../../assets/image/splash.png';
import { getOpenClockIns } from '../MyJobs/actions';
import { error } from 'pure-logger';
import WorkModeScreen from '../MyJobs/WorkModeScreen';

class Splash extends Component {
  componentDidMount() {
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

    let openClockIns = [];
    try {
      openClockIns = await getOpenClockIns();
    } catch (e) {
      error(`Splash:`, e);
    }
    console.log(`DEBUG:openClockIns`, openClockIns);

    if (openClockIns.length > 0) {
      return this.props.navigation.navigate(WorkModeScreen.name, {
        shiftId: openClockIns[0].shift.id,
      });
    }

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
