import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Image, Dimensions } from 'react-native';
import {
  Container,
  Content,
  Button,
  Header,
  Left,
  Right,
  Body,
  Title,
  Icon,
  Text,
} from 'native-base';
import styles from '../Invite/InviteDetailsStyle';
import { WHITE_MAIN, BLUE_MAIN } from '../../constants/colorPalette';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import * as jobActions from './actions';
import jobStore from './JobStore';
import { JobDetails } from '../../utils/components';
import { LOG } from '../../utils';
import { Loading, openMapsApp } from '../../utils/components';
import MARKER_IMG from '../../assets/image/map-marker.png';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_LATIDUDE = 25.761681;
const DEFAULT_LONGITUDE = -80.191788;

class JobDetailsScreen extends Component {
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
      isLoading: false,
      shift: undefined,
      region: {
        latitude: DEFAULT_LATIDUDE,
        longitude: DEFAULT_LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      shiftId: props.navigation.getParam('shiftId', null),
      applicationId: props.navigation.getParam('applicationId', null),
    };
  }

  componentDidMount() {
    this.getJobSubscription = jobStore.subscribe('GetJob', (job) => {
      this.getJobHandler(job);
    });

    this.getApplicationSubscription = jobStore.subscribe(
      'GetApplication',
      (job) => {
        this.getJobHandler(job);
      },
    );

    this.inviteStoreError = jobStore.subscribe('JobStoreError', (err) => {
      this.errorHandler(err);
    });

    this.getJob();
  }

  componentWillUnmount() {
    this.getJobSubscription.unsubscribe();
    this.getApplicationSubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
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

  errorHandler = () => {
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}

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
                <Title style={styles.titleHeader}>
                  {t('MY_JOBS.jobDetails')}
                </Title>
              </Body>
              <Right />
            </Header>

            <Content>
              <View style={styles.viewShift}>
                {this.state.shift ? (
                  <JobDetails shift={this.state.shift} />
                ) : null}
              </View>

              <MapView
                style={styles.map}
                region={this.state.region}
                onRegionChangeComplete={this.onRegionChangeComplete}>
                {this.showMarker() ? (
                  <Marker
                    image={MARKER_IMG}
                    coordinate={{
                      latitude: this.state.shift.venue.latitude,
                      longitude: this.state.shift.venue.longitude,
                    }}
                    title={this.state.shift.venue.title}
                  />
                ) : (
                  <Marker
                    image={MARKER_IMG}
                    coordinate={{
                      latitude: DEFAULT_LATIDUDE,
                      longitude: DEFAULT_LONGITUDE,
                    }}
                  />
                )}
              </MapView>

              {this.showOpenDirection() ? (
                <View>
                  <Text style={styles.textLocation}>
                    {`${this.state.shift.venue.title}`}
                  </Text>
                  <Button
                    style={styles.openDirectionButton}
                    onPress={this.openMapsApp}>
                    <Text style={styles.textLocation}>
                      {`${this.state.invite.shift.venue.title}`}
                    </Text>
                  </Button>
                </View>
              ) : null}
            </Content>
          </Container>
        )}
      </I18n>
    );
  }

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
    if (!this.state.shiftId && !this.state.applicationId) {
      return this.props.navigation.goBack();
    }

    if (this.state.shiftId) {
      this.setState({ isLoading: true });
      return jobActions.getJob(this.state.shiftId);
    }

    if (this.state.applicationId) {
      this.setState({ isLoading: true });
      return jobActions.getApplication(this.state.applicationId);
    }
  };
}

export default JobDetailsScreen;
