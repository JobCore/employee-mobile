import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Dimensions, Alert } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import styles from './InviteDetailsStyle';
import { BLUE_DARK } from '../../shared/colorPalette';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import { JobDetails } from '../../shared/components';
import { LOG } from '../../shared';
import { Loading, openMapsApp } from '../../shared/components';
import MARKER_IMG from '../../assets/image/map-marker.png';
import { ModalHeader } from '../../shared/components/ModalHeader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_LATITUDE = 25.761681;
const DEFAULT_LONGITUDE = -80.191788;

/**
 * @deprecated Use InviteDetailsV2 instead
 */
class InviteDetails extends Component {
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
      isLoading: false,
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
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            <ModalHeader
              onPressClose={() => this.props.navigation.goBack()}
              title={t('JOB_INVITES.inviteDetails')}
              onPressHelp={() => this.props.navigation.goBack()}
            />
            <Content>
              <View style={styles.viewShift}>
                {this.state.invite && this.state.invite.shift ? (
                  <JobDetails isInvite shift={this.state.invite.shift} />
                ) : null}
              </View>

              <MapView
                style={styles.map}
                region={this.state.region}
                onRegionChangeComplete={this.onRegionChangeComplete}>
                {this.showMarker() ? (
                  <Marker
                    image={MARKER_IMG}
                    anchor={{ x: 0.5, y: 1 }}
                    coordinate={{
                      latitude: this.state.invite.shift.venue.latitude,
                      longitude: this.state.invite.shift.venue.longitude,
                    }}
                    title={this.state.invite.shift.venue.title}
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

              {this.showOpenDirection() ? (
                <View>
                  <Text style={styles.textLocation}>
                    {`${this.state.invite.shift.venue.title}`}
                  </Text>
                  <Button
                    rounded
                    small
                    bordered
                    style={styles.openDirectionButton}
                    onPress={this.openMapsApp}>
                    <Text style={{ color: BLUE_DARK }}>
                      {t('JOB_INVITES.openDirection')}
                    </Text>
                  </Button>
                </View>
              ) : null}

              <View style={styles.viewCrud}>
                <View style={styles.viewButtomLeft}>
                  <Button
                    onPress={this.rejectJob}
                    style={styles.buttomLeft}
                    full
                    rounded
                    bordered>
                    <Text style={styles.textViolet}>
                      {t('JOB_INVITES.reject')}
                    </Text>
                  </Button>
                </View>
                <View style={styles.viewButtomRight}>
                  <Button
                    onPress={this.applyJob}
                    style={styles.buttomRight}
                    full
                    rounded
                    bordered>
                    <Text style={styles.textBlue}>
                      {t('JOB_INVITES.apply')}
                    </Text>
                  </Button>
                </View>
              </View>
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

export default InviteDetails;
