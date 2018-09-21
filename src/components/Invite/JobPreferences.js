import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import { Container, Header, Content, Button, Text, Left, Body, Title, Right, Accordion, List, ListItem, Icon, Segment, Item, Input, Form, Label, Toast, Spinner, CheckBox } from 'native-base';
import styles from './JobPreferencesStyle';
import { BLUE_DARK, BLUE_LIGHT, BLUE_MAIN } from '../../constants/colorPalette'
import { TABBAR_ROUTE, SETTING_ROUTE, ADD_UNAVAILABILITY_ROUTE } from "../../constants/routes";
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { FormViewPreferences } from "../../utils/platform";
import { LOG, WARN, ERROR } from "../../utils";
import moment from 'moment';

class JobPreferences extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('JOB_PREFERENCES.jobPreferences'),
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
      positionList: [],
      positions: [],
      unavailability: [],
      minimumHourlyRate: '',
      availableOnWeekends: false,
    }
  }

  componentDidMount() {
    this.getPositionsSubscription = inviteStore
      .subscribe('GetPositions', (positionList) => this.getPositionsHandler(positionList));
    this.getJobPreferencesSubscription = inviteStore
      .subscribe('GetJobPreferences', (data) => this.getJobPreferencesHandler(data));
    this.editJobPreferencesSubscription = inviteStore
      .subscribe('EditJobPreferences', (data) => this.editJobPreferencesHandler(data));
    this.getUnavailabilitySubscription = inviteStore
      .subscribe('GetUnavailability', (data) => this.getUnavailabilityHandler(data));
    this.deleteUnavailabilitySubscription = inviteStore
      .subscribe('DeleteUnavailability', (data) => this.deleteUnavailabilityHandler(data));
    this.inviteStoreError = inviteStore
      .subscribe('InviteStoreError', (err) => this.errorHandler(err));

    this.isLoading(true);
    this.getPositions();
    this.getJobPreferences();
    this.getUnavailability();
  }

  getPositionsHandler = (positionList) => {
    this.setState({ positionList });
  }

  getJobPreferencesHandler = (data) => {
    this.isLoading(false);

    this.setState({
      positions: data.positions,
      minimumHourlyRate: data.minimum_hourly_rate,
      availableOnWeekends: data.available_on_weekends,
    });
  }

  editJobPreferencesHandler = (data) => {
    this.getJobPreferences();

    Toast.show({
      type: "success",
      text: i18next.t('JOB_PREFERENCES.preferencesUpdated'),
      duration: 4000,
    });
  }

  getUnavailabilityHandler = (data) => {
    this.setState({ unavailability: data });
  }

  deleteUnavailabilityHandler = () => {
    this.isLoading(false);
    this.getUnavailability();

    Toast.show({
      type: "success",
      text: i18next.t('JOB_PREFERENCES.unavailabilityDeleted'),
      duration: 4000,
    });
  }

  errorHandler = (err) => {
    this.isLoading(false);
    Toast.show({
      type: "danger",
      text: JSON.stringify(err),
      duration: 4000,
    });
  }

  componentWillUnmount() {
    this.getPositionsSubscription.unsubscribe();
    this.getJobPreferencesSubscription.unsubscribe();
    this.editJobPreferencesSubscription.unsubscribe();
    this.getUnavailabilitySubscription.unsubscribe();
    this.deleteUnavailabilitySubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
  }

  _renderHeaderPosition() {
    return (<I18n>{(t, { i18n }) => (
      <View style={styles.viewHeader}>
        <Text style={styles.textHeader}>
          {t('JOB_PREFERENCES.selectPosition')}
        </Text>
      </View>
    )}</I18n>);
  }

  _renderHeaderAvailibility() {
    return (<I18n>{(t, { i18n }) => (
      <View style={styles.viewHeader}>
        <Text style={styles.textHeader}>
          {t('JOB_PREFERENCES.selectUnavailability')}
        </Text>
      </View>
    )}</I18n>);
  }

  _renderPosition = () => {
    return (
      <ScrollView style={styles.contentScroll}>
      <List style={{marginBottom: 30, paddingLeft: 0,}}>
        {(Array.isArray(this.state.positionList)) ?
         this.state.positionList.map((position) => {
           const isPositionSelected = this.isPositionSelected(position);

        return (<ListItem onPress={() => this.selectUnselectPosition(position, isPositionSelected)} key={position.id} selected={isPositionSelected} style={styles.itemSelectCheck}>
          <Left>
            <Text style={styles.textList}>{position.title}</Text>
          </Left>
          <Right>
            <Icon name={(isPositionSelected)
              ? "ios-checkmark-circle"
              : "ios-radio-button-off" } style={{fontSize: 20, color: BLUE_DARK}}/>
          </Right>
        </ListItem>)})
       : null}
      </List>
    </ScrollView>
    );
  }

  _renderAvailability = () => {
    return (<I18n>{(t, { i18n }) => (
      <ScrollView style={styles.contentScroll}>
      <List style={{marginBottom: 30, paddingLeft: 0,}}>
        <ListItem onPress={() => this.props.navigation.navigate(ADD_UNAVAILABILITY_ROUTE)} style={styles.itemSelectCheck}>
          <Left>
            <Text style={styles.textList}>
              {i18next.t('JOB_PREFERENCES.addUnavailability')}
            </Text>
          </Left>
          <Right>
            <Icon name="ios-add-circle" style={{fontSize: 20, color: BLUE_DARK}}/>
          </Right>
        </ListItem>

        {(Array.isArray(this.state.unavailability)) ?
         this.state.unavailability.map((unavailability) =>
        <ListItem onPress={() => this.deleteUnavailability(unavailability)} key={unavailability.id} style={styles.itemSelectCheck}>
          <Left>
            <Text style={styles.textList}>{t('JOB_PREFERENCES.dateStartToEnd', {
              startingAt: moment(unavailability.starting_at).format('lll'),
              endingAt: moment(unavailability.ending_at).format('lll'),
            })}</Text>
          </Left>
          <Right>
            <Icon name="ios-trash" style={{fontSize: 20, color: BLUE_DARK}}/>
          </Right>
        </ListItem>)
       : null}
      </List>
    </ScrollView>
    )}</I18n>);
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
          <Left/>
          <Body>
            <Title style={styles.titleHeader}>
              {t('JOB_PREFERENCES.jobPreferences')}
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate(SETTING_ROUTE)}>
              <Image
                style={{resizeMode: 'contain', height: 25,}}
                source={require('../../assets/image/controls.png')}
              />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <ScrollView>
            <Accordion dataArray={[{ title: t('JOB_PREFERENCES.selectUnavailability') }]}
              style={styles.accordionAvailability}
              renderContent={this._renderAvailability}
              renderHeader={this._renderHeaderAvailibility}
            />

            <Text style={styles.textAvailability}>
              {t('JOB_PREFERENCES.jobPreferences')}
            </Text>
            <Accordion dataArray={[{ title: t('JOB_PREFERENCES.selectPosition') }]}
              style={styles.accordionPosition}
              renderContent={this._renderPosition}
              renderHeader={this._renderHeaderPosition}
            />

            <FormViewPreferences>
              <Form>
                <Item style={styles.viewInput} rounded>
                  <CheckBox onPress={() => this.setState({ availableOnWeekends: !this.state.availableOnWeekends })} checked={this.state.availableOnWeekends} color={BLUE_DARK}/>
                  <Body>
                    <Text onPress={() => this.setState({ availableOnWeekends: !this.state.availableOnWeekends })} style={styles.weekendsText}>
                      {t('JOB_PREFERENCES.availableOnWeekends')}
                    </Text>
                  </Body>
                </Item>
                <Item style={styles.viewInput} inlineLabel rounded>
                  <Label style={styles.labelForm}>
                    {t('JOB_PREFERENCES.hourlyRateLabel')}
                  </Label>
                  <Input value={this.state.minimumHourlyRate}
                        placeholder={t('JOB_PREFERENCES.minimumHourlyRate')}
                             onChangeText={(text) => this.setState({minimumHourlyRate: text})}/>
                </Item>
              </Form>
            </FormViewPreferences>

            <View style={styles.viewCrud}>
              <View style={styles.viewButtomLeft}>
                <Button onPress={this.editJobPreferences}
                  style={styles.buttomLeft} full rounded>
                  <Text style={styles.textButtomLeft}>
                    {t('JOB_PREFERENCES.save')}
                  </Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </Content>
      </Container>
    )}</I18n>);
  }

  getPositions = () => {
    inviteActions.getPositions();
  }

  /**
   * Select or unselect position based on isPositionSelected
   * @param  {object}  position           the position
   * @param  {Boolean} isPositionSelected if the position is selected
   */
  selectUnselectPosition = (position, isPositionSelected) => {
    let positionsCopy;

    if (isPositionSelected) {
      positionsCopy = this.state.positions.filter(e => e.id !== position.id);
    }

    if (!isPositionSelected) {
      positionsCopy = this.state.positions;
      positionsCopy.push(position);
    }

    if (Array.isArray(positionsCopy)) {
      this.setState({ positions: positionsCopy });
    }
  }

  isPositionSelected = (position) => {
    if (!position || !Array.isArray(this.state.positionList)) {
      return false;
    }

    for (pos of this.state.positions) {
      if (pos.id === position.id) return true;
    }

    return false;
  }

  getJobPreferences = () => {
    inviteActions.getJobPreferences();
  }

  editJobPreferences = () => {
    Alert.alert(
      i18next.t('JOB_PREFERENCES.editJobPreferences'),
      '', [{
        text: i18next.t('APP.cancel'),
        onPress: () => {
          LOG(this, 'Cancel editJobPreferences');
        }
      }, {
        text: i18next.t('JOB_PREFERENCES.update'),
        onPress: () => {
          this.isLoading(true);

          inviteActions.editJobPreferences(
            this.state.positions.map((position) => position.id),
            this.state.minimumHourlyRate,
            this.state.availableOnWeekends,
          );
        }
      }, ], { cancelable: false }
    );
  }

  getUnavailability = () => {
    inviteActions.getUnavailability();
  }

  deleteUnavailability = (unavailability) => {
    if (!unavailability) return;

    Alert.alert(
      i18next.t('JOB_PREFERENCES.deleteUnavailability'),
      '', [{
        text: i18next.t('APP.cancel'),
        onPress: () => {
          LOG(this, 'Cancel deleteUnavailability');
        }
      }, {
        text: i18next.t('JOB_PREFERENCES.delete'),
        onPress: () => {
          this.isLoading(true);
          inviteActions.deleteUnavailability(unavailability.id);
        }
      }, ], { cancelable: false }
    )
  }

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }
}
export default JobPreferences;
