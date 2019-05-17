import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Image, Dimensions } from 'react-native';
import { Container, Text } from 'native-base';
import * as jobActions from './actions';
import { inviteStyles } from '../Invite/InviteDetailsStyle';
import jobStore from './JobStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { LOG } from '../../shared';
import { Loading, openMapsApp, CustomToast } from '../../shared/components';
import MARKER_IMG from '../../assets/image/map-marker.png';
import { log } from 'pure-logger';
import { ModalHeader } from '../../shared/components/ModalHeader';
import moment from 'moment';
import { JobHeader } from './components/JobHeader';
import { ViewFlex } from '../../shared/components/ViewFlex';
import { jobStyles } from './JobStyles';
import { JobHours } from './components/JobHours';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_LATIDUDE = 25.761681;
const DEFAULT_LONGITUDE = -80.191788;

/**
 *
 */
class ApplicationDetailScreen extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      shift: undefined,
      invite: {},
      region: {
        latitude: DEFAULT_LATIDUDE,
        longitude: DEFAULT_LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      jobRate: null,
      clockIns: [],
      shiftId: props.navigation.getParam('shiftId', null),
      applicationId: props.navigation.getParam('applicationId', null),
    };
  }

  componentDidMount() {
    this.getJobSubscription = jobStore.subscribe('GetJob', this.getJobHandler);
    this.getApplicationSubscription = jobStore.subscribe(
      'GetApplication',
      this.getJobHandler,
    );
    this.getJobRateSubscription = jobStore.subscribe(
      'GetJobRate',
      this.getJobRateHandler,
    );
    this.clockInSubscription = jobStore.subscribe(
      'ClockIn',
      this.clockInHandler,
    );
    this.clockOutSubscription = jobStore.subscribe(
      'ClockOut',
      this.clockOutHandler,
    );
    this.getClockInsSubscription = jobStore.subscribe(
      'GetClockins',
      this.getClockInsHandler,
    );
    this.jobStoreError = jobStore.subscribe('JobStoreError', this.errorHandler);
    this.getApplication();
  }

  componentWillUnmount() {
    this.getJobSubscription.unsubscribe();
    this.getApplicationSubscription.unsubscribe();
    this.getJobRateSubscription.unsubscribe();
    this.clockInSubscription.unsubscribe();
    this.clockOutSubscription.unsubscribe();
    this.getClockInsSubscription.unsubscribe();
    this.jobStoreError.unsubscribe();
  }

  getJobHandler = (shift) => {
    LOG(`DEBUG:getJobHandler`, shift);
    let latitude;
    let longitude;

    try {
      latitude = shift.venue.latitude || DEFAULT_LATIDUDE;
      longitude = shift.venue.longitude || DEFAULT_LONGITUDE;
    } catch (e) {
      LOG(this, `No latLng: ${JSON.stringify(e)}`);

      latitude = DEFAULT_LATIDUDE;
      longitude = DEFAULT_LONGITUDE;
    }

    const region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    this.setState({ shift, isLoading: false }, () => {
      this.onRegionChangeComplete(region);
    });
  };

  getJobRateHandler = (jobRate) => {
    this.setState({ jobRate });
  };

  getClockInsHandler = (clockIns) => {
    this.setState({ clockIns });
  };

  clockInHandler = () => {
    this.setState({ isLoading: false });
    CustomToast(i18next.t('MY_JOBS.clockedIn'));
    this.getClockins();
  };

  clockOutHandler = () => {
    this.setState({ isLoading: false });
    CustomToast(i18next.t('MY_JOBS.clockedOut'));
    this.getClockins();
  };

  errorHandler = () => {
    this.setState({ isLoading: false });
  };

  render() {
    log(`DEBUG:state:`, this.state);
    const { isLoading, shift } = this.state;
    const renderDetail = (t, shift) => {
      log(`DEBUG:shift:`, shift);
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
      return (
        <>
          <ModalHeader
            onPressClose={() => this.props.navigation.goBack()}
            title={`Job Details`}
            onPressHelp={() => this.props.navigation.goBack()}
          />
          <ViewFlex justifyContent={'space-between'}>
            <View style={{ flex: 3 }}>
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
            <View style={{ flex: 2 }}>
              <JobHours price={price} hours={hours} />
            </View>
            <View style={{ flex: 4 }}>
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
                      latitude: DEFAULT_LATIDUDE,
                      longitude: DEFAULT_LONGITUDE,
                    }}
                  />
                )}
              </MapView>
            </View>
            {this.renderButtons()}
          </ViewFlex>
        </>
      );
    };

    return (
      <I18n>
        {(t) => (
          <Container>
            {isLoading ? <Loading /> : renderDetail(t, shift)}
          </Container>
        )}
      </I18n>
    );
  }

  renderButtons = () => {
    return (
      <View style={[jobStyles.clockButtonBar]}>
        <View>
          <Text>{`Your application is been reviewed.`}</Text>
        </View>
      </View>
    );
  };

  showOpenDirection = () => {
    try {
      if (this.state.shift.venue.title) return true;
    } catch (err) {
      return false;
    }

    return false;
  };

  showMarker = () => {
    try {
      if (this.state.shift.venue.longitude && this.state.shift.venue.latitude) {
        return true;
      }
    } catch (err) {
      return false;
    }

    return false;
  };

  openMapsApp = () => {
    let latitude;
    let longitude;

    try {
      latitude = this.state.shift.venue.latitude || DEFAULT_LATIDUDE;
      longitude = this.state.shift.venue.longitude || DEFAULT_LONGITUDE;
    } catch (e) {
      latitude = DEFAULT_LATIDUDE;
      longitude = DEFAULT_LONGITUDE;
    }
    openMapsApp(latitude, longitude);
  };

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  };

  getApplication = () => {
    LOG(`DEBUG: getApplication`, this.state);
    if (!this.state.applicationId) {
      CustomToast('Something went wrong!');
      return this.props.navigation.goBack();
    }

    this.setState({ isLoading: true }, () => {
      jobActions.getApplication(this.state.applicationId);
    });
  };
}

export default ApplicationDetailScreen;
