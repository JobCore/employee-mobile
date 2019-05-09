import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Image, Dimensions, Alert } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Header,
  Left,
  Right,
  Body,
  Icon,
} from 'native-base';
import styles from '../Invite/InviteDetailsStyle';
import { WHITE_MAIN, BLUE_MAIN, BLUE_DARK } from '../../constants/colorPalette';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import * as inviteActions from './actions';
// import inviteStore from './InviteStore';
// import { JobDetails } from '../../utils/components';
import { LOG } from '../../utils';
import { Loading, openMapsApp, HeaderDetails } from '../../utils/components';
import MARKER_IMG from '../../assets/image/map-marker.png';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_LATIDUDE = 25.761681;
const DEFAULT_LONGITUDE = -80.191788;

class JobDetailsNew extends Component {
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
      invite: {},
      region: {
        latitude: DEFAULT_LATIDUDE,
        longitude: DEFAULT_LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      inviteId: props.navigation.getParam('inviteId', 'NO_ID'),
    };
  }

  // componentDidMount() {
  //   this.getInviteSubscription = inviteStore.subscribe('GetInvite', (invite) =>
  //     this.getInviteHandler(invite),
  //   );
  //   this.applyJobSubscription = inviteStore.subscribe('ApplyJob', (data) =>
  //     this.applyJobHandler(data),
  //   );
  //   this.rejectJobSubscription = inviteStore.subscribe('RejectJob', (data) =>
  //     this.rejectJobHandler(data),
  //   );
  //   this.inviteStoreError = inviteStore.subscribe('InviteStoreError', (err) =>
  //     this.errorHandler(err),
  //   );

  //   this.getInvite();
  // }

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
      latitude = invite.shift.venue.latitude || DEFAULT_LATIDUDE;
      longitude = invite.shift.venue.longitude || DEFAULT_LONGITUDE;
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
                <Text style={[{ width: 150 }, styles.titleHeader]}>
                  {t('JOB_INVITES.inviteDetails')}
                </Text>
              </Body>
              <Right />
            </Header>

            <Content>
              {/* <View style={styles.viewShift}>
                {this.state.invite && this.state.invite.shift ? (
                  <JobDetails isInvite shift={this.state.invite.shift} />
                ) : null}
              </View> */}
              <HeaderDetails />
              {/* <View style={styles.bgInfo}>
                <List>
                  <ListItem avatar noBorder={true}>
                    <Left>
                      <Image
                        resizeMode={'cover'}
                        circle={true}
                        source={CHICKEN}
                        style={styles.imgCover}
                      />
                    </Left>
                    <Body style={styles.bodyItemText}>
                      <Text style={styles.textViolet}>The Club of knights</Text>
                      <Text style={styles.textBlue}>Kitchen Assistant</Text>
                    </Body>
                  </ListItem>
                </List>
                <View style={styles.viewInfoDate}>
                  <View style={styles.viewContent}>
                    <Text style={styles.textTitle}>Date</Text>
                    <Text style={styles.textSubTitle}>Feb 23 to Feb 24</Text>
                  </View>
                  <View style={styles.viewContent}>
                    <Text style={styles.textTitle}>Time</Text>
                    <Text style={styles.textSubTitle}>3pm to 6pm</Text>
                  </View>
                </View>
                <View style={styles.viewDir}>
                  <Text note style={styles.textCenter}>
                    270 Catalonia Ave #001, Coral Gables, FL 33134, USA
                  </Text>
                </View>
              </View>
              <View style={styles.viewAmount}>
                <View style={styles.viewContent}>
                  <Text style={styles.textTitle}>Amount</Text>
                  <H1 style={styles.textSubTitle}>$1000</H1>
                </View>
                <View style={styles.viewContent}>
                  <Text style={styles.textTitle}>Total Hours</Text>
                  <H1 style={styles.textSubTitle}>10</H1>
                </View>
              </View> */}
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
                      latitude: DEFAULT_LATIDUDE,
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

              {/* <View style={styles.viewCrud}>
                <View style={styles.viewButtomClock}>
                  <Button
                    onPress={this.rejectJob}
                    style={styles.buttomBlueDark}
                    full
                    rounded
                    bordered>
                    <Text style={styles.textWhite}>Clock In 1:30 min</Text>
                  </Button>
                </View>
              </View> */}
            </Content>
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                right: 0,
                left: 0,
                paddingLeft: 60,
                paddingRight: 60,
              }}>
              <Button
                onPress={this.rejectJob}
                style={styles.buttomBottom}
                full
                rounded
                bordered>
                <Text style={styles.textWhite}>Clock In 1:30 min</Text>
              </Button>
            </View>
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
      latitude = this.state.invite.shift.venue.latitude || DEFAULT_LATIDUDE;
      longitude = this.state.invite.shift.venue.longitude || DEFAULT_LONGITUDE;
    } catch (e) {
      latitude = DEFAULT_LATIDUDE;
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

export default JobDetailsNew;
