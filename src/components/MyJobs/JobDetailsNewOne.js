import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Header,
  Left,
  Right,
  Body,
  Icon,
  H1,
} from 'native-base';
import styles from '../Invite/InviteDetailsStyle';
import { WHITE_MAIN, BLUE_MAIN } from '../../shared/colorPalette';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import * as inviteActions from './actions';
// import inviteStore from './InviteStore';
// import { JobDetails } from '../../shared/components';
import { LOG } from '../../shared';
import { HeaderDetails } from '../../shared/components';
import DetailsCheck from '../../shared/components/DetailsCheck';
import DetailsTime from '../../shared/components/DetailsTime';
// import IconTime from '../../assets/image/time.png'

class JobDetailsNewOne extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('JOB_INVITES.inviteDetails'),
    tabBarIcon: () => (
      <Image
        style={{ resizeMode: 'contain', height: 30 }}
        source={require('../../assets/image/preferences.png')}
      />
    ),
  };

  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            <Header
              androidStatusBarColor={BLUE_MAIN}
              style={styles.headerCustom}>
              <Left>
                <Button
                  transparent
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon
                    name="ios-close"
                    size={24}
                    style={{ color: WHITE_MAIN, marginLeft: 20 }}
                  />
                </Button>
              </Left>
              <Body>
                <Text style={[{ width: 150 }, styles.titleHeader]}>
                  {t('JOB_INVITES.job')}
                </Text>
              </Body>
              <Right />
            </Header>

            <Content>
              <HeaderDetails />

              <DetailsTime />

              <View style={styles.viewAmount}>
                <View style={styles.viewContent}>
                  <Text style={styles.textTitle}>Earnings</Text>
                  <H1 style={styles.textSubTitle}>$1000</H1>
                </View>
                <View style={styles.viewContent}>
                  <Text style={styles.textTitle}>Hours Completed</Text>
                  <H1 style={styles.textSubTitle}>10</H1>
                </View>
              </View>

              <DetailsCheck />

              {/* <View style={styles.viewCrud}>
                <View style={styles.viewButtomClock}>
                  <Button
                    onPress={this.rejectJob}
                    style={styles.buttomBlueDark}
                    full
                    rounded
                    bordered>
                    <Text style={styles.textWhite}>Review Employer</Text>
                  </Button>
                </View>
              </View> */}
            </Content>
            <View style={styles.viewBottom}>
              <Button
                onPress={this.rejectJob}
                style={styles.buttomBottom}
                full
                rounded
                bordered>
                <Text style={styles.textWhite}>Review Employer</Text>
              </Button>
            </View>
          </Container>
        )}
      </I18n>
    );
  }

  showOpenDirection = () => {
    try {
      if (this.state.invite.shift.venue.title) return true;
    } catch (err) {
      return false;
    }

    return false;
  };

  showMarker = () => {
    try {
      if (
        this.state.invite.shift.venue.longitude &&
        this.state.invite.shift.venue.latitude
      ) {
        return true;
      }
    } catch (err) {
      return false;
    }

    return false;
  };

  getInvite = () => {
    if (this.state.inviteId === 'NO_ID') {
      return this.props.navigation.goBack();
    }

    this.isLoading(true);
    inviteActions.getInvite(this.state.inviteId);
  };

  applyJob = () => {
    let jobTitle;

    try {
      jobTitle = this.state.invite.shift.venue.title;
    } catch (e) {
      return;
    }

    if (!jobTitle) return;

    Alert.alert(
      i18next.t('JOB_INVITES.applyJob'),
      jobTitle,
      [
        {
          text: i18next.t('APP.cancel'),
          onPressHelp: () => {
            LOG(this, 'Cancel applyJob');
          },
        },
        {
          text: i18next.t('JOB_INVITES.apply'),
          onPressHelp: () => {
            this.isLoading(true);
            inviteActions.applyJob(this.state.invite.id);
          },
        },
      ],
      { cancelable: false },
    );
  };

  rejectJob = () => {
    let jobTitle;

    try {
      jobTitle = this.state.invite.shift.venue.title;
    } catch (e) {
      return;
    }

    if (!jobTitle) return;

    Alert.alert(
      i18next.t('JOB_INVITES.rejectJob'),
      jobTitle,
      [
        {
          text: i18next.t('APP.cancel'),
          onPressHelp: () => {
            LOG(this, 'Cancel rejectJob');
          },
        },
        {
          text: i18next.t('JOB_INVITES.reject'),
          onPressHelp: () => {
            this.isLoading(true);
            inviteActions.rejectJob(this.state.invite.id);
          },
        },
      ],
      { cancelable: false },
    );
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  };
}

export default JobDetailsNewOne;
