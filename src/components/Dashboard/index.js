import React, { Component } from 'react';
import { Image, RefreshControl, TouchableOpacity, View } from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Icon,
  ListItem,
  Segment,
  Text,
  Thumbnail,
} from 'native-base';
import styles from './style';
import { BLUE_DARK, VIOLET_MAIN } from '../../shared/colorPalette';
import {
  AUTH_ROUTE,
  INVITE_DETAILS_ROUTE_V2,
  JOB_DETAILS_NEW_TWO_ROUTE,
  JOB_INVITES_ROUTE,
  MYJOBS_ROUTE,
  REVIEWS_ROUTE,
  JOB_PAYMENTS_ROUTE,
} from '../../constants/routes';
import accountStore from '../Account/AccountStore';
import * as accountActions from '../Account/actions';
import * as inviteActions from '../Invite/actions';
import inviteStore from '../Invite/InviteStore';
import * as fcmActions from './actions';
import fcmStore from './FcmStore';
import * as jobActions from '../MyJobs/actions';
import jobStore from '../MyJobs/JobStore';
import {
  BackgroundHeader,
  CustomToast,
  Loading,
} from '../../shared/components';
import { LOG, WARN, storeErrorHandler } from '../../shared';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import PROFILE_IMG from '../../assets/image/profile.png';
import { TabHeader } from '../../shared/components/TabHeader';
import preferencesStyles from '../Invite/JobPreferencesStyle';
import { fetchActiveShifts } from '../MyJobs/actions';
import WorkModeScreen from '../MyJobs/WorkModeScreen';
import { getOpenClockIns } from '../MyJobs/actions';
import EditProfile from '../Account/EditProfile';
import Profile from '../Account/Profile';
import { HELP_ROUTE } from '../../constants/routes';
import getMomentNowDiff from '../../shared/getMomentNowDiff';
import moment from 'moment';

/**
 *
 */
class DashboardScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('DASHBOARD.dashboard'),
    tabBarIcon: () => (
      <Image
        style={{ resizeMode: 'contain', height: 42, width: 42 }}
        source={require('../../assets/image/dashboard.png')}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      user: (accountStore.getState('Login') || {}).user || {},
      isLoading: false,
      isRefreshing: false,
      stopReceivingInvites: false,
      rating: 0,
      payments: 0,
      invites: [],
      upcomingJobs: [],
      activeShift: null,
    };
  }

  async componentDidMount() {
    let openClockIns = [];
    try {
      openClockIns = await getOpenClockIns();
    } catch (e) {
      console.log(`SPLASH:openClockins`, e);
    }
    console.log(`DEBUG:openClockIns`, openClockIns);

    if (openClockIns.length > 0) {
      const shift = openClockIns[0].shift;
      const shiftIsOpen = getMomentNowDiff(shift.ending_at) >= 0;

      if (shiftIsOpen) {
        return this.props.navigation.navigate(WorkModeScreen.routeName, {
          shiftId: shift.id,
        });
      } else {
        navigator.geolocation.getCurrentPosition((data) => {
          this.setState({ isLoading: true }, () => {
            jobActions.clockOut(
              shift.id,
              data.coords.latitude,
              data.coords.longitude,
              moment.utc(),
            );
          });
        }, (err) => CustomToast(storeErrorHandler(err), 'danger'));
      }
    }

    this.clockOutSubscription = jobStore.subscribe(
      'ClockOut',
      this.clockOutHandler
    );
    this.logoutSubscription = accountStore.subscribe(
      'Logout',
      this.logoutHandler,
    );
    this.logoutSubscription = accountStore.subscribe(
      'ActiveShifts',
      (shift) => {
        if (shift) this.setState({ activeShift: shift });
      },
    );
    this.loginSubscription = accountStore.subscribe('Login', (data) => {
      this.loginHandler(data);
    });

    this.getEmployeeSubscription = inviteStore.subscribe(
      'GetJobPreferences',
      (data) => {
        this.getEmployeeHandler(data);
      },
    );

    this.stopReceivingInvitesSubscription = inviteStore.subscribe(
      'StopReceivingInvites',
      (data) => {
        this.stopReceivingInvitesHandler(data);
      },
    );

    this.getJobInvitesSubscription = inviteStore.subscribe(
      'JobInvites',
      (jobInvites) => {
        this.getJobInvitesHandler(jobInvites);
      },
    );

    this.getUpcomingJobsSubscription = jobStore.subscribe(
      'GetUpcomingJobs',
      (data) => {
        this.getJobsHandler(data);
      },
    );

    this.updateTokenSubscription = fcmStore.subscribe(
      'UpdateFcmToken',
      (data) => {
        const session = accountStore.getState('Login');
        session.fcmToken = data.registration_id;
        accountActions.setStoredUser(session);
        LOG(this, `fcmToken updated ${data.registration_id}`);
      },
    );

    this.fcmStoreError = fcmStore.subscribe('FcmStoreError', (err) => {
      this.errorHandler(err);
    });

    this.inviteStoreError = inviteStore.subscribe('InviteStoreError', (err) => {
      this.errorHandler(err);
    });

    this.accountStoreError = accountStore.subscribe(
      'AccountStoreError',
      this.errorHandler,
    );

    this.onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh((fcmToken) => {
        let fcmTokenStored;

        try {
          fcmTokenStored = accountStore.getState('Login').fcmToken;
        } catch (e) {
          return WARN(this, 'failed to get fcmToken from Store');
        }

        if (!fcmTokenStored) return WARN(this, 'No Token on state');

        this.updateFcmToken(fcmTokenStored, fcmToken);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        if (notificationOpen) {
          // const action = notificationOpen.action;
          const notification = notificationOpen.notification;
          this.pushNotificationHandler(notification.data);
        }
      });

    firebase
      .notifications()
      .getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          // const action = notificationOpen.action;
          const notification = notificationOpen.notification;
          this.pushNotificationHandler(notification.data);
        }
      });

    this.hasFcmMessagePermission();
    this.firstLoad();
    this.getFcmToken();
    fetchActiveShifts();

    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('@JobCore:isFirstLogin');
        if (value !== null) {
          // We have data!!
          this.props.navigation.navigate(HELP_ROUTE);
          AsyncStorage.setItem('@JobCore:isFirstLogin', false);
        }
      } catch (error) {
        // Error retrieving data
      }
    };
  }

  componentWillUnmount() {
    this.logoutSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
    this.getEmployeeSubscription.unsubscribe();
    this.stopReceivingInvitesSubscription.unsubscribe();
    this.getJobInvitesSubscription.unsubscribe();
    this.getUpcomingJobsSubscription.unsubscribe();
    this.updateTokenSubscription.unsubscribe();
    this.fcmStoreError.unsubscribe();
    this.inviteStoreError.unsubscribe();
    this.accountStoreError.unsubscribe();
    this.onTokenRefreshListener();
    this.notificationOpenedListener();
  }

  logoutHandler = () => {
    this.props.navigation.navigate(AUTH_ROUTE);
  };

  loginHandler = (data) => {
    let user;

    try {
      user = data.user;
    } catch (e) {
      return LOG(this, data);
    }

    this.setState({ user: user });
  };

  getEmployeeHandler = (data) => {
    this.setState({
      isLoading: false,
      isRefreshing: false,
      stopReceivingInvites: data.stop_receiving_invites,
      rating: data.rating || 'N/A',
      payments: data.total_pending_payments,
    });
  };

  stopReceivingInvitesHandler = (data) => {
    this.setState({
      stopReceivingInvites: data.stop_receiving_invites,
    });
  };

  getJobInvitesHandler = (invites) => {
    this.setState({ invites });

    // set invitationCount param for the badge on invitations tab
    if (Array.isArray(invites)) {
      const setParamsAction = NavigationActions.setParams({
        params: { invitationCount: invites.length },
        key: JOB_INVITES_ROUTE,
      });

      this.props.navigation.dispatch(setParamsAction);
    }
  };

  getJobsHandler = (upcomingJobs) => {
    this.setState({ upcomingJobs });
  };

  pushNotificationHandler = (notificationData) => {
    if (!notificationData) {
      return LOG(this, 'no notification data');
    }

    if (notificationData.type === 'shift' && notificationData.id) {
      this.props.navigation.navigate(JOB_DETAILS_NEW_TWO_ROUTE, {
        shiftId: notificationData.id,
      });

      this.getUpcomingJobs();
    }

    if (notificationData.type === 'application' && notificationData.id) {
      this.props.navigation.navigate(JOB_DETAILS_NEW_TWO_ROUTE, {
        applicationId: notificationData.id,
      });

      this.getPendingJobs();
    }

    if (notificationData.type === 'invite' && notificationData.id) {
      this.props.navigation.navigate(INVITE_DETAILS_ROUTE_V2, {
        inviteId: notificationData.id,
      });

      console.log('Notification :: ', notificationData.type);

      this.getInvites();
    }

    if (notificationData.type === 'rating') {
      this.props.navigation.navigate(REVIEWS_ROUTE);
    }
  };

  errorHandler = (err) => {
    this.setState({
      isLoading: false,
      isRefreshing: false,
    });
    CustomToast(err, 'danger');
  };

  render() {
    const { activeShift } = this.state;
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            <TabHeader
              title={t('DASHBOARD.dashboard')}
              screenName={'dashboard'}
            />
            {activeShift && (
              <TouchableOpacity
                onPress={() => {
                  console.log(`DEBUG:DEBUG:DEBUG:DEBUG:`);
                  this.props.navigation.navigate(WorkModeScreen.routeName, {
                    shiftId: activeShift.id,
                  });
                }}>
                <View style={preferencesStyles.viewWarning}>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>
                    Active Shift: {activeShift.position.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <Content
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.refresh}
                />
              }>
              <View style={{ flex: 2 }}>
                <BackgroundHeader>
                  <ListItem noBorder style={styles.welcomeItem}>
                    <TouchableOpacity onPress={this.goToProfile}>
                      <Thumbnail
                        large
                        source={
                          this.state.user &&
                          this.state.user.profile &&
                          this.state.user.profile.picture
                            ? { uri: this.state.user.profile.picture }
                            : PROFILE_IMG
                        }
                      />
                    </TouchableOpacity>
                    <Body>
                      <TouchableOpacity onPress={this.goToEditProfile}>
                        {this.state.user ? (
                          <Text style={styles.textHello}>
                            {`${t('DASHBOARD.hello')} ${
                              this.state.user.first_name
                            } ${this.state.user.last_name},`}
                          </Text>
                        ) : null}
                        <Text style={styles.textWelcome}>
                          {t('DASHBOARD.welcome')}
                        </Text>
                      </TouchableOpacity>
                    </Body>
                  </ListItem>
                </BackgroundHeader>
              </View>
              <View
                style={[
                  styles.viewDashboard,
                  { flex: 2, paddingTop: 10, paddingBottom: 10 },
                ]}>
                <View style={styles.viewItemJobsLeft}>
                  <TouchableOpacity onPress={this.goToPayments}>
                    <Text style={styles.titleItem}>
                      {t('PAYMENTS.payments')}
                    </Text>
                    <Image
                      style={styles.iconSize}
                      source={require('../../assets/image/payments.png')}
                    />
                    <Text style={styles.itemData}>
                      ${this.state.payments.toFixed(2)}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.viewItemJobsRight}>
                  <TouchableOpacity onPress={this.goToInvitation}>
                    <Text style={styles.titleItem}>
                      {t('DASHBOARD.invitations')}
                    </Text>
                    <Image
                      style={styles.iconSize}
                      source={require('../../assets/image/invite.png')}
                    />
                  </TouchableOpacity>

                  {Array.isArray(this.state.invites) ? (
                    <Text style={styles.itemData}>
                      {this.state.invites.length}
                    </Text>
                  ) : null}
                </View>
              </View>

              <View
                style={[
                  styles.viewDashboard,
                  { flex: 2, paddingTop: 10, paddingBottom: 10 },
                ]}>
                <View style={styles.viewItemJobsLeft}>
                  <TouchableOpacity onPress={this.goToMyJobs}>
                    <Text style={styles.titleItem}>
                      {t('DASHBOARD.upcomingJobs')}
                    </Text>
                    <Image
                      style={styles.iconSize}
                      source={require('../../assets/image/jobs.png')}
                    />
                  </TouchableOpacity>
                  {Array.isArray(this.state.upcomingJobs) ? (
                    <Text style={styles.itemData}>
                      {this.state.upcomingJobs.length}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.viewItemJobsRight}>
                  <TouchableOpacity onPress={this.goToReviews}>
                    <Text style={styles.titleItem}>
                      {t('DASHBOARD.myRating')}
                    </Text>
                    <Image
                      style={styles.iconSize}
                      source={require('../../assets/image/ranking.png')}
                    />
                  </TouchableOpacity>
                  <Text style={styles.itemData}>{this.state.rating}</Text>
                </View>
              </View>

              <View style={[styles.viewInvite, { flex: 2 }]}>
                <Text style={styles.titleInvite}>
                  {t('DASHBOARD.stopReceivingInvites')}
                </Text>
                <Segment>
                  <Text style={styles.itemInvite}>{t('DASHBOARD.y')}</Text>
                  <Button
                    onPress={this.stopReceivingInvites}
                    style={
                      styles[
                        this.state.stopReceivingInvites
                          ? 'buttonLeftActive'
                          : 'buttonLeftInactive'
                      ]
                    }
                    first
                    active>
                    <Icon
                      style={{ color: BLUE_DARK }}
                      name={
                        this.state.stopReceivingInvites
                          ? 'md-radio-button-on'
                          : 'md-radio-button-off'
                      }
                      size={5}
                    />
                  </Button>
                  <Button
                    onPress={this.startReceivingInvites}
                    style={
                      styles[
                        this.state.stopReceivingInvites
                          ? 'buttonRightInactive'
                          : 'buttonRightActive'
                      ]
                    }
                    last>
                    <Icon
                      style={{ color: VIOLET_MAIN }}
                      name={
                        this.state.stopReceivingInvites
                          ? 'md-radio-button-off'
                          : 'md-radio-button-on'
                      }
                      size={5}
                    />
                  </Button>
                  <Text style={styles.itemInvite}>{t('DASHBOARD.n')}</Text>
                </Segment>
              </View>
            </Content>
          </Container>
        )}
      </I18n>
    );
  }

  firstLoad = () => {
    this.setState({ isLoading: true }, () => {
      this.getEmployee();
      this.getInvites();
      this.getUpcomingJobs();
    });
  };

  refresh = () => {
    this.setState({ isRefreshing: true });

    this.getEmployee();
    this.getInvites();
    this.getUpcomingJobs();
  };

  getFcmToken = () => {
    let fcmTokenStored;

    try {
      fcmTokenStored = accountStore.getState('Login').fcmToken;
    } catch (e) {
      return WARN(this, 'failed to get fcmToken from Store');
    }

    if (!fcmTokenStored) return WARN(this, 'No Token on state');

    firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        console.log(`DEBUG:firebaseToken:`, fcmToken);
        if (fcmToken) {
          if (fcmTokenStored !== fcmToken) {
            return this.updateFcmToken(fcmTokenStored, fcmToken);
          }
        } else {
          WARN(this, 'NoTokenYet');
        }
      });
  };

  updateFcmToken = (currentFcmToken, fcmToken) => {
    fcmActions.updateFcmToken(currentFcmToken, fcmToken);
  };

  hasFcmMessagePermission = () => {
    firebase
      .messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          LOG(this, 'FCM has persmission');
        } else {
          LOG(this, 'FCM not permitted, requesting Permission');
          this.requestFcmMessagesPermission();
        }
      });
  };

  requestFcmMessagesPermission = () => {
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        LOG(this, 'FCM authorized by the user');
      })
      .catch(() => {
        LOG(this, 'FCM permission rejected');
      });
  };

  goToInvitation = () => {
    this.props.navigation.navigate(JOB_INVITES_ROUTE);
  };

  goToEditProfile = () => {
    this.props.navigation.navigate(EditProfile.routeName);
  };

  goToMyJobs = () => {
    const tabAction = 'getUpcomingJobs';
    this.props.navigation.navigate(MYJOBS_ROUTE, { tabAction });
  };

  goToProfile = () => {
    this.props.navigation.navigate(Profile.routeName);
  };

  goToReviews = () => {
    this.props.navigation.navigate(REVIEWS_ROUTE);
  };

  goToPayments = () => {
    this.props.navigation.navigate(JOB_PAYMENTS_ROUTE);
  };

  getEmployee = () => {
    inviteActions.getJobPreferences();
  };

  stopReceivingInvites = () => {
    inviteActions.stopReceivingInvites(true);
  };

  startReceivingInvites = () => {
    inviteActions.stopReceivingInvites(false);
  };

  getInvites = () => {
    inviteActions.getJobInvites();
  };

  getUpcomingJobs = () => {
    jobActions.getUpcomingJobs();
  };

  getPendingJobs = () => {
    jobActions.getPendingJobs();
  };

  clockOutHandler = () => {
    this.setState({ isLoading: false });
  }
}

export default DashboardScreen;
