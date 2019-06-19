import React, { Component } from 'react';
import { View, Image, RefreshControl, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Body,
  List,
  ListItem,
  Icon,
} from 'native-base';
import styles from './AvailabilityStyle';
import { BLUE_DARK, BLUE_MAIN } from '../../shared/colorPalette';
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { LOG } from '../../shared';
import { Loading } from '../../shared/components';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { ModalHeader } from '../../shared/components/ModalHeader';

class AddAvailability extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('JOB_PREFERENCES.availability'),
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
      isRefreshing: false,
      startTimePickerVisible: false,
      endTimePickerVisible: false,
      selectedAvailability: {},
      availability: Object.assign([], inviteStore.getState('GetAvailability')),
    };
  }

  componentDidMount() {
    this.editAvailabilitySubscription = inviteStore.subscribe(
      'EditAvailability',
      (data) => this.editAvailabilityHandler(data),
    );
    this.getAvailabilitySubscription = inviteStore.subscribe(
      'GetAvailability',
      (data) => this.getAvailabilityHandler(data),
    );
    this.inviteStoreError = inviteStore.subscribe('InviteStoreError', (err) =>
      this.errorHandler(err),
    );

    if (!this.state.availability.length) {
      this.getAvailability();
    }
  }

  componentWillUnmount() {
    this.editAvailabilitySubscription.unsubscribe();
    this.getAvailabilitySubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
  }

  editAvailabilityHandler = (data) => {
    LOG(this, `Edit availability: ${JSON.stringify(data)}`);
    this.getAvailability();
  };

  getAvailabilityHandler = (availability) => {
    this.setState({
      availability,
      isRefreshing: false,
    });

    this.isLoading(false);
  };

  errorHandler = () => {
    this.isLoading(false);
    this.setState({ isRefreshing: false });
  };

  render() {
    console.log(`DEBUG:availability`, this.state.availability);
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            <ModalHeader
              screenName="availablility"
              title={t('JOB_PREFERENCES.availability')}
            />
            <Content
              padder
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.refreshAvailability}
                />
              }>
              <DateTimePicker
                mode={'time'}
                is24Hour={false}
                isVisible={this.state.startTimePickerVisible}
                onConfirm={(date) => this.handleStartTimePicked(date)}
                onCancel={this.hideStartTimePicker}
              />
              <DateTimePicker
                mode={'time'}
                is24Hour={false}
                isVisible={this.state.endTimePickerVisible}
                onConfirm={(date) => this.handleEndTimePicked(date)}
                onCancel={this.hideEndTimePicker}
              />

              <View style={styles.viewContainer}>
                <List>
                  <ListItem style={styles.itemSelectCheck}>
                    <Body>
                      <Text style={styles.textAlldayOr}>
                        {`${t('JOB_PREFERENCES.allday')}    ${t(
                          'JOB_PREFERENCES.orSpecificTime',
                        )}`}
                      </Text>
                    </Body>
                  </ListItem>
                  {Array.isArray(this.state.availability)
                    ? this.state.availability.map((block) => (
                      <ListItem key={block.id} style={styles.itemSelectCheck}>
                        <View style={styles.viewContainerItems}>
                          <View style={styles.viewTextDay}>
                            <Text style={styles.textDay}>
                              {moment(block.starting_at)
                                .tz(moment.tz.guess())
                                .format('ddd')}
                            </Text>
                          </View>
                          <View style={styles.viewRadio}>
                            <View style={styles.radioItems}>
                              <View style={styles.radio}>
                                <TouchableOpacity
                                  style={styles.radioButtonLeft}
                                  onPress={() => this.setAllday(true, block)}
                                  rounded
                                  transparent>
                                  <Icon
                                    name={
                                      block.allday
                                        ? 'md-radio-button-on'
                                        : 'md-radio-button-off'
                                    }
                                    style={{
                                      color: block.allday
                                        ? BLUE_DARK
                                        : BLUE_MAIN,
                                      fontSize: 24,
                                    }}
                                  />
                                </TouchableOpacity>
                              </View>
                              <View style={styles.radio}>
                                <TouchableOpacity
                                  style={styles.radioButtonRight}
                                  onPress={() => this.setAllday(false, block)}
                                  rounded
                                  transparent>
                                  <Icon
                                    name={
                                      !block.allday
                                        ? 'md-radio-button-on'
                                        : 'md-radio-button-off'
                                    }
                                    style={{
                                      color: !block.allday
                                        ? BLUE_DARK
                                        : BLUE_MAIN,
                                      fontSize: 24,
                                    }}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                          <View style={styles.viewPicker}>
                            {block.allday === false ? (
                              <View style={{ flexDirection: 'row' }}>
                                <Button
                                  onPress={() =>
                                    this.showStartTimePicker(block)
                                  }
                                  style={styles.buttonHour}
                                  rounded
                                  bordered
                                  small>
                                  <Text style={styles.textHour}>
                                    {moment(block.starting_at)
                                      .tz(moment.tz.guess())
                                      .format('h:mma')}
                                  </Text>
                                </Button>
                                <View style={styles.textToView}>
                                  <Text style={styles.textTo}>
                                    {t('APP.to')}
                                  </Text>
                                </View>
                                <Button
                                  onPress={() =>
                                    this.showEndTimePicker(block)
                                  }
                                  style={styles.buttonHour}
                                  rounded
                                  bordered
                                  small>
                                  <Text style={styles.textHour}>
                                    {moment(block.ending_at)
                                      .tz(moment.tz.guess())
                                      .format('h:mma')}
                                  </Text>
                                </Button>
                              </View>
                            ) : null}
                          </View>
                        </View>
                      </ListItem>
                    ))
                    : null}
                </List>
              </View>
            </Content>
          </Container>
        )}
      </I18n>
    );
  }

  showStartTimePicker = (availability) => {
    this.setState({
      selectedAvailability: availability,
      startTimePickerVisible: true,
    });
  };

  showEndTimePicker = (availability) => {
    this.setState({
      selectedAvailability: availability,
      endTimePickerVisible: true,
    });
  };

  hideStartTimePicker = () => {
    this.setState({ startTimePickerVisible: false });
  };

  hideEndTimePicker = () => {
    this.setState({ endTimePickerVisible: false });
  };

  /**
   * handle StartTime Picked
   * @param  {date} dateTime date string from the timePicker
   */
  handleStartTimePicked = (dateTime) => {
    this.hideStartTimePicker();

    this.editAvailabilityTime(
      dateTime,
      this.state.selectedAvailability,
      'starting_at',
    );
  };

  /**
   * handle EndTime Picked
   * @param  {date} dateTime date string from the timePicker
   */
  handleEndTimePicked = (dateTime) => {
    this.hideEndTimePicker();

    this.editAvailabilityTime(
      dateTime,
      this.state.selectedAvailability,
      'ending_at',
    );
  };

  /**
   * Edit availability time (hour/minute) given a specific date with the time
   * used for timePicker handlers
   * @param  {object} availability   the availability block to change the time
   * @param  {date} dateTime date string to get the new hour/minute
   * @param  {'starting_at'|'ending_at'} startOrEndDate the field to update
   */
  editAvailabilityTime(dateTime, availability, startOrEndDate) {
    if (
      !availability ||
      (startOrEndDate !== 'starting_at' && startOrEndDate !== 'ending_at')
    ) {
      return;
    }

    const availabilityCopy = Object.assign({}, availability);
    const hour = moment(dateTime)
      .tz(moment.tz.guess())
      .get('hour');
    const minute = moment(dateTime)
      .tz(moment.tz.guess())
      .get('minute');

    availabilityCopy[startOrEndDate] = moment(availabilityCopy[startOrEndDate])
      .set('minute', minute)
      .set('hour', hour)
      .toISOString();

    this.editAvailabilityDates(availabilityCopy);
  }

  /**
   * To edit allday value
   * @param  {boolean} allday if available all day
   * @param {object} availability the availability block
   */
  setAllday(allday, availability) {
    if (!availability) return;

    const availabilityCopy = Object.assign({}, availability);
    availabilityCopy.allday = allday;

    inviteActions.editAvailability(availabilityCopy);
  }

  editAvailabilityAllday = (availability) => {
    if (!availability) return;

    inviteActions.editAvailabilityAllday(availability.allday, availability.id);
  };

  editAvailabilityDates = (availability) => {
    if (!availability) return;

    inviteActions.editAvailabilityDates(
      availability.starting_at,
      availability.ending_at,
      availability.id,
    );
  };

  refreshAvailability = () => {
    this.setState({ isRefreshing: true });
    this.getAvailability();
  };

  getAvailability = () => {
    inviteActions.getAvailability();
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  };
}

export default AddAvailability;
