import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Dimensions, Alert } from 'react-native';
import { Container } from 'native-base';
import * as jobActions from './actions';
import { inviteStyles } from '../Invite/InviteDetailsStyle';
import jobStore from './JobStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { LOG, storeErrorHandler } from '../../shared';
import { Loading, openMapsApp, CustomToast } from '../../shared/components';
import MARKER_IMG from '../../assets/image/map-marker.png';
import { log } from 'pure-logger';
import { ModalHeader } from '../../shared/components/ModalHeader';
import { JobInformation } from '../../shared/components/JobInformation';
import moment from 'moment';
import { ViewFlex } from '../../shared/components/ViewFlex';
import { ClockInButton } from './components/ClockInButton';
import { jobStyles } from './JobStyles';
import WorkModeScreen from './WorkModeScreen';
import { canClockIn, getDiffInMinutesToStartShift } from './job-utils';

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
class UpcomingJobScreen extends Component {
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
    };
  }

  componentDidMount() {
    this.getJobSubscription = jobStore.subscribe('GetJob', this.getJobHandler);
    this.clockInSubscription = jobStore.subscribe(
      'ClockIn',
      this.clockInHandler,
    );
    this.jobStoreError = jobStore.subscribe('JobStoreError', this.errorHandler);
    this.getJob();
  }

  componentWillUnmount() {
    this.getJobSubscription.unsubscribe();
    this.clockInSubscription.unsubscribe();
    this.jobStoreError.unsubscribe();
  }

  errorHandler = () => {
    this.setState({ isLoading: false });
  };

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
    log(`DEBUG:state:`, this.state);
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
            <JobInformation
              shift={shift}
              onPressDirection={
                this.showOpenDirection() ? this.openMapsApp : () => {}
              }
            />
            <View style={{ height: 250 }}>
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
            <View>{this.renderButtons()}</View>
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
        <View>
          <ClockInButton
            onClick={this.clockIn}
            canClockIn={canClockIn(this.state.shift)}
            diffInMinutes={getDiffInMinutesToStartShift(this.state.shift)}
          />
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

  getJob = () => {
    LOG(`DEBUG: getJob`, this.state);
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

  clockIn = () => {
    if (!this.state.shiftId) return;
    let jobTitle;
    try {
      jobTitle = this.state.shift.venue.title;
    } catch (e) {
      CustomToast('The venue has no title!');
      return;
    }

    Alert.alert(i18next.t('MY_JOBS.wantToClockIn'), jobTitle, [
      { text: i18next.t('APP.cancel') },
      {
        text: i18next.t('MY_JOBS.clockIn'),
        onPress: () => {
          jobActions.clockIn(
            this.state.shift.id,
            this.state.shift.venue.latitude,
            this.state.shift.venue.longitude,
            moment.utc(),
          );
          if (true) return;
          navigator.geolocation.getCurrentPosition(
            (data) => {
              log(`DEBUG:clockin:`, this.state.shift.id);
              this.setState({ isLoading: true }, () => {
                log(
                  `DEBUG:clockin:`,
                  this.state.shift.id,
                  data.coords.latitude,
                  data.coords.longitude,
                  moment.utc(),
                );
                jobActions.clockIn(
                  this.state.shift.id,
                  data.coords.latitude,
                  data.coords.longitude,
                  moment.utc(),
                );
              });
            },
            (err) => CustomToast(storeErrorHandler(err), 'danger'),
          );
        },
      },
    ]);
  };

  clockOut = () => {
    if (!this.state.shiftId) return;
    let jobTitle;

    try {
      jobTitle = this.state.shift.venue.title;
    } catch (e) {
      return;
    }

    if (!jobTitle) return;

    Alert.alert(i18next.t('MY_JOBS.wantToClockOut'), jobTitle, [
      { text: i18next.t('APP.cancel') },
      {
        text: i18next.t('MY_JOBS.clockOut'),
        onPress: () => {
          navigator.geolocation.getCurrentPosition(
            (data) => {
              this.setState({ isLoading: true }, () => {
                jobActions.clockOut(
                  this.state.shift.id,
                  data.coords.latitude,
                  data.coords.longitude,
                  moment.utc(),
                );
              });
            },
            (err) => CustomToast(storeErrorHandler(err), 'danger'),
          );
        },
      },
    ]);
  };
}

UpcomingJobScreen.routeName = 'UpcomingJobScreen';

export default UpcomingJobScreen;
