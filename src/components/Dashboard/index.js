import React, { Component } from "react";
import {
  View,
  Image,
  RefreshControl,
} from "react-native";
import { Container, Header, Content, Text, Button, Left, Icon, Body, Title, Right, Segment, Spinner } from "native-base";
import styles from './style';
import { VIOLET_MAIN, BLUE_MAIN, BLUE_DARK } from "../../constants/colorPalette";
import { SETTING_ROUTE, AUTH_ROUTE } from "../../constants/routes";
import accountStore from '../Account/AccountStore';
import * as inviteActions from '../Invite/actions';
import inviteStore from '../Invite/InviteStore';
import * as jobActions from '../MyJobs/actions';
import jobStore from '../MyJobs/JobStore';
import { CustomToast } from '../../utils/components';
import { LOG, WARN, ERROR } from "../../utils";
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';

class DashboardScreen extends Component {

  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('DASHBOARD.dashboard'),
    tabBarIcon: ({ tintColor }) => (
      <Image
                style={{resizeMode: 'contain', height: 30}}
                source={require('../../assets/image/dashboard.png')}
            />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      user: accountStore.getState("Login").user || {},
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
    this.logoutSubscription = accountStore
      .subscribe('Logout', (data) => {
        this.logoutHandler(data);
      });

    this.loginSubscription = accountStore
      .subscribe('Login', (data) => {
        this.loginHandler(data);
      });

    this.getEmployeeSubscription = inviteStore
      .subscribe('GetJobPreferences', (data) => {
        this.getEmployeeHandler(data);
      });

    this.stopReceivingInvitesSubscription = inviteStore
      .subscribe('StopReceivingInvites', (data) => {
        this.stopReceivingInvitesHandler(data);
      });

    this.getJobInvitesSubscription = inviteStore
      .subscribe('JobInvites', (jobInvites) => {
        this.getJobInvitesHandler(jobInvites);
      });

    this.getUpcomingJobsSubscription = jobStore
      .subscribe('GetUpcomingJobs', (data) => {
        this.getJobsHandler(data);
      });

    this.inviteStoreError = inviteStore
      .subscribe('InviteStoreError', (err) => {
        this.errorHandler(err)
      });

    this.firstLoad();
  }

  componentWillUnmount() {
    this.logoutSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
    this.getEmployeeSubscription.unsubscribe();
    this.stopReceivingInvitesSubscription.unsubscribe();
    this.getJobInvitesSubscription.unsubscribe();
    this.getUpcomingJobsSubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
  }

  logoutHandler = (data) => {
    this.props.navigation.navigate(AUTH_ROUTE);
  }

  loginHandler = (data) => {
    let user;

    try {
      user = data.user;
    } catch (e) {
      return LOG(this, data);
    }

    this.setState({ user: user });
  }

  getEmployeeHandler = (data) => {
    this.setState({
      isLoading: false,
      isRefreshing: false,
      stopReceivingInvites: data.stop_receiving_invites,
      rating: data.rating || 'N/A',
    });
  }

  stopReceivingInvitesHandler = (data) => {
    this.setState({
      stopReceivingInvites: data.stop_receiving_invites,
    });
  }

  getJobInvitesHandler = (invites) => {
    this.setState({ invites });
  }

  getJobsHandler = (upcomingJobs) => {
    this.setState({ upcomingJobs });
  }

  errorHandler = (err) => {
    this.setState({
      isLoading: false,
      isRefreshing: false,
    });
    CustomToast(err, 'danger');
  }

  render() {
    if (this.state.isLoading) {
      return (<View style={styles.container}>
                <Spinner color={BLUE_DARK}/>
            </View>);
    }

    return (<I18n>{(t, { i18n }) => (
            <Container>
                <Header androidStatusBarColor={BLUE_MAIN} style={styles.headerCustom}>
                    <Left/>
                    <Body>
                    <Title style={styles.titleHeader}>
                      {t('DASHBOARD.dashboard')}
                    </Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate(SETTING_ROUTE)}>
                            <Image
                                style={{resizeMode: 'contain', height: 25,}}
                                source={require('../../assets/image/controls.png')}
                            />
                        </Button>
                    </Right>
                </Header>
                <Content refreshControl={
                  <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.refresh}/>
                  }>
                    <Text style={styles.textHello}>
                      {`${t('DASHBOARD.hello')} ${this.state.user.first_name} ${this.state.user.last_name},`}
                    </Text>
                    <Text style={styles.textWelcome}>
                      {t('DASHBOARD.welcome')}
                    </Text>

                    <View style={styles.viewDashboard}>
                        <View style={styles.viewItemJobsLeft}>
                            <Text style={styles.titleItem}>
                              {t('DASHBOARD.pendingPayments')}
                            </Text>
                            <Image
                                style={styles.viewBackground}
                                source={require('../../assets/image/payments.png')}
                            />
                            <Text style={styles.itemData}>
                              {this.state.pendingPayments}
                            </Text>
                        </View>
                        <View style={styles.viewItemJobsRight}>
                            <Text style={styles.titleItem}>
                              {t('DASHBOARD.invitations')}
                            </Text>
                            <Image
                                style={styles.imgJobs}
                                source={require('../../assets/image/invite.png')}
                            />
                            {(Array.isArray(this.state.invites)) ?
                            <Text style={styles.itemData}>
                              {this.state.invites.length}
                            </Text>
                           : null}
                        </View>
                    </View>

                    <View style={styles.viewDashboard}>
                        <View style={styles.viewItemJobsLeft}>
                            <Text style={styles.titleItem}>
                              {t('DASHBOARD.upcomingJobs')}
                            </Text>
                            <Image
                                style={styles.viewBackground}
                                source={require('../../assets/image/jobs.png')}
                            />
                            {(Array.isArray(this.state.upcomingJobs)) ?
                            <Text style={styles.itemData}>
                              {this.state.upcomingJobs.length}
                            </Text>
                           : null}
                        </View>
                        <View style={styles.viewItemJobsRight}>
                            <Text style={styles.titleItem}>
                              {t('DASHBOARD.myRating')}
                            </Text>
                            <Image
                                style={styles.viewBackground}
                                source={require('../../assets/image/ranking.png')}
                            />
                            <Text style={styles.itemData}>
                              {this.state.rating}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.viewInvite}>
                        <Text style={styles.titleInvite}>
                          {t('DASHBOARD.stopReceivingInvites')}
                        </Text>
                        <Segment>
                            <Text style={styles.itemInvite}>
                              {t('DASHBOARD.y')}
                            </Text>
                            <Button onPress={this.stopReceivingInvites} style={styles[(this.state.stopReceivingInvites) ? 'buttonLeftActive' : 'buttonLeftInactive']} first active>
                              <Icon name={(this.state.stopReceivingInvites) ? "md-radio-button-on" : "md-radio-button-off"} size={5}/>
                            </Button>
                            <Button onPress={this.startReceivingInvites} style={styles[(this.state.stopReceivingInvites) ? 'buttonRightInactive' : 'buttonRightActive']} last>
                              <Icon style={{color: VIOLET_MAIN}} name={(this.state.stopReceivingInvites) ? "md-radio-button-off" : "md-radio-button-on"} size={5}/>
                            </Button>
                            <Text style={styles.itemInvite}>
                              {t('DASHBOARD.n')}
                            </Text>
                        </Segment>
                    </View>
                </Content>
            </Container>
          )}</I18n>);
  }

  firstLoad = () => {
    this.setState({ isLoading: true }, () => {
      this.getEmployee();
      this.getInvites();
      this.getUpcomingJobs();
    });
  }

  reFresh = () => {
    this.setState({ isRefreshing: true }, () => {
      this.getEmployee();
      this.getInvites();
      this.getUpcomingJobs();
    });
  }


  getEmployee = () => {
    inviteActions.getJobPreferences();
  }

  stopReceivingInvites = () => {
    inviteActions.stopReceivingInvites(true);
  }

  startReceivingInvites = () => {
    inviteActions.stopReceivingInvites(false);
  }

  getInvites = () => {
    inviteActions.getJobInvites();
  }

  getUpcomingJobs = () => {
    jobActions.getUpcomingJobs();
  }
}

export default DashboardScreen;
