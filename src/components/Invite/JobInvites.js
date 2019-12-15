import React, { Component } from 'react';
import { View, Image, Alert, RefreshControl } from 'react-native';
import {
  Container,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Badge,
} from 'native-base';
import { inviteStyles } from './JobInvitesStyle';
import { INVITE_DETAILS_ROUTE_V2 } from '../../constants/routes';
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import { LOG } from '../../shared';
import { CustomToast, Loading, CenteredText } from '../../shared/components';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import moment from 'moment';
import PROFILE_IMG from '../../assets/image/profile.png';
import { TabHeader } from '../../shared/components/TabHeader';
import EditProfile from '../Account/EditProfile';
import textStyles from '../../shared/textStyles';
import imgStyles from '../../shared/imgStyles';

/**
 * The Job Invites View
 */
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
            <Badge style={inviteStyles.badge}>
              <Text>{params.invitationCount}</Text>
            </Badge>
          ) : null}
        </>
      ),
    };
  };

  constructor(props) {
    super(props);
    // this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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

  goToEditProfile = () => {
    this.props.navigation.navigate(EditProfile.routeName);
  };

  render() {
    const { jobInvites } = this.state;
    // const handledInvites = this.ds.cloneWithRows(jobInvites)
    console.log('jobInvites: ', jobInvites);
    // console.log("handledInvites: ", handledInvites)
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            {this.state.showNoInvitesText ? (
              <CenteredText text={`${t('JOB_INVITES.noInvites')}`} />
            ) : null}
            <TabHeader
              screenName="invitations"
              title={t('JOB_INVITES.jobOffers')}
              onPress={this.goToEditProfile}
            />
            <Content
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshingInvites}
                  onRefresh={this.refreshInvites}
                />
              }>
              {jobInvites.length > 0 ? (
                <List
                  leftOpenValue={75}
                  rightOpenValue={-75}
                  dataArray={jobInvites}
                  renderRow={(data) => (
                    <ListItem
                      onPress={() =>
                        this.props.navigation.navigate(
                          INVITE_DETAILS_ROUTE_V2,
                          {
                            inviteId: data.id,
                          },
                        )
                      }
                      style={inviteStyles.viewListItem}>
                      <Image
                        source={
                          data.shift &&
                          data.shift.employer &&
                          data.shift.employer.picture
                            ? { uri: data.shift.employer.picture }
                            : PROFILE_IMG
                        }
                        style={[imgStyles.employerImg]}
                      />
                      <View style={inviteStyles.viewDataOffers}>
                        {/* title info */}
                        {data.shift ? (
                          <Text style={inviteStyles.viewTitleInfo}>
                            {data.shift.employer ? (
                              <Text style={textStyles.textEmployer}>
                                {data.shift.employer.title}
                              </Text>
                            ) : null}
                            <Text style={textStyles.textGray}>
                              {` ${t('JOB_INVITES.lookingFor')} `}
                            </Text>
                            {data.shift.position ? (
                              <Text style={textStyles.textShiftTitle}>
                                {data.shift.position.title}
                              </Text>
                            ) : null}
                            <Text>
                              {` ${t('JOB_PREFERENCES.dateStartToEnd', {
                                startingAt: moment(data.shift.starting_at)
                                  .tz(moment.tz.guess())
                                  .format('lll'),
                                endingAt: moment(data.shift.ending_at)
                                  .tz(moment.tz.guess())
                                  .format('lll'),
                              })} `}
                            </Text>
                            <Text style={textStyles.textRed}>
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
                      style={inviteStyles.buttomApply}
                      onPress={() => this.applyJob(data, secId, rowId, rowMap)}>
                      <Icon active name="md-checkmark" />
                    </Button>
                  )}
                  renderRightHiddenRow={(data, secId, rowId, rowMap) => (
                    <Button
                      style={inviteStyles.buttomReject}
                      full
                      danger
                      onPress={() =>
                        this.rejectJob(data, secId, rowId, rowMap)
                      }>
                      <Icon active name="md-close" />
                    </Button>
                  )}
                />
              ) : null}
            </Content>
          </Container>
        )}
      </I18n>
    );
  }

  firstLoadJobInvites() {
    this.setState({ isLoading: true }, inviteActions.getJobInvites());
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
    try {
      this.state.rowMap[
        `${this.state.secId}${this.state.rowId}`
      ].props.closeRow();

      const newData = [...this.state.jobInvites];
      newData.splice(this.state.rowId, 1);
      this.setState({ jobInvites: newData }, () => {
        this.getJobInvites();
      });
    } catch (e) {
      LOG(this, `CloseInviteRow error: ${e}`);
      this.getJobInvites();
    }
  }
}

export default JobInvites;
