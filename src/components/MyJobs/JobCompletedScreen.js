import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Container, Text } from 'native-base';
import { I18n } from 'react-i18next';
import { Loading, openMapsApp } from '../../shared/components';
import moment from 'moment';
import { ModalHeader } from '../../shared/components/ModalHeader';
import { ViewFlex } from '../../shared/components/ViewFlex';
import { JobHeader } from './components/JobHeader';
import { Earnings } from './components/Earnings';
import jobStore from './JobStore';
import * as Progress from 'react-native-progress';
import { BLUE_DARK, BLUE_MAIN } from '../../shared/colorPalette';
import { Review } from './components/Review';
import { ReviewButton } from './components/ReviewButton';
import { calculateEarningsFromClockIns, getJob, getJobRate } from './actions';
import { RATE_EMPLOYER_ROUTE } from '../../constants/routes';
import { ClocksIn } from './components/ClocksIn';

// import IconTime from '../../assets/image/time.png'
const DEFAULT_LATIDUDE = 25.761681;
const DEFAULT_LONGITUDE = -80.191788;

class JobCompletedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      shift: undefined,
      invite: {},
      shiftId: this.props.navigation.getParam('shiftId', null),
      jobRate: null,
    };
    this.scrollView = null;
  }

  componentDidMount() {
    this.getJobSubscription = jobStore.subscribe('GetJob', this.getJobHandler);
    this.jobStoreError = jobStore.subscribe('JobStoreError', this.errorHandler);
    this.getJobRateSubscription = jobStore.subscribe('GetJobRate', (jobRate) =>
      this.setState({ jobRate }),
    );
    this.rateJobSubscription = jobStore.subscribe('RateEmployer', () =>
      getJobRate(this.state.shiftId),
    );
    getJob(this.state.shiftId);
    getJobRate(this.state.shiftId);
  }

  componentWillUnmount() {
    this.getJobSubscription.unsubscribe();
    this.jobStoreError.unsubscribe();
    this.getJobRateSubscription.unsubscribe();
    this.rateJobSubscription.unsubscribe();
  }

  getJobHandler = (shift) => {
    this.setState({ shift, isLoading: false });
  };

  errorHandler = () => {
    this.setState({ isLoading: false });
  };

  showAlreadyRated = () => {
    if (!this.state.shift) return false;

    if (Array.isArray(this.state.jobRate) && this.state.jobRate.length) {
      return true;
    }

    return false;
  };

  render() {
    const { isLoading, shift } = this.state;
    const renderDetail = (t, shift) => {
      const { venue, starting_at, ending_at } = shift;
      const todayAtMoment = moment().tz(moment.tz.guess());
      const todayString = todayAtMoment.format('MMM D');
      const startingAtMoment = moment(starting_at).tz(moment.tz.guess());
      const from = startingAtMoment.format('MMM D');
      const endingAtMoment = moment(ending_at).tz(moment.tz.guess());
      const to = endingAtMoment.format('MMM D');
      const dateString =
        from === to
          ? from === todayString
            ? 'Today'
            : from
          : `${from} to ${to}`;
      const fromTime = startingAtMoment.format('h:mm A');
      const toTime = endingAtMoment.format('h:mm A');
      const timeString = `${fromTime} to ${toTime}`;
      const minutes = endingAtMoment.diff(startingAtMoment, 'minutes');
      const minutesPassed = todayAtMoment.diff(startingAtMoment, 'minutes');
      const minutesPassedPct = parseFloat(minutesPassed / minutes);
      const address = venue.street_address;
      const clockIns = shift.clockin_set ? shift.clockin_set : [];
      clockIns.sort((a, b) => moment(a.started_at).diff(moment(b.started_at)));
      const hoursWorked = calculateEarningsFromClockIns(
        shift.clockin_set,
      ).toFixed(2);
      const earningsSoFar = (hoursWorked * shift.minimum_hourly_rate).toFixed(
        2,
      );
      setTimeout(() => this.scrollView.scrollToEnd(), 1000);
      return (
        <>
          <ViewFlex justifyContent={'space-between'}>
            <View>
              <ModalHeader
                title={`Job Details`}
                onPressClose={() => this.props.navigation.goBack()}
                onPressHelp={() => this.props.navigation.goBack()}
              />
            </View>
            <View style={{ flex: 4 }}>
              <JobHeader
                clientLogo={shift.employer.picture}
                clientName={shift.employer.title}
                positionName={shift.position.title}
                dateString={dateString}
                timeString={timeString}
                addressString={address}
                minimumHourlyRate={shift.minimum_hourly_rate}
                onPressDirection={
                  this.showOpenDirection() ? this.openMapsApp : () => {}
                }
              />
            </View>
            <View style={{ flex: 1, alignItems: 'center', paddingTop: 10 }}>
              <Progress.Bar
                borderRadius={10}
                progress={minutesPassedPct}
                width={270}
                height={30}
                color={BLUE_MAIN}
                unfilledColor={'transparent'}
                borderColor={BLUE_DARK}>
                <Text
                  style={{
                    position: 'absolute',
                    top: 5,
                    left: 10,
                    color: BLUE_DARK,
                  }}>
                  {fromTime}
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 10,
                    color: BLUE_DARK,
                  }}>
                  {toTime}
                </Text>
              </Progress.Bar>
            </View>
            <View style={{ flex: 1 }}>
              <Earnings price={earningsSoFar} hours={hoursWorked} />
            </View>
            <View style={[{ flex: 6 }]}>
              <ScrollView ref={(component) => (this.scrollView = component)}>
                <ClocksIn clockIns={clockIns} />
                <View
                  style={[
                    {
                      width: '100%',
                      paddingTop: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  {this.renderButtons()}
                </View>
              </ScrollView>
            </View>
          </ViewFlex>
        </>
      );
    };

    return (
      <I18n>
        {(t) => (
          <Container>
            {isLoading ? <Loading /> : <>{renderDetail(t, shift)}</>}
          </Container>
        )}
      </I18n>
    );
  }

  renderButtons = () => {
    if (!this.state.shift.clockin_set.length) return null;

    if (!this.showAlreadyRated())
      return <ReviewButton onClick={this.goToRateJob} />;

    return (
      <View style={{ width: '100%' }}>
        <Review review={this.state.jobRate[0]} fromSender={true} />
      </View>
    );
  };

  goToRateJob = () => {
    this.props.navigation.navigate(RATE_EMPLOYER_ROUTE, {
      shift: this.state.shift,
    });
  };

  showOpenDirection = () => {
    try {
      if (this.state.invite.shift.venue.title) return true;
    } catch (err) {
      return false;
    }

    return false;
  };

  openMapsApp = () => {
    let latitude;
    let longitude;

    try {
      latitude = this.state.shift.venue.latitude || DEFAULT_LATIDUDE;
      longitude = this.state.shift.venue.longitude || DEFAULT_LONGITUDE;
    } catch (e) {
      latitude = DEFAULT_LATIDUDE;
      longitude = DEFAULT_LONGITUDE;
    }

    openMapsApp(latitude, longitude);
  };
}

JobCompletedScreen.routeName = 'JobCompletedScreen';

export default JobCompletedScreen;
