import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image
} from "react-native";
import { Container, Header, Content, Button, Text, Left, Body, Title, Right, Segment, List, ListItem, Icon, Switch, Toast } from 'native-base';
import styles from './style'
import { BLUE_MAIN, BLUE_DARK, WHITE_MAIN } from "../../constants/colorPalette";
import { SETTING_ROUTE } from "../../constants/routes";
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import * as jobActions from './actions';
import jobStore from './JobStore';

class MyJobs extends Component {
  static navigationOptions = {
    tabBarLabel: i18next.t('MY_JOBS.myJobs'),
    tabBarIcon: ({ tintColor }) => (
      <Image
        style={{resizeMode: 'contain', height: 30}}
        source={require('../../assets/image/myJobs.png')}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isRefreshing: false,
      jobs: [],
      jobFilterSelected: 'getPendingJobs',
      // for jobs filters array.map
      jobFilters: [{
        name: 'pending', // must match the i18n translate
        action: 'getPendingJobs', // Must match the action's name
        style: 'pointPending', // must match the style's name
      }, {
        name: 'upcoming',
        action: 'getUpcomingJobs',
        style: 'pointUpcoming',
      }, {
        name: 'completed',
        action: 'getCompletedJobs',
        style: 'pointCompleted',
      }, {
        name: 'failed',
        action: 'getFailedJobs',
        style: 'pointPending',
      }, ]
    }
  }

  componentDidMount() {
    this.getUpcomingJobsSubscription = jobStore
      .subscribe('GetUpcomingJobs', (data) => {
        this.getUpcomingJobsHandler(data);
      });

    this.jobStoreError = jobStore
      .subscribe('JobStoreError', (err) => {
        this.errorHandler(err)
      });

    this.getJobs();
  }

  componentWillUnmount() {
    this.getUpcomingJobsSubscription.unsubscribe();
    this.jobStoreError.unsubscribe();
  }

  getUpcomingJobsHandler = (jobs) => {
    alert(JSON.stringify(jobs));
    this.setState({ jobs });
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
    return (<I18n>{(t, { i18n }) => (
      <Container>
        <Header androidStatusBarColor={BLUE_MAIN} style={styles.headerCustom}>
        <Left/>
          <Body>
            <Title style={styles.titleHeader}>{t('MY_JOBS.myJobs')}</Title>
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

        <Segment style={styles.viewSegment}>
          {(Array.isArray(this.state.jobFilters)) ?
            this.state.jobFilters.map((filter) =>
            <Button key={filter.name} onPress={() => this.selectJobFilter(filter.action)} style={styles[(this.state.jobFilterSelected === filter.action) ? 'buttonActive': 'buttonInactive']}>
            <View style={styles[filter.style]}/>
          </Button>)
          : null}
        </Segment>

        <View style={styles.viewTitle}>
          {(Array.isArray(this.state.jobFilters)) ?
            this.state.jobFilters.map((filter) =>
            <View key={filter.name} style={styles.viewItem}>
              <Text style={styles.titleItem}>
                {t(`MY_JOBS.${filter.name}`)}
              </Text>
            </View>)
            : null}
        </View>

        <Content>
        <Text style={styles.titleDate}>Sep 2018</Text>
          <ListItem icon style={styles.viewList}>
            <Left>
              <Button transparent>
                <View style={styles.pointPending}/>
              </Button>
            </Left>
            <Body>
              <Text style={styles.textBody}>Mon 12</Text>
            </Body>
            <Right style={styles.noRight}>
              <Text>
                <Text style={styles.itemName}>Waitress </Text>
                <Text style={styles.itemTime}> 2:00 pm</Text>
              </Text>
            </Right>
          </ListItem>
          <ListItem icon style={styles.viewList}>
            <Left>
              <Button transparent>
                <View style={styles.pointPending}/>
              </Button>
            </Left>
            <Body>
              <Text style={styles.textBody}>Thu 19</Text>
            </Body>
            <Right style={styles.noRight}>
              <Text>
                <Text style={styles.itemName}>Bartender </Text>
                <Text style={styles.itemTime}> 8:00 pm</Text>
              </Text>
            </Right>
          </ListItem>
          <ListItem icon style={styles.viewList}>
            <Left>
              <Button transparent>
                <View style={styles.pointPending}/>
              </Button>
            </Left>
            <Body>
              <Text style={styles.textBody}>Tue 24</Text>
            </Body>
            <Right style={styles.noRight}>
              <Text>
                <Text style={styles.itemName}>Waitress </Text>
                <Text style={styles.itemTime}> 5:00 pm</Text>
              </Text>
            </Right>
          </ListItem>
          <Text style={styles.titleDate}>Jan 2018</Text>
          <ListItem icon style={styles.viewList}>
            <Left>
              <Button transparent>
                <View style={styles.pointCompleted}/>
              </Button>
            </Left>
            <Body>
              <Text style={styles.textBody}>Mon 12</Text>
            </Body>
            <Right style={styles.noRight}>
              <Text>
                <Text style={styles.itemName}>Waitress </Text>
                <Text style={styles.itemTime}> 2:00 pm</Text>
              </Text>
            </Right>
          </ListItem>
          <ListItem icon style={styles.viewList}>
            <Left>
              <Button transparent>
                <View style={styles.pointCompleted}/>
              </Button>
            </Left>
            <Body>
              <Text style={styles.textBody}>Mon 12</Text>
            </Body>
            <Right style={styles.noRight}>
              <Text>
                <Text style={styles.itemName}>Bartender</Text>
                <Text style={styles.itemTime}> 2:00 pm</Text>
              </Text>
            </Right>
          </ListItem>
        </Content>
      </Container>
    )}</I18n>);
  }

  /**
   * Set the jobFilterSelected and call the action to load the jobs
   * @param  {string} jobFilterSelected the filter action to execute
   */
  selectJobFilter = (jobFilterSelected) => {
    this.setState({ jobFilterSelected }, this.getJobs);
  }

  /**
   * get the jobs with the corrent selected filter/action
   */
  getJobs() {
    if (typeof jobActions[this.state.jobFilterSelected] !== 'function') return;

    jobActions[this.state.jobFilterSelected]();
  }

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }
}

export default MyJobs;
