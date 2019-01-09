import React, { Component } from 'react';
import { View, Image, ListView, Alert, RefreshControl } from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Title,
  Right,
  Thumbnail,
  Badge,
} from 'native-base';
import styles from './JobInvitesStyle';
import {
  EDIT_PROFILE_ROUTE,
  INVITE_DETAILS_ROUTE,
} from '../../constants/routes';
import { BLUE_MAIN } from '../../constants/colorPalette';
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import { LOG } from '../../utils';
import { CustomToast, Loading, CenteredText } from '../../utils/components';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import moment from 'moment';
import PROFILE_IMG from '../../assets/image/profile.png';

class JobInvites extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      tabBarLabel: i18next.t('JOB_INVITES.jobOffers'),
      tabBarIcon: () => (
        <>
          <Image
            style={{ resizeMode: 'contain', width: 42, height: 42 }}
            source={require('../../assets/image/offers.png')}
          />
          {params && params.invitationCount ? (
            <Badge style={styles.badge}>
              <Text>{params.invitationCount}</Text>
            </Badge>
          ) : null}
        </>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      isLoading: false,
      basic: false,
      isRefreshingInvites: false,
      showNoInvitesText: false,
      jobInvites: [],
    };
  }

  componentDidMount() {
    this.getJobInvitesSubscription = inviteStore.subscribe(
      'JobInvites',
      (jobInvites) => this.getJobInvitesHandler(jobInvites),
    );
    this.applyJobSubscription = inviteStore.subscribe('ApplyJob', (data) =>
      this.applyJobHandler(data),
    );
    this.rejectJobSubscription = inviteStore.subscribe('RejectJob', (data) =>
      this.rejectJobHandler(data),
    );
    this.inviteStoreError = inviteStore.subscribe('InviteStoreError', (err) =>
      this.errorHandler(err),
    );

    this.firstLoadJobInvites();
  }

  componentWillUnmount() {
    this.getJobInvitesSubscription.unsubscribe();
    this.applyJobSubscription.unsubscribe();
    this.rejectJobSubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
  }

  getJobInvitesHandler = (jobInvites) => {
    const showNoInvitesText =
      Array.isArray(jobInvites) && !jobInvites.length ? true : false;

    this.setState({
      jobInvites,
      showNoInvitesText,
      isRefreshingInvites: false,
      isLoading: false,
    });
  };

  applyJobHandler = () => {
    this.isLoading(false);
    this.deleteRow();
    CustomToast(i18next.t('JOB_INVITES.jobApplied'));
  };

  rejectJobHandler = () => {
    this.isLoading(false);
    this.deleteRow();
    CustomToast(i18next.t('JOB_INVITES.jobRejected'));
  };

  errorHandler = (err) => {
    this.isLoading(false);
    this.setState({ isRefreshingInvites: false });
    CustomToast(err, 'danger');
  };

  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}

            {this.state.showNoInvitesText ? (
              <CenteredText text={`${t('JOB_INVITES.noInvites')}`} />
            ) : null}

            <Header
              androidStatusBarColor={BLUE_MAIN}
              style={styles.headerCustom}>
              <Left />
              <Body>
                <Title style={styles.titleHeader}>
                  {t('JOB_INVITES.jobOffers')}
                </Title>
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() =>
                    this.props.navigation.navigate(EDIT_PROFILE_ROUTE)
                  }>
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: 32,
                      width: 32,
                      marginRight: 20,
                    }}
                    source={require('../../assets/image/controls.png')}
                  />
                </Button>
              </Right>
            </Header>
            <Content
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshingInvites}
                  onRefresh={this.refreshInvites}
                />
              }>
              <List
                leftOpenValue={75}
                rightOpenValue={-75}
                dataSource={this.ds.cloneWithRows(this.state.jobInvites)}
                renderRow={(data) => (
                  <ListItem
                    onPress={() =>
                      this.props.navigation.navigate(INVITE_DETAILS_ROUTE, {
                        inviteId: data.id,
                      })
                    }
                    style={styles.viewListItem}>
                    <Thumbnail
                      small
                      source={
                        data.shift &&
                        data.shift.position &&
                        data.shift.position.picture
                          ? data.shift.position.picture
                          : PROFILE_IMG
                      }
                    />
                    <View style={styles.viewDataOffers}>
                      {/* title info */}
                      {data.shift ? (
                        <Text style={styles.viewTitleInfo}>
                          {data.shift.venue ? (
                            <Text style={styles.textOne}>
                              {data.shift.venue.title}
                            </Text>
                          ) : null}
                          <Text style={styles.textTwo}>
                            {` ${t('JOB_INVITES.lookingFor')} `}
                          </Text>
                          {data.shift.position ? (
                            <Text style={styles.textThree}>
                              {data.shift.position.title}
                            </Text>
                          ) : null}
                          <Text style={styles.textBlack}>
                            {` ${t('JOB_PREFERENCES.dateStartToEnd', {
                              startingAt: moment(data.shift.starting_at)
                                .tz(moment.tz.guess())
                                .format('lll'),
                              endingAt: moment(data.shift.ending_at)
                                .tz(moment.tz.guess())
                                .format('lll'),
                            })} `}
                          </Text>
                          <Text style={styles.textRed}>
                            {`$${data.shift.minimum_hourly_rate}/${t(
                              'JOB_INVITES.hr',
                            )}.`}
                          </Text>
                        </Text>
                      ) : null}
                    </View>
                  </ListItem>
                )}
                renderLeftHiddenRow={(data, secId, rowId, rowMap) => (
                  <Button
                    style={styles.buttomApply}
                    onPress={() => this.applyJob(data, secId, rowId, rowMap)}>
                    <Icon active name="md-checkmark" />
                  </Button>
                )}
                renderRightHiddenRow={(data, secId, rowId, rowMap) => (
                  <Button
                    style={styles.buttomReject}
                    full
                    danger
                    onPress={() => this.rejectJob(data, secId, rowId, rowMap)}>
                    <Icon active name="md-close" />
                  </Button>
                )}
              />
            </Content>
          </Container>
        )}
      </I18n>
    );
  }

  firstLoadJobInvites() {
    this.isLoading(true);
    this.getJobInvites();
  }

  getJobInvites = () => {
    inviteActions.getJobInvites();
  };

  refreshInvites = () => {
    this.setState({ isRefreshingInvites: true });
    this.getJobInvites();
  };

  applyJob = (invitation, secId, rowId, rowMap) => {
    let jobTitle;

    try {
      jobTitle = invitation.shift.venue.title;
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
            this.setState({ secId, rowId, rowMap }, () => {
              inviteActions.applyJob(invitation.id);
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  rejectJob = (invitation, secId, rowId, rowMap) => {
    let jobTitle;

    try {
      jobTitle = invitation.shift.venue.title;
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
            this.setState({ secId, rowId, rowMap }, () => {
              inviteActions.rejectJob(invitation.id);
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  };

  deleteRow() {
    this.state.rowMap[
      `${this.state.secId}${this.state.rowId}`
    ].props.closeRow();
    const newData = [...this.state.jobInvites];
    newData.splice(this.state.rowId, 1);
    this.setState({ jobInvites: newData }, () => {
      this.getJobInvites();
    });
  }
}
export default JobInvites;
