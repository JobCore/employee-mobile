import React, { Component } from 'react';
import { View, Image, ScrollView, Slider, RefreshControl } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Left,
  Body,
  Right,
  ListItem,
  Form,
  Segment,
  Icon,
} from 'native-base';
import preferencesStyles from './JobPreferencesStyle';
import { BLUE_DARK, BLUE_MAIN, VIOLET_MAIN } from '../../shared/colorPalette';
import {
  AVAILABILITY_ROUTE,
  POSITION_ROUTE,
  EDIT_LOCATION_ROUTE,
} from '../../constants/routes';
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { FormViewPreferences } from '../../shared/platform';
import { CustomToast, Loading } from '../../shared/components';
import { LOG } from '../../shared';
import moment from 'moment';
import { TabHeader } from '../../shared/components/TabHeader';
import { fetchNarrowPreferences } from './actions';
import EditProfile from '../Account/EditProfile';

function NarrowPreferencesMessage() {
  return (
    <View style={preferencesStyles.viewWarning}>
      <Text style={{ color: '#fff', textAlign: 'center' }}>
        Your job preferences might be to narrow, the more flexible you are the
        more job invites you will get.
      </Text>
    </View>
  );
}

class JobPreferences extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('JOB_PREFERENCES.jobPreferences'),
    tabBarIcon: () => (
      <Image
        style={{ resizeMode: 'contain', width: 42, height: 42 }}
        source={require('../../assets/image/preferences.png')}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isRefreshing: false,
      location: '',
      positionList: [],
      positions: [],
      availability: [],
      minimumHourlyRate: 0,
      minimumHourlyRatePrev: null,
      minHourly: 8,
      maxHourly: 40,
      maximumJobDistanceMiles: 0,
      maximumJobDistanceMilesPrev: null,
      minDistance: 5,
      maxDistance: 50,
      availableOnWeekends: false,
      narrowPreferences: null,
      stopReceivingInvites: false,
    };
  }

  componentDidMount() {
    this.getPositionsSubscription = inviteStore.subscribe(
      'GetPositions',
      (positionList) => this.getPositionsHandler(positionList),
    );
    this.stopReceivingInvitesSubscription = inviteStore.subscribe(
      'StopReceivingInvites',
      (data) => {
        this.stopReceivingInvitesHandler(data);
      },
    );
    this.getJobPreferencesSubscription = inviteStore.subscribe(
      'GetJobPreferences',
      (data) => this.getJobPreferencesHandler(data),
    );
    this.editJobPreferencesSubscription = inviteStore.subscribe(
      'EditJobPreferences',
      (data) => this.editJobPreferencesHandler(data),
    );
    this.getAvailabilitySubscription = inviteStore.subscribe(
      'GetAvailability',
      (data) => this.getAvailabilityHandler(data),
    );
    this.getLocationSubscription = inviteStore.subscribe(
      'GetProfile',
      this.getLocationHandler,
    );
    this.saveLocationSubscription = inviteStore.subscribe(
      'SaveLocation',
      this.saveLocationHandler,
    );
    this.inviteStoreError = inviteStore.subscribe('InviteStoreError', (err) =>
      this.errorHandler(err),
    );
    this.narrowPreferencesSubscription = inviteStore.subscribe(
      'NarrowPreferences',
      (state) => this.setState({ narrowPreferences: state }),
    );
    this.firstLoad();
  }

  componentWillUnmount() {
    this.getPositionsSubscription.unsubscribe();
    this.getJobPreferencesSubscription.unsubscribe();
    this.editJobPreferencesSubscription.unsubscribe();
    this.getAvailabilitySubscription.unsubscribe();
    this.getLocationSubscription.unsubscribe();
    this.saveLocationSubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
    this.narrowPreferencesSubscription.unsubscribe();
  }

  getPositionsHandler = (positionList) => {
    this.setState({ positionList });
  };

  getJobPreferencesHandler = (data) => {
    this.setState({
      isLoading: false,
      isRefreshing: false,
      positions: data.positions,
      minimumHourlyRate: Number(data.minimum_hourly_rate),
      maximumJobDistanceMiles: data.maximum_job_distance_miles,
    });
  };

  editJobPreferencesHandler = () => {
    LOG(this, 'Preferences updated');
  };

  getAvailabilityHandler = (data) => {
    this.setState({ availability: data });
  };

  errorHandler = (err) => {
    this.isLoading(false);
    this.setState({ isRefreshing: false });
    CustomToast(err, 'danger');
  };

  getLocationHandler = (profile) => {
    this.setState({ location: profile.location });
  };

  saveLocationHandler = (profile) => {
    this.setState({ location: profile.location });
  };

  editLocation = () => {
    this.props.navigation.navigate(EDIT_LOCATION_ROUTE);
  };

  goToEditProfile = () => {
    this.props.navigation.navigate(EditProfile.routeName);
  };

  stopReceivingInvitesHandler = (data) => {
    this.setState({
      stopReceivingInvites: data.stop_receiving_invites,
      isRefreshing: false,
    });
  };

  render() {
    let hasTooNarrowPreferences = false;
    const {
      narrowPreferences,
      maximumJobDistanceMiles,
      minimumHourlyRate,
    } = this.state;
    if (narrowPreferences !== null) {
      // { minimum_availability_hours: 20, minimum_job_positions: 1}
      if (
        maximumJobDistanceMiles <= narrowPreferences.minimum_job_distance_miles
      )
        hasTooNarrowPreferences = true;

      if (minimumHourlyRate >= narrowPreferences.maximum_hourly_rate)
        hasTooNarrowPreferences = true;

      const hours = this.state.availability.reduce((acc, block) => {
        if (block.allday) return acc + 8;
        return (
          acc + moment(block.starting_at).diff(moment(block.ending_at), 'hours')
        );
      }, 0);

      if (hours <= narrowPreferences.minimum_availability_hours)
        hasTooNarrowPreferences = true;
    }
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            <TabHeader
              screenName="job_preferences"
              title={t('JOB_PREFERENCES.jobPreferences')}
              onPress={this.goToEditProfile}
            />
            {hasTooNarrowPreferences && <NarrowPreferencesMessage />}
            <Content
              padder
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.refreshPreferences}
                />
              }>
              <ScrollView>
                <View style={preferencesStyles.viewButtonPosition}>
                  <Button
                    onPress={() =>
                      this.props.navigation.navigate(POSITION_ROUTE)
                    }
                    full
                    rounded
                    style={preferencesStyles.buttonRounded}>
                    <Text
                      uppercase={false}
                      style={preferencesStyles.textButton}>
                      {t('JOB_PREFERENCES.position')}
                    </Text>
                  </Button>

                  <View style={preferencesStyles.viewPositions}>
                    <Text style={{ textAlign: 'center' }}>
                      {this.state.positions.map((position, index) => {
                        const isLast =
                          index === this.state.positions.length - 1;

                        return (
                          <Text
                            style={preferencesStyles.textPositions}
                            key={index}>
                            {`${position.title}${!isLast ? ', ' : ' '}`}
                          </Text>
                        );
                      })}
                    </Text>
                  </View>
                </View>

                <FormViewPreferences>
                  <Form>
                    <Text style={preferencesStyles.sliderLabel}>
                      {t('JOB_PREFERENCES.minimumHourlyRate')}
                    </Text>
                    <ListItem noBorder>
                      <Left>
                        <Text style={preferencesStyles.sliderMaxValue}>
                          {`$${this.state.minHourly}`}
                        </Text>
                      </Left>
                      <Body>
                        <Text style={preferencesStyles.sliderValue}>
                          {`$${this.state.minimumHourlyRatePrev ||
                            this.state.minimumHourlyRate}`}
                        </Text>
                      </Body>
                      <Right>
                        <Text style={preferencesStyles.sliderMaxValue}>
                          {`$${this.state.maxHourly}`}
                        </Text>
                      </Right>
                    </ListItem>
                    <Slider
                      step={1}
                      minimumValue={this.state.minHourly}
                      maximumValue={this.state.maxHourly}
                      onValueChange={(minimumHourlyRatePrev) =>
                        this.setState({ minimumHourlyRatePrev })
                      }
                      onSlidingComplete={this.onHourlySlidingComplete}
                      value={this.state.minimumHourlyRate}
                      thumbTintColor={BLUE_DARK}
                      minimumTrackTintColor={BLUE_DARK}
                      maximumTrackTintColor={BLUE_MAIN}
                    />

                    <View style={preferencesStyles.viewButtonLocation}>
                      <Button
                        full
                        onPress={this.editLocation}
                        rounded
                        style={preferencesStyles.buttonRounded}>
                        <Text
                          uppercase={false}
                          style={preferencesStyles.textButton}>
                          {t('JOB_PREFERENCES.myLocation')}
                        </Text>
                      </Button>

                      {this.state.location ? (
                        <Text style={preferencesStyles.textLocation}>
                          {`${this.state.location}`}
                        </Text>
                      ) : null}
                    </View>

                    <Text style={preferencesStyles.sliderLabel}>
                      {t('JOB_PREFERENCES.maximumJobDistanceMiles')}
                    </Text>
                    <ListItem noBorder>
                      <Left>
                        <Text style={preferencesStyles.sliderMaxValue}>
                          {`${this.state.minDistance}M`}
                        </Text>
                      </Left>
                      <Body>
                        <Text style={preferencesStyles.sliderValue}>
                          {`${this.state.maximumJobDistanceMilesPrev ||
                            this.state.maximumJobDistanceMiles}M`}
                        </Text>
                      </Body>
                      <Right>
                        <Text style={preferencesStyles.sliderMaxValue}>
                          {`${this.state.maxDistance}M`}
                        </Text>
                      </Right>
                    </ListItem>
                    <Slider
                      step={1}
                      minimumValue={this.state.minDistance}
                      maximumValue={this.state.maxDistance}
                      onValueChange={(maximumJobDistanceMilesPrev) =>
                        this.setState({ maximumJobDistanceMilesPrev })
                      }
                      onSlidingComplete={this.onDistanceSlidingComplete}
                      value={this.state.maximumJobDistanceMiles}
                      thumbTintColor={BLUE_DARK}
                      minimumTrackTintColor={BLUE_DARK}
                      maximumTrackTintColor={BLUE_MAIN}
                    />
                  </Form>
                </FormViewPreferences>

                <View style={preferencesStyles.viewButtonAvailability}>
                  <Button
                    onPress={() =>
                      this.props.navigation.navigate(AVAILABILITY_ROUTE)
                    }
                    full
                    rounded
                    style={preferencesStyles.buttonRounded}>
                    <Text
                      uppercase={false}
                      style={preferencesStyles.textButton}>
                      {t('JOB_PREFERENCES.availability')}
                    </Text>
                  </Button>

                  <View style={preferencesStyles.viewPositions}>
                    <Text style={{ textAlign: 'center' }}>
                      {this.state.availability.map((block, index) => {
                        const isLast =
                          index === this.state.availability.length - 1;
                        const dateFilter = block.allday
                          ? 'dddd: '
                          : 'dddd: h:mma';

                        return (
                          <Text
                            style={preferencesStyles.textPositions}
                            key={index}>
                            {`${moment(block.starting_at)
                              .tz(moment.tz.guess())
                              .format(dateFilter)}${
                              block.allday ? t('JOB_PREFERENCES.allday') : ''
                            }${!isLast ? ', ' : ' '}`}
                          </Text>
                        );
                      })}
                    </Text>
                  </View>
                </View>
              </ScrollView>
              <View
                style={[
                  preferencesStyles.viewInviteToggle,
                  {
                    paddingTop: 10,
                  },
                ]}>
                <Text style={preferencesStyles.titleInvite}>
                  {t('DASHBOARD.stopReceivingInvites')}
                </Text>
                <Segment>
                  <Text style={preferencesStyles.itemInvite}>
                    {t('DASHBOARD.y')}
                  </Text>
                  <Button
                    onPress={this.stopReceivingInvites}
                    style={
                      preferencesStyles[
                        this.state.stopReceivingInvites
                          ? 'buttonLeftActive'
                          : 'buttonLeftInactive'
                      ]
                    }
                    first
                    active>
                    <Icon
                      style={{ color: BLUE_DARK }}
                      name={
                        this.state.stopReceivingInvites
                          ? 'md-radio-button-on'
                          : 'md-radio-button-off'
                      }
                      size={5}
                    />
                  </Button>
                  <Button
                    onPress={this.startReceivingInvites}
                    style={
                      preferencesStyles[
                        this.state.stopReceivingInvites
                          ? 'buttonRightInactive'
                          : 'buttonRightActive'
                      ]
                    }
                    last>
                    <Icon
                      style={{ color: VIOLET_MAIN }}
                      name={
                        this.state.stopReceivingInvites
                          ? 'md-radio-button-off'
                          : 'md-radio-button-on'
                      }
                      size={5}
                    />
                  </Button>
                  <Text style={preferencesStyles.itemInvite}>
                    {t('DASHBOARD.n')}
                  </Text>
                </Segment>
              </View>
            </Content>
          </Container>
        )}
      </I18n>
    );
  }

  firstLoad = () => {
    this.setState({ isLoading: true }, () => {
      const promises = [];
      promises.push(inviteActions.getPositions());
      promises.push(inviteActions.getJobPreferences());
      promises.push(inviteActions.getAvailability());
      promises.push(inviteActions.getProfile());
      Promise.all(promises).then(() => fetchNarrowPreferences());
    });
  };

  refreshPreferences = () => {
    this.setState({ isRefreshing: true }, () => {
      this.getPositions();
      this.getJobPreferences();
      this.getAvailability();
      this.getProfile();
    });
  };

  /**
   * Sets the value to minimumHourlyRate and remove the preview value
   * @param  {number} minimumHourlyRate
   */
  onHourlySlidingComplete = (minimumHourlyRate) => {
    this.setState(
      {
        minimumHourlyRate,
        minimumHourlyRatePrev: null,
      },
      this.editJobPreferences,
    );
  };

  /**
   * Sets the value to maximumJobDistanceMiles and remove the preview value
   * @param  {number} maximumJobDistanceMiles
   */
  onDistanceSlidingComplete = (maximumJobDistanceMiles) => {
    this.setState(
      {
        maximumJobDistanceMiles,
        maximumJobDistanceMilesPrev: null,
      },
      this.editJobPreferences,
    );
  };

  getProfile = () => {
    inviteActions.getProfile();
  };

  getPositions = () => {
    inviteActions.getPositions();
  };

  isPositionSelected = (position) => {
    if (!position || !Array.isArray(this.state.positionList)) {
      return false;
    }

    for (const pos of this.state.positions) {
      if (pos.id === position.id) return true;
    }

    return false;
  };

  getJobPreferences = () => {
    inviteActions.getJobPreferences();
  };

  editJobPreferences = () => {
    inviteActions.editJobPreferences(
      String(this.state.minimumHourlyRate),
      this.state.maximumJobDistanceMiles,
    );
  };

  getAvailability = () => {
    inviteActions.getAvailability();
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  };

  stopReceivingInvites = () => {
    inviteActions.stopReceivingInvites(true);
  };

  startReceivingInvites = () => {
    inviteActions.stopReceivingInvites(false);
  };
}

export default JobPreferences;
