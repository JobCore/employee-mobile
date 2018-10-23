import React, { Component } from "react";
import MapView, { Marker } from 'react-native-maps';
import {
  View,
  Image,
  Dimensions,
} from "react-native";
import {
  Container,
  Content,
  Button,
  Header,
  Left,
  Right,
  Body,
  Title,
  Spinner,
  Icon,
} from 'native-base';
import styles from '../Invite/InviteDetailsStyle';
import { WHITE_MAIN, BLUE_DARK, BLUE_MAIN } from "../../constants/colorPalette";
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import * as jobActions from './actions';
import jobStore from './JobStore';
import { JobDetails } from '../../utils/components';
import { LOG, WARN, ERROR } from "../../utils";

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
    this.getJobSubscription = jobStore
      .subscribe('GetJob', (job) => {
        this.getJobHandler(job);
      });

    this.getApplicationSubscription = jobStore
      .subscribe('GetApplication', (job) => {
        this.getJobHandler(job);
      });

    this.inviteStoreError = jobStore
      .subscribe('JobStoreError', (err) => {
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

    this.setState({
      shift,
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      isLoading: false,
    });
  }

  errorHandler = (err) => {
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return (<View style={styles.container}>
                  <Spinner color={BLUE_DARK}/>
              </View>);
    }

    return (<I18n>{(t, { i18n }) => (
            <Container>
                <Header androidStatusBarColor={BLUE_MAIN} style={styles.headerCustom}>
                    <Left>
                      <Button transparent onPress={() => this.props.navigation.goBack()}>
                          <Icon name='ios-close' size={24} style={{color: WHITE_MAIN, marginLeft: 20}}/>
                      </Button>
                    </Left>
                    <Body>
                    <Title style={styles.titleHeader}>
                      {t('MY_JOBS.jobDetails')}
                    </Title>
                    </Body>
                    <Right/>
                </Header>

                <Content>
                  <View style={{padding: 18}}>
                    {(this.state.shift) ?
                      <JobDetails shift={this.state.shift}></JobDetails>
                    : null }
                  </View>
                </Content>

                <MapView
                  style={styles.map}
                  region={this.state.region}
                  onRegionChangeComplete={this.onRegionChangeComplete}>
                  {(this.state.shift &&
                    this.state.shift.venue && this.state.shift.venue.latitude >= 0 && this.state.shift.venue.longitude >= 0)
                    ? <Marker
                      pinColor={BLUE_DARK}
                      coordinate={{
                        latitude: this.state.shift.venue.latitude,
                        longitude: this.state.shift.venue.longitude,
                      }}
                      title={this.state.shift.venue.title}
                      />
                    : null}
                </MapView>
            </Container>
          )
      }</I18n>);
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

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
      return jobActions.getApplication(this.state.shiftId);
    }
  }
}

export default JobDetailsScreen;
