import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
import { Container, Content, Text, H1 } from 'native-base';
import { inviteStyles } from '../Invite/InviteDetailsStyle';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import * as inviteActions from './actions';
// import inviteStore from './InviteStore';
// import { JobDetails } from '../../shared/components';
import { LOG } from '../../shared';
import { HeaderDetails } from '../../shared/components';
import DetailsCheck from '../../shared/components/DetailsCheck';
import DetailsTime from '../../shared/components/DetailsTime';
import HeaderReview from '../../shared/components/HeaderReview';
import { ModalHeader } from '../../shared/components/ModalHeader';

// import IconTime from '../../assets/image/time.png'

class JobDetailsNewTwo extends Component {
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
            <ModalHeader screenName="job" title={t('JOB_INVITES.job')} />
            <Content>
              <HeaderDetails />
              <DetailsTime />
              <View style={inviteStyles.viewAmount}>
                <View style={inviteStyles.viewContent}>
                  <Text style={inviteStyles.textTitle}>Earnings</Text>
                  <H1 style={inviteStyles.textSubTitle}>$1000</H1>
                </View>
                <View style={inviteStyles.viewContent}>
                  <Text style={inviteStyles.textTitle}>Hours Completed</Text>
                  <H1 style={inviteStyles.textSubTitle}>10</H1>
                </View>
              </View>
              <DetailsCheck />
              <HeaderReview />
            </Content>
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
          onPress: () => {
            LOG(this, 'Cancel applyJob');
          },
        },
        {
          text: i18next.t('JOB_INVITES.apply'),
          onPress: () => {
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
          onPress: () => {
            LOG(this, 'Cancel rejectJob');
          },
        },
        {
          text: i18next.t('JOB_INVITES.reject'),
          onPress: () => {
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

export default JobDetailsNewTwo;
