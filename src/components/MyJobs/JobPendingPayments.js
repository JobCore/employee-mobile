import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
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
  List,
  ListItem,
} from 'native-base';
import styles from './style';
import { WHITE_MAIN, BLUE_MAIN } from '../../shared/colorPalette';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import * as inviteActions from './actions';
// import inviteStore from './InviteStore';
// import { JobDetails } from '../../shared/components';
import { LOG } from '../../shared';
import CHICKEN from '../../assets/image/chicken.png';

import HeaderPayments from '../../shared/components/HeaderPayments';
// import IconTime from '../../assets/image/time.png'

class JobPendingPayments extends Component {
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
              <HeaderPayments />
              <List>
                <ListItem avatar>
                  <Left>
                    <Image
                      resizeMode={'cover'}
                      circle={true}
                      source={CHICKEN}
                      style={styles.imgCover}
                    />
                  </Left>
                  <Body>
                    <Text>
                      {' '}
                      <Text style={styles.textOne}>Company </Text>
                      <Text style={styles.textTwo}>will pay you </Text>{' '}
                      <Text style={styles.textRed}>$145 </Text>
                      <Text style={styles.textTwo}>for being a</Text>{' '}
                      <Text style={styles.textThree}>Kitchen Assistant</Text>{' '}
                      from May 30th 3:00pm to May 30th 6:00pm
                    </Text>
                  </Body>
                </ListItem>
                <ListItem avatar>
                  <Left>
                    <Image
                      resizeMode={'cover'}
                      circle={true}
                      source={CHICKEN}
                      style={styles.imgCover}
                    />
                  </Left>
                  <Body>
                    <Text>
                      {' '}
                      <Text style={styles.textOne}>Company </Text>
                      <Text style={styles.textTwo}>will pay you </Text>{' '}
                      <Text style={styles.textRed}>$145 </Text>
                      <Text style={styles.textTwo}>for being a</Text>{' '}
                      <Text style={styles.textThree}>Kitchen Assistant</Text>{' '}
                      from May 30th 3:00pm to May 30th 6:00pm
                    </Text>
                  </Body>
                </ListItem>
                <ListItem avatar>
                  <Left>
                    <Image
                      resizeMode={'cover'}
                      circle={true}
                      source={CHICKEN}
                      style={styles.imgCover}
                    />
                  </Left>
                  <Body>
                    <Text>
                      {' '}
                      <Text style={styles.textOne}>Company </Text>
                      <Text style={styles.textTwo}>will pay you </Text>{' '}
                      <Text style={styles.textRed}>$145 </Text>
                      <Text style={styles.textTwo}>for being a</Text>{' '}
                      <Text style={styles.textThree}>Kitchen Assistant</Text>{' '}
                      from May 30th 3:00pm to May 30th 6:00pm
                    </Text>
                  </Body>
                </ListItem>
                <ListItem avatar>
                  <Left>
                    <Image
                      resizeMode={'cover'}
                      circle={true}
                      source={CHICKEN}
                      style={styles.imgCover}
                    />
                  </Left>
                  <Body>
                    <Text>
                      {' '}
                      <Text style={styles.textOne}>Company </Text>
                      <Text style={styles.textTwo}>will pay you </Text>{' '}
                      <Text style={styles.textRed}>$145 </Text>
                      <Text style={styles.textTwo}>for being a</Text>{' '}
                      <Text style={styles.textThree}>Kitchen Assistant</Text>{' '}
                      from May 30th 3:00pm to May 30th 6:00pm
                    </Text>
                  </Body>
                </ListItem>
              </List>
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

export default JobPendingPayments;
