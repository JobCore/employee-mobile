import React, { Component } from "react";
import MapView, { Marker } from 'react-native-maps';
import {
  View,
  AsyncStorage,
  // SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Divider,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Text,
  Form,
  Label,
  Header,
  Left,
  Right,
  Body,
  Title,
  ListItem,
  Spinner,
  Toast,
  Icon,
  Card,
  CardItem
} from 'native-base';
import styles from './InviteDetailsStyle';
import { DASHBOARD_ROUTE, APP_ROUTE, AUTH_ROUTE, RESET_ROUTE } from "../../constants/routes";
import { WHITE_MAIN, BLUE_DARK, BLUE_MAIN, GRAY_MAIN } from "../../constants/colorPalette";
import store from "../Account/AccountStore";
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { FormView } from "../../utils/platform";
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import { LOG, WARN, ERROR } from "../../utils";
import moment from 'moment';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
        latitude: 0,
        longitude: 0,
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
      latitude = invite.venue.latitude;
      longitude = invite.venue.longitude;
    } catch (e) {
      LOG(this, `No latLng: ${JSON.stringify(e)}`);

      latitude = 0;
      longitude = 0;
    }

    this.setState({
      invite,
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    });

    this.isLoading(false);
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
                      {t('JOB_INVITES.inviteDetails')}
                    </Title>
                    </Body>
                    <Right/>
                </Header>

                <Content>
                  <View style={{padding: 18}}>
                    {/* title info */}
                  {(this.state.invite.shift) ?
                  <Text style={styles.viewTitleInfo}>
                      {(this.state.invite.shift.venue) ?
                      <Text style={styles.textOne}>
                        {this.state.invite.shift.venue.title}
                      </Text>
                      : null}
                      <Text style={styles.textTwo}>
                        {` ${t('JOB_INVITES.lookingFor')} `}
                      </Text>
                      {(this.state.invite.shift.position) ?
                        <Text style={styles.textThree}>
                        {this.state.invite.shift.position.title}
                      </Text>
                      : null}
                    </Text>
                    : null}
                    {/* title date info */}
                    {(this.state.invite.shift) ?
                    <Text>
                      <Text style={styles.textTwo}>
                        {` ${t('JOB_INVITES.on')} `}
                      </Text>
                      <Text style={styles.textBlack}>
                      {`${
                        t('JOB_PREFERENCES.dateStartToEnd', {
                          startingAt: moment(this.state.invite.shift.starting_at).format('lll'),
                          endingAt: moment(this.state.invite.shift.ending_at).format('lll'),
                        })
                      } `}
                      {/* Sep 24th From 3pm to 6pm. */}
                    </Text>
                      <Text style={styles.textRed}>
                      {`$${this.state.invite.shift.minimum_hourly_rate}/${t('JOB_INVITES.hr')}.`}
                      </Text>
                    </Text>
                  : null }

                  {/* ADD line divider here  */}

                  </View>
                </Content>

                <MapView
                  style={styles.map}
                  region={this.state.region}
                  onRegionChangeComplete={this.onRegionChangeComplete}>
                  {(this.state.invite &&
                    this.state.invite.shift &&
                    this.state.invite.shift.venue && this.state.invite.shift.venue.latitude >= 0 && this.state.invite.shift.venue.longitude >= 0)
                    ? <Marker
                    coordinate={{
                      latitude: 37.78825,
                      longitude: -122.4324,
                    }}
                    title={this.state.invite.shift.venue.title}
                    />
                    : null}
                </MapView>

                <Content>
                <View style={styles.viewCrud}>
                          <View style={styles.viewButtomLeft}>
                              <Button onPress={this.rejectJob}
                                  style={styles.buttomLeft} full rounded>
                                  <Text>{t('JOB_INVITES.reject')}</Text>
                              </Button>
                          </View>
                          <View style={styles.viewButtomRight}>
                              <Button onPress={this.applyJob} style={styles.buttomRight} full rounded>
                              <Text>{t('JOB_INVITES.apply')}</Text>
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

  rejectJob = (invitation) => {
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
