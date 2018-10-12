import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Slider,
} from "react-native";
import { Container, Header, Content, Button, Text, Left, Body, Title, Right, Accordion, List, ListItem, Icon, Segment, Item, Input, Form, Label, Toast, Spinner, CheckBox } from 'native-base';
import styles from './JobPreferencesStyle';
import { BLUE_DARK, BLUE_LIGHT, BLUE_MAIN } from '../../constants/colorPalette'
import { TABBAR_ROUTE, SETTING_ROUTE, ADD_AVAILABILITY_ROUTE, POSITION_ROUTE } from "../../constants/routes";
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
      availability: [],
      minimumHourlyRate: 0,
      minimumHourlyRatePrev: null,
      minHourly: 8,
      maxHourly: 60,
      maximumJobDistanceMiles: 0,
      maximumJobDistanceMilesPrev: null,
      minDistance: 10,
      maxDistance: 100,
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
    this.getAvailabilitySubscription = inviteStore
      .subscribe('GetAvailability', (data) => this.getAvailabilityHandler(data));
    this.deleteAvailabilitySubscription = inviteStore
      .subscribe('DeleteAvailability', (data) => this.deleteAvailabilityHandler(data));
    this.inviteStoreError = inviteStore
      .subscribe('InviteStoreError', (err) => this.errorHandler(err));

    this.isLoading(true);
    this.getPositions();
    this.getJobPreferences();
    // this.getAvailability();
  }

  getPositionsHandler = (positionList) => {
    this.setState({ positionList });
  }

  getJobPreferencesHandler = (data) => {
    this.isLoading(false);

    this.setState({
      positions: data.positions,
      minimumHourlyRate: Number(data.minimum_hourly_rate),
      maximumJobDistanceMiles: data.maximum_job_distance_miles,
    });
  }

  editJobPreferencesHandler = (data) => {
    this.getJobPreferences();

    Toast.show({
      position: 'top',
      type: "success",
      text: i18next.t('JOB_PREFERENCES.preferencesUpdated'),
      duration: 4000,
    });
  }

  getAvailabilityHandler = (data) => {
    this.setState({ availability: data });
  }

  deleteAvailabilityHandler = () => {
    this.isLoading(false);
    this.getAvailability();

    Toast.show({
      position: 'top',
      type: "success",
      text: i18next.t('JOB_PREFERENCES.availabilityDeleted'),
      duration: 4000,
    });
  }

  errorHandler = (err) => {
    this.isLoading(false);
    Toast.show({
      position: 'top',
      type: "danger",
      text: JSON.stringify(err),
      duration: 4000,
    });
  }

  componentWillUnmount() {
    this.getPositionsSubscription.unsubscribe();
    this.getJobPreferencesSubscription.unsubscribe();
    this.editJobPreferencesSubscription.unsubscribe();
    this.getAvailabilitySubscription.unsubscribe();
    this.deleteAvailabilitySubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
  }

  _renderHeaderAvailibility() {
    return (<I18n>{(t, { i18n }) => (
      <View style={styles.viewHeader}>
        <Text style={styles.textHeader}>
          {t('JOB_PREFERENCES.selectAvailability')}
        </Text>
      </View>
    )}</I18n>);
  }

  _renderAvailability = () => {
    return (<I18n>{(t, { i18n }) => (
      <ScrollView style={styles.contentScroll}>
      <List style={{marginBottom: 30, paddingLeft: 0,}}>
        <ListItem onPress={() => this.props.navigation.navigate(ADD_AVAILABILITY_ROUTE)} style={styles.itemSelectCheck}>
          <Left>
            <Text style={styles.textList}>
              {i18next.t('JOB_PREFERENCES.addAvailability')}
            </Text>
          </Left>
          <Right>
            <Icon name="ios-add-circle" style={{fontSize: 20, color: BLUE_DARK}}/>
          </Right>
        </ListItem>

        {(Array.isArray(this.state.availability)) ?
         this.state.availability.map((availability) =>
        <ListItem onPress={() => this.deleteAvailability(availability)} key={availability.id} style={styles.itemSelectCheck}>
          <Left>
            <Text style={styles.textList}>{t('JOB_PREFERENCES.dateStartToEnd', {
              startingAt: moment(availability.starting_at).format('lll'),
              endingAt: moment(availability.ending_at).format('lll'),
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
            <View style={styles.viewButtonPosition}>
              <Button onPress={() =>
               this.props.navigation.navigate(POSITION_ROUTE)}
               full
               rounded
               style={styles.buttonRounded}>
                <Text uppercase={false} style={styles.textButton}>
                  {t('JOB_PREFERENCES.position')}
                </Text>
              </Button>


              {(Array.isArray(this.state.positions)) ?
                <View style={styles.viewPositions}>
                  <Text>
                   {this.state.positions.map((position, index) => {
                     const isLast = (index ===
                       this.state.positions.length - 1)
                       ? true
                       : false

                       return(
                         <Text style={styles.textPositions} key={index}>
                           {`${position.title}${(!isLast) ? ', ' : ' '}`}
                         </Text>
                       );
                   })}
                 </Text>
               </View>
               : null }
            </View>

            <FormViewPreferences>
              <Form>
                <Text style={styles.sliderLabel}>
                  {t('JOB_PREFERENCES.minimumHourlyRate')}
                </Text>
                <ListItem noBorder>
                  <Left></Left>
                  <Body>
                    <Text style={styles.sliderValue}>
                      {`$${this.state.minimumHourlyRatePrev || this.state.minimumHourlyRate}`}
                    </Text>
                  </Body>
                  <Right>
                    <Text style={styles.sliderMaxValue}>
                      {`$${this.state.maxHourly}`}
                    </Text>
                  </Right>
                </ListItem>
                <Slider
                  step={1}
                  minimumValue={this.state.minHourly}
                  maximumValue={this.state.maxHourly}
                  onValueChange={(minimumHourlyRatePrev) => this.setState({minimumHourlyRatePrev})}
                  onSlidingComplete={this.onHourlySlidingComplete}
                  value={this.state.minimumHourlyRate}
                  thumbTintColor={BLUE_DARK}
                  minimumTrackTintColor={BLUE_DARK}
                  maximumTrackTintColor={BLUE_MAIN}/>

                <Text style={styles.sliderLabel}>
                  {t('JOB_PREFERENCES.maximumJobDistanceMiles')}
                </Text>
                <ListItem noBorder>
                  <Left></Left>
                  <Body>
                    <Text style={styles.sliderValue}>
                      {`${this.state.maximumJobDistanceMilesPrev || this.state.maximumJobDistanceMiles}M`}
                    </Text>
                  </Body>
                  <Right>
                    <Text style={styles.sliderMaxValue}>
                      {`${this.state.maxDistance}M`}
                    </Text>
                  </Right>
                </ListItem>
                <Slider
                  step={1}
                  minimumValue={this.state.minDistance}
                  maximumValue={this.state.maxDistance}
                  onValueChange={(maximumJobDistanceMilesPrev) => this.setState({maximumJobDistanceMilesPrev})}
                  onSlidingComplete={this.onDistanceSlidingComplete}
                  value={this.state.maximumJobDistanceMiles}
                  thumbTintColor={BLUE_DARK}
                  minimumTrackTintColor={BLUE_DARK}
                  maximumTrackTintColor={BLUE_MAIN}/>
              </Form>
            </FormViewPreferences>

            <View style={styles.viewButtonAvailability}>
              <Button /*onPress={() =>
              this.props.navigation.navigate(AVAILABILITY_ROUTE)}*/
               full
               rounded
               style={styles.buttonRounded}>
                <Text uppercase={false} style={styles.textButton}>
                {t('JOB_PREFERENCES.availability')}
                </Text>
              </Button>
            </View>

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

  /**
   * Sets the value to minimumHourlyRate and remove the preview value
   * @param  {number} minimumHourlyRate
   */
  onHourlySlidingComplete = (minimumHourlyRate) => {
    this.setState({
      minimumHourlyRate,
      minimumHourlyRatePrev: null,
    });
  }

  /**
   * Sets the value to maximumJobDistanceMiles and remove the preview value
   * @param  {number} maximumJobDistanceMiles
   */
  onDistanceSlidingComplete = (maximumJobDistanceMiles) => {
    this.setState({
      maximumJobDistanceMiles,
      maximumJobDistanceMilesPrev: null,
    });
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
            String(this.state.minimumHourlyRate),
            this.state.maximumJobDistanceMiles,
          );
        }
      }, ], { cancelable: false }
    );
  }

  getAvailability = () => {
    inviteActions.getAvailability();
  }

  deleteAvailability = (availability) => {
    if (!availability) return;

    Alert.alert(
      i18next.t('JOB_PREFERENCES.deleteAvailability'),
      '', [{
        text: i18next.t('APP.cancel'),
        onPress: () => {
          LOG(this, 'Cancel deleteAvailability');
        }
      }, {
        text: i18next.t('JOB_PREFERENCES.delete'),
        onPress: () => {
          this.isLoading(true);
          inviteActions.deleteAvailability(availability.id);
        }
      }, ], { cancelable: false }
    )
  }

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }
}
export default JobPreferences;
