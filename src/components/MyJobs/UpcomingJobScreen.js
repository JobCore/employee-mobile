import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Dimensions, Alert, ScrollView } from 'react-native';
import { Container } from 'native-base';
import * as jobActions from './actions';
import { inviteStyles } from '../Invite/InviteDetailsStyle';
import jobStore from './JobStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { LOG } from '../../shared';
import { Loading, openMapsApp, CustomToast } from '../../shared/components';
import MARKER_IMG from '../../assets/image/map-marker.png';
import { ModalHeader } from '../../shared/components/ModalHeader';
import { JobInformation } from '../../shared/components/JobInformation';
import moment from 'moment';
import { ViewFlex } from '../../shared/components/ViewFlex';
import { ClockInButton } from './components/ClockInButton';
import { jobStyles } from './JobStyles';
import WorkModeScreen from './WorkModeScreen';
import { canClockIn, getDiffInMinutesToStartShift } from './job-utils';
import { _round, clockInMixin, clockOutMixin } from '../../shared/mixins';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_LATITUDE = 25.761681;
const DEFAULT_LONGITUDE = -80.191788;

/**
 *
 */
class UpcomingJobScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      shift: undefined,
      invite: {},
      region: {
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      jobRate: null,
      clockIns: [],
      shiftId: props.navigation.getParam('shiftId', null),
    };
    this.clockIn = clockInMixin.bind(this);
    this.clockOut = clockOutMixin.bind(this);
    this.watchId = null;
    this.latitude = 0.0;
    this.longitude = 0.0;
  }

  componentDidMount() {
    this.getJobSubscription = jobStore.subscribe('GetJob', this.getJobHandler);
    this.clockInSubscription = jobStore.subscribe(
      'ClockIn',
      this.clockInHandler,
    );
    this.jobStoreError = jobStore.subscribe('JobStoreError', this.errorHandler);
    this.getJob();

    navigator.geolocation.getCurrentPosition(
      (newPosition) => {
        console.log('DEBUG:position:current:', newPosition.coords);
        this.latitude = _round(newPosition.coords.latitude);
        this.longitude = _round(newPosition.coords.longitude);
      },
      (error) => {
        console.log('DEBUG:error:current::', error);
      },
    );

    this.watchId = navigator.geolocation.watchPosition(
      (newPosition) => {
        console.log('DEBUG:position:', newPosition.coords);
        this.latitude = _round(newPosition.coords.latitude);
        this.longitude = _round(newPosition.coords.longitude);
      },
      (error) => {
        console.log('DEBUG:error:', error);
      },
      { maximumAge: 1000, enableHighAccuracy: true },
    );
  }

  componentWillUnmount() {
    this.getJobSubscription.unsubscribe();
    this.clockInSubscription.unsubscribe();
    this.jobStoreError.unsubscribe();
    navigator.geolocation.clearWatch(this.watchId);
  }

  errorHandler = (err) => {
    this.setState({ isLoading: false }, () => {
      CustomToast(err, 'danger');
    });
  };

  getJobHandler = (shift) => {
    let latitude;
    let longitude;

    try {
      latitude = shift.venue.latitude || DEFAULT_LATITUDE;
      longitude = shift.venue.longitude || DEFAULT_LONGITUDE;
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

    this.setState({ shift, isLoading: false }, () => {
      this.onRegionChangeComplete(region);
    });
  };

  clockInHandler = () => {
    this.setState({ isLoading: false }, () => {
      CustomToast(i18next.t('MY_JOBS.clockedIn'));
      // We move to work mode
      this.props.navigation.navigate(WorkModeScreen.routeName, {
        shiftId: this.state.shift.id,
      });
    });
  };

  render() {
    const { isLoading, shift } = this.state;
    const renderDetail = (t, shift) => {
      return (
        <>
          <ModalHeader
            onPressClose={() => this.props.navigation.goBack()}
            title={`Job Details`}
            onPressHelp={() => this.props.navigation.goBack()}
          />
          <ViewFlex justifyContent={'space-between'}>
            <ScrollView>
              <JobInformation
                shift={shift}
                onPressDirection={
                  this.showOpenDirection() ? this.openMapsApp : () => {}
                }
              />
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
              {this.renderButtons()}
            </ScrollView>
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
    if (!this.state.shift) return null;
    const endingAtMoment = moment(this.state.shift.ending_at);
    const nowMoment = moment.utc();
    // If the shift already end
    if (nowMoment.isSameOrAfter(endingAtMoment)) return null;

    return (
      <View style={[jobStyles.clockButtonBar]}>
        <ClockInButton
          onClick={this.clockIn}
          canClockIn={canClockIn(this.state.shift)}
          diffInMinutes={getDiffInMinutesToStartShift(this.state.shift)}
        />
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
      latitude = this.state.shift.venue.latitude || DEFAULT_LATITUDE;
      longitude = this.state.shift.venue.longitude || DEFAULT_LONGITUDE;
    } catch (e) {
      latitude = DEFAULT_LATITUDE;
      longitude = DEFAULT_LONGITUDE;
    }

    openMapsApp(latitude, longitude);
  };

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  };

  getJob = () => {
    if (!this.state.shiftId && !this.state.applicationId) {
      Alert.alert('Upcoming Job Screen Error', JSON.stringify(this.state));
      return;
    }

    if (this.state.shiftId) {
      return this.setState({ isLoading: true }, () => {
        jobActions.getJob(this.state.shiftId);
      });
    }
  };
}

UpcomingJobScreen.routeName = 'UpcomingJobScreen';

export default UpcomingJobScreen;
