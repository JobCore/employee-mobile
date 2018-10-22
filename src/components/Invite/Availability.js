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
                 <Button style={styles.buttonHour} rounded bordered small>
                  <Text style={styles.textHour}>
                    {moment(block.starting_at).format('h:a')}
                  </Text>
                </Button>

                <View style={styles.textToView}>
                  <Text style={styles.textTo}>
                    {t('APP.to')}
                  </Text>
                </View>

                <Button style={styles.buttonHour} rounded bordered small>
                  <Text style={styles.textHour}>
                    {moment(block.ending_at).format('h:a')}
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

  /**
   * To edit allday value
   * @param  {boolean} allday if available all day
   * @param {object} availability the availability block
   */
  setAllday(allday, availability) {
    if (!availability) return;

    const availabilityCopy = Object.assign({}, availability);
    availabilityCopy.allday = allday;

    this.editAvailability(availabilityCopy);
  }

  editAvailability = (availability) => {
    if (!availability) return;

    inviteActions.editAvailability(
      availability.starting_at,
      availability.ending_at,
      availability.allday,
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
