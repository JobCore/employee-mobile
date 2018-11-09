import React, { Component } from "react";
import MapView, { Marker } from 'react-native-maps';
import {
  View,
  Image,
  Dimensions,
  Alert,

} from "react-native";
import {
  Container,
  Content,
  Button,
  Text,
  Header,
  Left,
  Right,
  Body,
  Title,
  Spinner,
  Icon,
} from 'native-base';
import styles from './InviteDetailsStyle';
import { WHITE_MAIN, BLUE_DARK, BLUE_MAIN } from "../../constants/colorPalette";
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import { JobDetails } from '../../utils/components';
import { LOG, WARN, ERROR } from "../../utils";
import { Loading } from '../../utils/components';
import MARKER_IMG from '../../assets/image/map-marker.png';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_LATIDUDE = 25.761681;
const DEFAULT_LONGITUDE = -80.191788;

class InviteDetails extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('JOB_INVITES.inviteDetails'),
    tabBarIcon: ({ tintColor }) => (
      <Image
                style={{resizeMode: 'contain', height: 30}}
                source={require('../../assets/image/preferences.png')}
            />
    )
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

  componentDidMount() {
    this.getInviteSubscription = inviteStore
      .subscribe('GetInvite', (invite) => this.getInviteHandler(invite));
    this.applyJobSubscription = inviteStore
      .subscribe('ApplyJob', (data) => this.applyJobHandler(data));
    this.rejectJobSubscription = inviteStore
      .subscribe('RejectJob', (data) => this.rejectJobHandler(data));
    this.inviteStoreError = inviteStore
      .subscribe('InviteStoreError', (err) => this.errorHandler(err));

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
  }

  applyJobHandler = () => {
    this.isLoading(false);
    this.props.navigation.goBack();
  }

  rejectJobHandler = () => {
    this.isLoading(false);
    this.props.navigation.goBack();
  }

  errorHandler = (err) => {
    this.isLoading(false);
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
            <Container>
              {this.state.isLoading ? <Loading/> : null}

                <Header androidStatusBarColor={BLUE_MAIN} style={styles.headerCustom}>
                    <Left>
                      <Button transparent onPress={() => this.props.navigation.goBack()}>
                          <Icon name='ios-close' size={24} style={{color: WHITE_MAIN, marginLeft: 20}}/>
                      </Button>
                    </Left>
                    <Body>
                    <Text style={styles.titleHeader}>
                      {t('JOB_INVITES.inviteDetails')}
                    </Text>
                    </Body>
                    <Right/>
                </Header>

                <Content>
                  <View style={{padding: 18}}>
                    {(this.state.invite && this.state.invite.shift) ?
                      <JobDetails shift={this.state.invite.shift}></JobDetails>
                    : null }
                  </View>
                </Content>

                <MapView
                  style={styles.map}
                  region={this.state.region}
                  onRegionChangeComplete={this.onRegionChangeComplete}
                >
                  {(this.state.invite &&
                    this.state.invite.shift &&
                    this.state.invite.shift.venue && this.state.invite.shift.venue.latitude && this.state.invite.shift.venue.longitude)
                    ? <Marker
                      image={MARKER_IMG}
                      coordinate={{
                        latitude: this.state.invite.shift.venue.latitude,
                        longitude: this.state.invite.shift.venue.longitude,
                      }}
                      title={this.state.invite.shift.venue.title}
                      />
                    : <Marker
                      image={MARKER_IMG}
                      coordinate={{
                        latitude: DEFAULT_LATIDUDE,
                        longitude: DEFAULT_LONGITUDE,
                      }}
                      />}
                </MapView>

                <Content>
                <View style={styles.viewCrud}>
                          <View style={styles.viewButtomLeft}>
                              <Button onPress={this.rejectJob}
                                  style={styles.buttomLeft} full rounded bordered>
                                  <Text style={styles.textViolet}>
                                    {t('JOB_INVITES.reject')}
                                  </Text>
                              </Button>
                          </View>
                          <View style={styles.viewButtomRight}>
                              <Button onPress={this.applyJob} style={styles.buttomRight} full rounded bordered>
                              <Text style={styles.textBlue}>
                                {t('JOB_INVITES.apply')}
                              </Text>
                              </Button>
                          </View>
                      </View>
              </Content>

            </Container>
          )
      }</I18n>);
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  getInvite = () => {
    if (this.state.inviteId === 'NO_ID') {
      return this.props.navigation.goBack();
    }

    this.isLoading(true);
    inviteActions.getInvite(this.state.inviteId);
  }

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
      jobTitle, [{
        text: i18next.t('APP.cancel'),
        onPress: () => {
          LOG(this, 'Cancel applyJob');
        }
      }, {
        text: i18next.t('JOB_INVITES.apply'),
        onPress: () => {
          this.isLoading(true);
          inviteActions.applyJob(this.state.invite.id);
        }
      }, ], { cancelable: false }
    );
  }

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
      jobTitle, [{
        text: i18next.t('APP.cancel'),
        onPress: () => {
          LOG(this, 'Cancel rejectJob');
        }
      }, {
        text: i18next.t('JOB_INVITES.reject'),
        onPress: () => {
          this.isLoading(true);
          inviteActions.rejectJob(this.state.invite.id);
        }
      }, ], { cancelable: false }
    );
  }

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }
}

export default InviteDetails;
