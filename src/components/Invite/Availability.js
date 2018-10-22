import React, { Component } from "react";
import {
  View,
  Image,
  RefreshControl,
} from "react-native";
import { Container, Header, Content, Button, Text, Left, Body, Title, Right, List, ListItem, Icon, Spinner, Radio } from 'native-base';
import styles from './AvailabilityStyle';
import { BLUE_DARK, BLUE_MAIN, WHITE_MAIN } from '../../constants/colorPalette';
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { LOG, WARN, ERROR } from "../../utils";
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

class AddAvailability extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('JOB_PREFERENCES.availability'),
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
      isRefreshing: false,
      startTimePickerVisible: false,
      endTimePickerVisible: false,
      selectedAvailability: {},
      availability: Object.assign([], inviteStore.getState('GetAvailability')),
    };
  }

  componentDidMount() {
    this.editAvailabilitySubscription = inviteStore
      .subscribe('EditAvailability', (data) => this.editAvailabilityHandler(data));
    this.getAvailabilitySubscription = inviteStore
      .subscribe('GetAvailability', (data) => this.getAvailabilityHandler(data));
    this.inviteStoreError = inviteStore
      .subscribe('InviteStoreError', (err) => this.errorHandler(err));

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
  }

  getAvailabilityHandler = (availability) => {
    this.setState({
      availability,
      isRefreshing: false,
    });

    this.isLoading(false);
  }

  errorHandler = (err) => {
    this.isLoading(false);
    this.setState({ isRefreshing: false });
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
              {t('JOB_PREFERENCES.availability')}
            </Title>
          </Body>
          <Right/>
        </Header>

        <Content padder
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.refreshAvailability}/>
          }>

          <DateTimePicker
            mode={'time'}
            is24Hour={false}
            isVisible={this.state.startTimePickerVisible}
            onConfirm={(date) => this.handleStartTimePicked(date)}
            onCancel={this.hideEndTimePicker}
          />
          <DateTimePicker
            mode={'time'}
            is24Hour={false}
            isVisible={this.state.endTimePickerVisible}
            onConfirm={(date) => this.handleEndTimePicked(date)}
            onCancel={this.hideStartTimePicker}
          />

        <View style={styles.viewContainer}>
          <List>
            <ListItem style={styles.itemSelectCheck}>
              <Body>
                <Text style={styles.textAlldayOr}>
                  {`${t('JOB_PREFERENCES.allday')}    ${t('JOB_PREFERENCES.orSpecificTime')}`}
                </Text>
              </Body>
            </ListItem>
            {(Array.isArray(this.state.availability)) ?
             this.state.availability.map((block) =>
              <ListItem key={block.id}  style={styles.itemSelectCheck}>
                <Text style={styles.textDay}>
                  {moment(block.starting_at).format('dddd')}
                </Text>

                <Radio onPress={() => this.setAllday(true, block)} style={styles.radioButtonLeft} color={BLUE_MAIN} selectedColor={BLUE_DARK} selected={block.allday}/>

                <Radio onPress={() => this.setAllday(false, block)} style={styles.radioButtonRight} color={BLUE_MAIN} selectedColor={BLUE_DARK} selected={!block.allday}/>

                {(block.allday === false) ?
                <View style={{flexDirection: 'row'}}>
                 <Button onPress={() => this.showStartTimePicker(block)} style={styles.buttonHour} rounded bordered small>
                    <Text style={styles.textHour}>
                      {moment(block.starting_at).format('h:mm:a')}
                    </Text>
                 </Button>

                <View style={styles.textToView}>
                  <Text style={styles.textTo}>
                    {t('APP.to')}
                  </Text>
                </View>

                <Button onPress={() => this.showEndTimePicker(block)} style={styles.buttonHour} rounded bordered small>
                  <Text style={styles.textHour}>
                    {moment(block.ending_at).format('h:mm:a')}
                  </Text>
                </Button>

                </View>
                : null}
              </ListItem>)
              : null}
          </List>
        </View>
        </Content>
      </Container>)
        }</I18n>);
  }

  showStartTimePicker = (availability) => {
    this.setState({
      selectedAvailability: availability,
      startTimePickerVisible: true,
    });
  }

  showEndTimePicker = (availability) => {
    this.setState({
      selectedAvailability: availability,
      endTimePickerVisible: true,
    });
  }

  hideStartTimePicker = () => {
    this.setState({ startTimePickerVisible: false });
  }

  hideEndTimePicker = () => {
    this.setState({ endTimePickerVisible: false });
  }

  /**
   * handle StartTime Picked
   * @param  {date} dateTime date string from the timePicker
   */
  handleStartTimePicked = (dateTime) => {
    this.hideStartTimePicker();

    this.editAvailabilityTime(dateTime, this.state.selectedAvailability, 'starting_at');
  };

  /**
   * handle EndTime Picked
   * @param  {date} dateTime date string from the timePicker
   */
  handleEndTimePicked = (dateTime) => {
    this.hideEndTimePicker();

    this.editAvailabilityTime(dateTime, this.state.selectedAvailability, 'ending_at');
  };

  /**
   * Edit availability time (hour/minute) given a specific date with the time
   * used for timePicker handlers
   * @param  {object} availability   the availability block to change the time
   * @param  {date} dateTime date string to get the new hour/minute
   * @param  {'starting_at'|'ending_at'} startOrEndDate the field to update
   */
  editAvailabilityTime(dateTime, availability, startOrEndDate) {
    if (!availability || (startOrEndDate !== 'starting_at' &&
        startOrEndDate !== 'ending_at')) {
      return;
    }

    const availabilityCopy = Object.assign({}, availability);
    const hour = moment(dateTime).get('hour');
    const minute = moment(dateTime).get('minute');

    availabilityCopy[startOrEndDate] = moment(dateTime)
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

    this.editAvailabilityAllday(availabilityCopy);
  }

  editAvailabilityAllday = (availability) => {
    if (!availability) return;

    inviteActions.editAvailabilityAllday(
      availability.allday,
      availability.id,
    );
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
  }

  getAvailability = () => {
    inviteActions.getAvailability();
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }
}

export default AddAvailability;
