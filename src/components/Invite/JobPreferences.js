import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Slider,
  RefreshControl,
} from "react-native";
import { Container, Header, Content, Button, Text, Left, Body, Title, Right, ListItem, Form, Spinner } from 'native-base';
import styles from './JobPreferencesStyle';
import { BLUE_DARK, BLUE_MAIN } from '../../constants/colorPalette'
import { SETTING_ROUTE, AVAILABILITY_ROUTE, POSITION_ROUTE } from "../../constants/routes";
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { FormViewPreferences } from "../../utils/platform";
import { CustomToast, Loading } from '../../utils/components';
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
      isRefreshing: false,
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
    this.inviteStoreError = inviteStore
      .subscribe('InviteStoreError', (err) => this.errorHandler(err));

    this.firstLoad();
  }

  componentWillUnmount() {
    this.getPositionsSubscription.unsubscribe();
    this.getJobPreferencesSubscription.unsubscribe();
    this.editJobPreferencesSubscription.unsubscribe();
    this.getAvailabilitySubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
  }

  getPositionsHandler = (positionList) => {
    this.setState({ positionList });
  }

  getJobPreferencesHandler = (data) => {
    this.setState({
      isLoading: false,
      isRefreshing: false,
      positions: data.positions,
      minimumHourlyRate: Number(data.minimum_hourly_rate),
      maximumJobDistanceMiles: data.maximum_job_distance_miles,
    });
  }

  editJobPreferencesHandler = (data) => {
    LOG(this, 'Preferences updated');
  }

  getAvailabilityHandler = (data) => {
    this.setState({ availability: data });
  }

  errorHandler = (err) => {
    this.isLoading(false);
    this.setState({ isRefreshing: false });
    CustomToast(err, 'danger');
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
      <Container>
        {this.state.isLoading ? <Loading/> : null}

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

        <Content padder
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.refreshPreferences}/>
          }>
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
              <Button onPress={() =>
              this.props.navigation.navigate(AVAILABILITY_ROUTE)}
               full
               rounded
               style={styles.buttonRounded}>
                <Text uppercase={false} style={styles.textButton}>
                {t('JOB_PREFERENCES.availability')}
                </Text>
              </Button>

              {(Array.isArray(this.state.availability)) ?
                <View style={styles.viewPositions}>
                  <Text>
                   {this.state.availability.map((block, index) => {
                     const isLast = (index ===
                       this.state.availability.length - 1)
                       ? true
                       : false

                       return(
                         <Text style={styles.textPositions} key={index}>
                           {`${moment(block.starting_at).format('dddd: h:mma')}${(!isLast) ? ', ' : ' '}`}
                         </Text>
                       );
                   })}
                 </Text>
               </View>
               : null }
            </View>

          </ScrollView>
        </Content>
      </Container>
    )}</I18n>);
  }

  firstLoad = () => {
    this.setState({ isLoading: true }, () => {
      this.getPositions();
      this.getJobPreferences();
      this.getAvailability();
    });
  }

  refreshPreferences = () => {
    this.setState({ isRefreshing: true }, () => {
      this.getPositions();
      this.getJobPreferences();
      this.getAvailability();
    });
  }

  /**
   * Sets the value to minimumHourlyRate and remove the preview value
   * @param  {number} minimumHourlyRate
   */
  onHourlySlidingComplete = (minimumHourlyRate) => {
    this.setState({
      minimumHourlyRate,
      minimumHourlyRatePrev: null,
    }, this.editJobPreferences);
  }

  /**
   * Sets the value to maximumJobDistanceMiles and remove the preview value
   * @param  {number} maximumJobDistanceMiles
   */
  onDistanceSlidingComplete = (maximumJobDistanceMiles) => {
    this.setState({
      maximumJobDistanceMiles,
      maximumJobDistanceMilesPrev: null,
    }, this.editJobPreferences);
  }

  getPositions = () => {
    inviteActions.getPositions();
  }

  isPositionSelected = (position) => {
    if (!position || !Array.isArray(this.state.positionList)) {
      return false;
    }

    for (const pos of this.state.positions) {
      if (pos.id === position.id) return true;
    }

    return false;
  }

  getJobPreferences = () => {
    inviteActions.getJobPreferences();
  }

  editJobPreferences = () => {
    inviteActions.editJobPreferences(
      String(this.state.minimumHourlyRate),
      this.state.maximumJobDistanceMiles,
    );
  }

  getAvailability = () => {
    inviteActions.getAvailability();
  }

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }
}
export default JobPreferences;
