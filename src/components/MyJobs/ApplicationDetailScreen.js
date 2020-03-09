import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Dimensions, ScrollView } from 'react-native';
import { Container, Text } from 'native-base';
import * as jobActions from './actions';
import { inviteStyles } from '../Invite/InviteDetailsStyle';
import jobStore from './JobStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { LOG } from '../../shared';
import { Loading, openMapsApp, CustomToast } from '../../shared/components';
import MARKER_IMG from '../../assets/image/map-marker.png';
// import { log } from 'pure-logger';
import { ModalHeader } from '../../shared/components/ModalHeader';
import { JobInformation } from '../../shared/components/JobInformation';
import { ViewFlex } from '../../shared/components/ViewFlex';
import { jobStyles } from './JobStyles';

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
    const { isLoading, shift } = this.state;
    const renderDetail = (t, shift) => {
      return (
        <>
          <ModalHeader
            onPressClose={() => this.props.navigation.goBack()}
            title={`Application Details`}
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
                      latitude: DEFAULT_LATIDUDE,
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
    return (
      <View style={[jobStyles.clockButtonBar]}>
        <Text>{`Your application is been reviewed.`}</Text>
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
    if (!this.state.applicationId) {
      CustomToast('Something went wrong!');
      // return this.props.navigation.goBack();
      return;
    }

    this.setState({ isLoading: true }, () => {
      jobActions.getApplication(this.state.applicationId);
    });
  };
}

ApplicationDetailScreen.routeName = 'ApplicationDetailScreen';

export default ApplicationDetailScreen;
