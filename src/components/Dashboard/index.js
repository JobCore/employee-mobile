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
  EDIT_PROFILE_ROUTE,
  INVITE_DETAILS_ROUTE,
  JOB_DETAILS_ROUTE,
  JOB_INVITES_ROUTE,
  MYJOBS_ROUTE,
  PROFILE_ROUTE,
  REVIEWS_ROUTE,
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
import { LOG, WARN } from '../../shared';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import PROFILE_IMG from '../../assets/image/profile.png';
import { TabHeader } from '../../shared/components/TabHeader';

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
      pendingPayments: 'N/A',
      invites: [],
      upcomingJobs: [],
    };
  }

  componentDidMount() {
    this.logoutSubscription = accountStore.subscribe('Logout', (data) => {
      this.logoutHandler(data);
    });

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

    LOG(this, JSON.stringify(notificationData));

    if (notificationData.type === 'shift' && notificationData.id) {
      this.props.navigation.navigate(JOB_DETAILS_ROUTE, {
        shiftId: notificationData.id,
      });

      this.getUpcomingJobs();
    }

    if (notificationData.type === 'application' && notificationData.id) {
      this.props.navigation.navigate(JOB_DETAILS_ROUTE, {
        applicationId: notificationData.id,
      });

      this.getPendingJobs();
    }

    if (notificationData.type === 'invite' && notificationData.id) {
      this.props.navigation.navigate(INVITE_DETAILS_ROUTE, {
        inviteId: notificationData.id,
      });

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
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            <TabHeader
              title={t('DASHBOARD.dashboard')}
              onPressHelp={this.goToEditProfile}
            />
            <Content
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.refresh}
                />
              }>
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
              <View
                style={[
                  { flex: 4 },
                  styles.viewDashboard,
                  { marginTop: 40, flex: 2 },
                ]}>
                <View style={styles.viewItemJobsLeft}>
                  <Text style={styles.titleItem}>
                    {t('DASHBOARD.pendingPayments')}
                  </Text>
                  <Image
                    style={styles.iconSize}
                    source={require('../../assets/image/payments.png')}
                  />
                  <Text style={styles.itemData}>
                    {this.state.pendingPayments}
                  </Text>
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
                  { flex: 40 },
                  styles.viewDashboard,
                  { marginTop: 40, flex: 2 },
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

              <View style={[styles.viewInvite, { marginTop: 40, flex: 2 }]}>
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
    this.props.navigation.navigate(EDIT_PROFILE_ROUTE);
  };

  goToMyJobs = () => {
    const tabAction = 'getUpcomingJobs';
    this.props.navigation.navigate(MYJOBS_ROUTE, { tabAction });
  };

  goToProfile = () => {
    this.props.navigation.navigate(PROFILE_ROUTE);
  };

  goToReviews = () => {
    this.props.navigation.navigate(REVIEWS_ROUTE);
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
}

export default DashboardScreen;
