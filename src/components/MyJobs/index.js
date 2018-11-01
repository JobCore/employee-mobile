import React, { Component } from "react";
import {
  View,
  Image,
  RefreshControl,
} from "react-native";
import { Container, Header, Content, Button, Text, Left, Body, Title, Right, Segment, ListItem, Spinner } from 'native-base';
import styles from './style'
import { BLUE_MAIN, BLUE_DARK } from "../../constants/colorPalette";
import { SETTING_ROUTE, JOB_DETAILS_ROUTE, APPLICATION_DETAILS_ROUTE } from "../../constants/routes";
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import * as jobActions from './actions';
import { LOG, WARN, ERROR, equalMonthAndYear } from "../../utils";
import { CustomToast, Loading } from '../../utils/components';
import jobStore from './JobStore';
import moment from 'moment';

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
      isLoadingJobs: false,
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
    this.getPendingJobsSubscription = jobStore
      .subscribe('GetPendingJobs', (data) => {
        this.getJobsHandler(data);
      });

    this.getUpcomingJobsSubscription = jobStore
      .subscribe('GetUpcomingJobs', (data) => {
        this.getJobsHandler(data);
      });

    this.getCompletedJobsSubscription = jobStore
      .subscribe('GetCompletedJobs', (data) => {
        this.getJobsHandler(data);
      });

    this.getFailedJobsSubscription = jobStore
      .subscribe('GetFailedJobs', (data) => {
        this.getJobsHandler(data);
      });

    this.jobStoreError = jobStore
      .subscribe('JobStoreError', (err) => {
        this.errorHandler(err)
      });

    this.isLoading(true);
    this.getJobs();
  }

  componentWillUnmount() {
    this.getPendingJobsSubscription.unsubscribe();
    this.getUpcomingJobsSubscription.unsubscribe();
    this.getCompletedJobsSubscription.unsubscribe();
    this.getFailedJobsSubscription.unsubscribe();
    this.jobStoreError.unsubscribe();
  }

  getJobsHandler = (jobs) => {
    this.isLoading(false);
    this.setState({
      jobs,
      isRefreshing: false,
      isLoadingJobs: false,
    });
  }

  errorHandler = (err) => {
    this.isLoading(false);
    this.setState({
      isRefreshing: false,
      isLoadingJobs: false,
    });
    CustomToast(err, 'danger');
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
      <Container>
        {this.state.isLoading ? <Loading/> : null}

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
            this.state.jobFilters.map((filter, index) =>
            <Button key={filter.name} onPress={() => this.selectJobFilter(filter.action)} style={[styles[(this.state.jobFilterSelected === filter.action) ? 'buttonActive': 'buttonInactive'], (index === 0) ? styles.firstButtonBorderLeft : {}]}>
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

        <Content
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.refreshJobs}/>
          }>
          {(Array.isArray(this.state.jobs)) ?
            this.state.jobs.map((job, index, array) => {
            const showDate = (index === 0 ||
               !equalMonthAndYear(
                 array[index].starting_at,
                 array[index-1].starting_at,
                 )
               );

            return (<View key={index}>
              {(showDate) ?
                <Text style={styles.titleDate}>
                  {moment(job.starting_at).format('MMM YYYY')}
                </Text>
              : null}

              <ListItem onPress={() => this.goToJobDetails(job)} icon style={styles.viewList}>
                <Left>
                  <Button transparent>
                    <View style={styles.pointPending}/>
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.textBody}>
                    {moment(job.starting_at).format('ddd D')}
                  </Text>
                </Body>
                <Right style={styles.noRight}>
                  <Text>
                    {(job.position) ?
                      <Text style={styles.itemName}>
                        {job.position.title}
                      </Text>
                    : null}
                    <Text style={styles.itemTime}>
                      {` ${moment(job.starting_at).format('h:mm a')}`}
                    </Text>
                  </Text>
                </Right>
              </ListItem>
            </View>)
            })
          : null}
        </Content>
      </Container>
    )}</I18n>);
  }

  refreshJobs = () => {
    this.setState({ isRefreshing: true });
    this.getJobs();
  }

  /**
   * Set the jobFilterSelected and call the action to load the jobs
   * @param  {string} jobFilterSelected the filter action to execute
   */
  selectJobFilter = (jobFilterSelected) => {
    if (this.state.isLoadingJobs) return;

    this.setState({ jobFilterSelected, isLoading: true }, this.getJobs);
  }

  /**
   * get the jobs with the corrent selected filter/action
   */
  getJobs() {
    if (typeof(jobActions[this.state.jobFilterSelected]) !== 'function') return;

    jobActions[this.state.jobFilterSelected]();
  }

  goToJobDetails = (job) => {
    if (!job) return;

    if (job.applicationId) {
      return this.props.navigation.navigate(APPLICATION_DETAILS_ROUTE, { applicationId: job.applicationId })
    }

    this.props.navigation.navigate(JOB_DETAILS_ROUTE, { shiftId: job.id });
  }

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }
}

export default MyJobs;
