import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Alert, Dimensions, View } from 'react-native';
import { Button, Container, Text } from 'native-base';
import { inviteStyles } from './InviteDetailsStyle';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import * as inviteActions from './actions';
import { ViewFlex } from '../../shared/components/ViewFlex';
import { LOG } from '../../shared';
import { Loading, openMapsApp } from '../../shared/components';
import MARKER_IMG from '../../assets/image/map-marker.png';
import { ModalHeader } from '../../shared/components/ModalHeader';
import { JobHeader } from '../MyJobs/components/JobHeader';
import { JobHours } from '../MyJobs/components/JobHours';
import inviteStore from './InviteStore';
import moment from 'moment';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_LATITUDE = 25.761681;
const DEFAULT_LONGITUDE = -80.191788;

class InviteDetailsV2 extends Component {
  // static navigationOptions = {
  //   header: null,
  //   tabBarLabel: i18next.t('JOB_INVITES.inviteDetails'),
  //   tabBarIcon: () => (
  //     <Image
  //       style={{ resizeMode: 'contain', height: 30 }}
  //       source={require('../../assets/image/preferences.png')}
  //     />
  //   ),
  // };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      invite: {},
      region: {
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      inviteId: props.navigation.getParam('inviteId', 'NO_ID'),
    };
  }

  componentDidMount() {
    this.getInviteSubscription = inviteStore.subscribe('GetInvite', (invite) =>
      this.getInviteHandler(invite),
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
    this.getInvite();
  }

  componentWillUnmount() {
    this.getInviteSubscription.unsubscribe();
    this.applyJobSubscription.unsubscribe();
    this.rejectJobSubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
  }

  getInviteHandler = (invite) => {
    let latitude;
    let longitude;

    try {
      latitude = invite.shift.venue.latitude || DEFAULT_LATITUDE;
      longitude = invite.shift.venue.longitude || DEFAULT_LONGITUDE;
    } catch (e) {
      LOG(this, `No latLng: ${JSON.stringify(e)}`);

      latitude = DEFAULT_LATITUDE;
      longitude = DEFAULT_LONGITUDE;
    }

    const region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    this.setState({ invite, isLoading: false }, () => {
      this.onRegionChangeComplete(region);
    });
  };

  applyJobHandler = () => {
    this.isLoading(false);
    this.props.navigation.goBack();
  };

  rejectJobHandler = () => {
    this.isLoading(false);
    this.props.navigation.goBack();
  };

  errorHandler = () => {
    this.isLoading(false);
  };

  render() {
    const { isLoading, invite } = this.state;

    const renderInvite = (t, invite) => {
      const { shift } = invite;
      const { venue, starting_at, ending_at } = shift;
      const todayAtMoment = moment().tz(moment.tz.guess());
      const todayString = todayAtMoment.format('MMM D');
      const startingAtMoment = moment(starting_at).tz(moment.tz.guess());
      const from = startingAtMoment.format('MMM D');
      const endingAtMoment = moment(ending_at).tz(moment.tz.guess());
      const to = endingAtMoment.format('MMM D');
      const dateString =
        from === to
          ? from === todayString
            ? 'Today'
            : from
          : `${from} to ${to}`;
      const fromTime = startingAtMoment.format('h A');
      const toTime = endingAtMoment.format('h A');
      const timeString = `${fromTime} to ${toTime}`;
      const hours = endingAtMoment.diff(startingAtMoment, 'hours');
      const price = hours * parseFloat(shift.minimum_hourly_rate);
      const address = venue.street_address;

      //hA
      return (
        <>
          <ModalHeader
            onPressClose={() => this.props.navigation.goBack()}
            title={t('JOB_INVITES.inviteDetails')}
            onPressHelp={() => this.props.navigation.goBack()}
          />

          <ViewFlex justifyContent={'space-between'}>
            <View style={{ flex: 4 }}>
              <JobHeader
                clientName={venue.title}
                positionName={shift.position.title}
                dateString={dateString}
                timeString={timeString}
                addressString={address}
                onPressDirection={
                  this.showOpenDirection() ? this.openMapsApp : () => {}
                }
              />
            </View>
            {/*Details*/}
            <View style={{ flex: 2 }}>
              <JobHours price={price} hours={hours} />
            </View>
            <View style={{ flex: 6 }}>
              <MapView
                style={inviteStyles.map}
                region={this.state.region}
                onRegionChangeComplete={this.onRegionChangeComplete}>
                {this.showMarker() ? (
                  <Marker
                    image={MARKER_IMG}
                    anchor={{ x: 0.5, y: 1 }}
                    coordinate={{
                      latitude: shift.venue.latitude,
                      longitude: shift.venue.longitude,
                    }}
                    title={shift.venue.title}
                  />
                ) : (
                  <Marker
                    image={MARKER_IMG}
                    anchor={{ x: 0.5, y: 1 }}
                    coordinate={{
                      latitude: DEFAULT_LATITUDE,
                      longitude: DEFAULT_LONGITUDE,
                    }}
                  />
                )}
              </MapView>
            </View>

            <View style={{ flex: 2 }}>
              <View style={inviteStyles.viewCrud}>
                <View style={inviteStyles.viewButtomLeft}>
                  <Button
                    onPress={this.rejectJob}
                    style={inviteStyles.buttomLeft}
                    full
                    rounded
                    bordered>
                    <Text style={inviteStyles.textWhite}>
                      {t('JOB_INVITES.reject')}
                    </Text>
                  </Button>
                </View>
                <View style={inviteStyles.viewButtomRight}>
                  <Button
                    title={''}
                    onPress={this.applyJob}
                    style={inviteStyles.buttomRight}
                    full
                    rounded
                    bordered>
                    <Text style={inviteStyles.textWhite}>
                      {t('JOB_INVITES.apply')}
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </ViewFlex>
        </>
      );
    };

    return (
      <I18n>
        {(t) => (
          <Container>
            {isLoading ? <Loading /> : renderInvite(t, invite)}
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

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  };

  openMapsApp = () => {
    let latitude;
    let longitude;

    try {
      latitude = this.state.invite.shift.venue.latitude || DEFAULT_LATITUDE;
      longitude = this.state.invite.shift.venue.longitude || DEFAULT_LONGITUDE;
    } catch (e) {
      latitude = DEFAULT_LATITUDE;
      longitude = DEFAULT_LONGITUDE;
    }

    openMapsApp(latitude, longitude);
  };

  getInvite = () => {
    if (this.state.inviteId === 'NO_ID') {
      return this.props.navigation.goBack();
    }
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
            LOG(this, 'ACCEPT applyJob');
            this.setState({ isLoading: true }, () => {
              inviteActions.applyJob(this.state.invite.id);
            });
            this.isLoading(true);
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

export default InviteDetailsV2;
