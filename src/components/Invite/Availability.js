import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Slider,
  RefreshControl,
} from "react-native";
import { Container, Header, Content, Button, Text, Left, Body, Title, Right, Accordion, List, ListItem, Icon, Segment, Item, Input, Form, Label, Toast, Spinner, CheckBox } from 'native-base';
import styles from './PositionStyle';
import { BLUE_DARK, BLUE_LIGHT, BLUE_MAIN, WHITE_MAIN } from '../../constants/colorPalette'
import { TABBAR_ROUTE, SETTING_ROUTE, } from "../../constants/routes";
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
      .subscribe('AddAvailability', (data) => this.editAvailabilityHandler(data));
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
    LOG(this, 'Edit availability: data');
    this.getAvailability();
  }

  getAvailabilityHandler = (data) => {
    this.setState({
      availability,
      isRefreshing: false,
    });

    this.isLoading(false);
  }

  errorHandler = (err) => {
    this.isLoading(false);
    this.setState({ isRefreshing: false });
    Toast.show({
      position: 'top',
      type: "danger",
      text: JSON.stringify(err),
      duration: 4000,
    });
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

        <Content
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.refreshAvailability}/>
          }
          padder>
        <View style={styles.viewContainer}>
          <Button
             full
             rounded
             style={styles.buttonPosition}>
              <Text uppercase={false} style={styles.textHeader}>
              {t('JOB_PREFERENCES.availability')}
              </Text>
          </Button>
          <ScrollView style={styles.contentScroll}>
          <List style={{marginBottom: 30, paddingLeft: 0,}}>
            {(Array.isArray(this.state.availability)) ?
             this.state.availability.map((availability) =>
              <ListItem key={availability.id} selected={isPositionSelected} style={styles.itemSelectCheck}>
              <Left>
                <Text>{availability.id}</Text>
              </Left>
              <Body>
                <Text>{availability.id}</Text>
              </Body>
              <Right>
                <Text>{availability.id}</Text>
              </Right>
              </ListItem>)
              : null}
          </List>
          </ScrollView>
        </View>
        </Content>
      </Container>)
        }</I18n>);
  }

  editAvailability = (availability) => {
    if (!availability) return;

    inviteActions.editAvailability(
      availability.startingAt,
      availability.endingAt,
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
