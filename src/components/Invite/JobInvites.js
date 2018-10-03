import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  ListView,
  Alert,
  RefreshControl,
} from "react-native";
import { Container, Header, Content, Button, Icon, List, ListItem, Text, Left, Body, Title, Right, Label, Thumbnail, Toast, Spinner } from 'native-base';
import styles from './JobInvitesStyle';
import { SETTING_ROUTE, INVITE_DETAILS_ROUTE } from '../../constants/routes'
import { BLUE_MAIN, BLUE_DARK } from "../../constants/colorPalette";
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import { LOG, WARN, ERROR } from "../../utils";
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import moment from 'moment';
import myJobsImg from '../../assets/image/myJobs.png';

class JobInvites extends Component {
  static navigationOptions = {
    tabBarLabel: i18next.t('JOB_INVITES.jobOffers'),
    tabBarIcon: ({ tintColor }) => (
      <Image
        style={{resizeMode: 'contain', height: 30}}
        source={require('../../assets/image/offers.png')}
      />
    )
  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      isLoading: false,
      basic: false,
      isRefreshingInvites: false,
      jobInvites: [],
    };
  }

  componentDidMount() {
    this.getJobInvitesSubscription = inviteStore.subscribe('JobInvites', (jobInvites) => this.getJobInvitesHandler(jobInvites));
    this.applyJobSubscription = inviteStore.subscribe('ApplyJob', (data) => this.applyJobHandler(data));
    this.rejectJobSubscription = inviteStore.subscribe('RejectJob', (data) => this.rejectJobHandler(data));
    this.inviteStoreError = inviteStore.subscribe('InviteStoreError', (err) => this.errorHandler(err));

    this.firstLoadJobInvites();
  }

  componentWillUnmount() {
    this.jobInvitesSubscription.unsubscribe();
    this.applyJobSubscription.unsubscribe();
    this.rejectJobSubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
  }

  getJobInvitesHandler = (jobInvites) => {
    this.isLoading(false);
    this.setState({
      jobInvites,
      isRefreshingInvites: false,
     });
  }

  applyJobHandler = () => {
    this.isLoading(false);
    Toast.show({
      position: 'top',
      type: "success",
      text: i18next.t('JOB_INVITES.jobApplied'),
      duration: 4000,
    });

    this.getJobInvites();
  }

  rejectJobHandler = () => {
    this.isLoading(false);
    Toast.show({
      position: 'top',
      type: "success",
      text: i18next.t('JOB_INVITES.jobRejected'),
      duration: 4000,
    });

    this.getJobInvites();
  }

  errorHandler = (err) => {
    this.isLoading(false);
    Toast.show({
      position: 'top',
      type: "danger",
      text: JSON.stringify(err),
      duration: 4000,
    });
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

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
              {t('JOB_INVITES.jobOffers')}
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate(SETTING_ROUTE)}>
              <Image
                style={{resizeMode: 'contain', height: 25,}}
                source={require('../../assets/image/controls.png')}
              />
            </Button>
          </Right>
        </Header>
        <Content>
          <List
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshingInvites}
                onRefresh={this.refreshInvites}/>
            }
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.jobInvites)}
            renderRow={data =>
            <ListItem onPress={() => this.props.navigation.navigate(INVITE_DETAILS_ROUTE, {inviteId: data.id})} style={styles.viewListItem}>
              <Thumbnail small source={(data.shift && data.shift.position &&
                 data.shift.position.picture) ?
                 data.shift.position.picture
                 : myJobsImg} />
              <View style={styles.viewDataOffers}>
                {/* title info */}
              {(data.shift) ?
               <Text style={styles.viewTitleInfo}>
                  {(data.shift.venue) ?
                  <Text style={styles.textOne}>
                    {data.shift.venue.title}
                  </Text>
                  : null}
                  <Text style={styles.textTwo}>
                    {` ${t('JOB_INVITES.lookingFor')} `}
                  </Text>
                  {(data.shift.position) ?
                    <Text style={styles.textThree}>
                    {data.shift.position.title}
                  </Text>
                  : null}
                </Text>
                : null}
                {/* title date info */}
                {(data.shift) ?
                <Text>
                  <Text style={styles.textTwo}>
                    {` ${t('JOB_INVITES.on')} `}
                  </Text>
                    <Text style={styles.textBlack}>
                    {`${
                      t('JOB_PREFERENCES.dateStartToEnd', {
                        startingAt: moment(data.shift.starting_at).format('lll'),
                        endingAt: moment(data.shift.ending_at).format('lll'),
                      })
                    } `}
                    {/* Sep 24th From 3pm to 6pm. */}
                  </Text>
                  <Text style={styles.textRed}>
                  {`$${data.shift.minimum_hourly_rate}/${t('JOB_INVITES.hr')}.`}
                  </Text>
                </Text>
                : null}
              </View>
            </ListItem>
            }
            renderLeftHiddenRow={data =>
              <Button style={styles.buttomApply} onPress={() => this.applyJob(data)}>
                <Icon active name="md-checkmark"/>
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button style={styles.buttomReject} full danger onPress={() => this.rejectJob(data)}>
                <Icon active name="md-close"/>
              </Button>}
          />
        </Content>
      </Container>
    )}</I18n>);
  }

  firstLoadJobInvites() {
    this.isLoading(true);
    this.getJobInvites();
  }

  getJobInvites = () => {
    inviteActions.getJobInvites();
  }

  refreshInvites = () => {
    this.setState({ isRefreshingInvites: true });
    this.getJobInvites();
  }

  applyJob = (invitation) => {
    let jobTitle;

    try {
      jobTitle = invitation.shift.venue.title;
    } catch (e) {
      return;
    }

    if (!jobTitle) return;

    Alert.alert(
      i18next.t('JOB_INVITES.applyJob'),
      jobTitle, [{
        text: i18next.t('APP.cancel'),
        onPress: () => {
          LOG(this, 'Cancel applyJob');
        }
      }, {
        text: i18next.t('JOB_INVITES.apply'),
        onPress: () => {
          this.isLoading(true);
          inviteActions.applyJob(invitation.id);
        }
      }, ], { cancelable: false }
    )
  }

  rejectJob = (invitation) => {
    let jobTitle;

    try {
      jobTitle = invitation.shift.venue.title;
    } catch (e) {
      return;
    }

    if (!jobTitle) return;

    Alert.alert(
      i18next.t('JOB_INVITES.rejectJob'),
      jobTitle, [{
        text: i18next.t('APP.cancel'),
        onPress: () => {
          LOG(this, 'Cancel rejectJob');
        }
      }, {
        text: i18next.t('JOB_INVITES.reject'),
        onPress: () => {
          this.isLoading(true);
          inviteActions.rejectJob(invitation.id);
        }
      }, ], { cancelable: false }
    )
  }

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.jobInvites];
    newData.splice(rowId, 1);
    this.setState({ jobInvites: newData });
  }
}
export default JobInvites;
