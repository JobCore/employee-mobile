import React, { Component } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Container, Text } from 'native-base';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
// import inviteStore from './InviteStore';
// import { JobDetails } from '../../shared/components';
import { LOG, storeErrorHandler } from '../../shared';
import { CustomToast, Loading, openMapsApp } from '../../shared/components';
import moment from 'moment';
import { ModalHeader } from '../../shared/components/ModalHeader';
import { log } from 'pure-logger';
import { ViewFlex } from '../../shared/components/ViewFlex';
import { JobHeader } from './components/JobHeader';
import { Earnings } from './components/Earnings';
import jobStore from './JobStore';
import * as Progress from 'react-native-progress';
import { BLUE_DARK, BLUE_MAIN } from '../../shared/colorPalette';
import {
  canClockIn,
  canClockOut,
  getDiffInMinutesToStartShift,
} from './job-utils';
import { ClockInButton } from './components/ClockInButton';
import { ReviewButton } from './components/ReviewButton';
import { ClockOutButton } from './components/ClockOutButton';
import {
  calculateEarningsFromClockIns,
  clockIn,
  clockOut,
  getJob,
} from './actions';
import { APP_ROUTE, RATE_EMPLOYER_ROUTE } from '../../constants/routes';
import { ClocksIn } from './components/ClocksIn';
import { jobStyles } from './JobStyles';

// import IconTime from '../../assets/image/time.png'
const DEFAULT_LATIDUDE = 25.761681;
const DEFAULT_LONGITUDE = -80.191788;

class WorkModeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      shift: undefined,
      invite: {},
      shiftId: this.props.navigation.getParam('shiftId', null),
    };
    this.scrollView = null;
  }

  componentDidMount() {
    this.getJobSubscription = jobStore.subscribe('GetJob', this.getJobHandler);
    this.clockInSubscription = jobStore.subscribe('ClockIn', () =>
      getJob(this.state.shiftId),
    );
    this.clockOuSubscription = jobStore.subscribe('ClockOut', () =>
      getJob(this.state.shiftId),
    );
    this.jobStoreError = jobStore.subscribe('JobStoreError', this.errorHandler);
    getJob(this.state.shiftId);
  }

  componentWillUnmount() {
    this.getJobSubscription.unsubscribe();
    this.clockInSubscription.unsubscribe();
    this.clockOuSubscription.unsubscribe();
    this.clockInSubscription.unsubscribe();
    this.jobStoreError.unsubscribe();
  }

  getJobHandler = (shift) => {
    LOG(`DEBUG:getJobHandler`, shift);
    this.setState({ shift, isLoading: false });
  };

  errorHandler = () => {
    this.setState({ isLoading: false });
  };

  getJobRateHandler = (jobRate) => {
    this.setState({ jobRate });
  };

  clockOutHandler = () => {
    CustomToast(i18next.t('MY_JOBS.clockedOut'));
    this.getClockins();
  };

  showRateButton = () => {
    if (!this.state.shift) return false;

    // check if current time is before ending_at
    if (moment.utc().isSameOrBefore(moment.utc(this.state.shift.ending_at))) {
      return false;
    }

    // check for missing clockouts or clockins
    if (Array.isArray(this.state.clockIns)) {
      if (!this.state.clockIns.length) return false;

      const endedAt = this.state.clockIns[this.state.clockIns.length - 1]
        .ended_at;

      if (!endedAt) {
        return false;
      }
    } else return false; // dont show rate button until clockins are loaded

    if (Array.isArray(this.state.jobRate) && !this.state.jobRate.length) {
      return true;
    }

    return false;
  };

  showAlreadyRated = () => {
    if (!this.state.shift) return false;

    if (Array.isArray(this.state.jobRate) && this.state.jobRate.length) {
      return true;
    }

    return false;
  };

  render() {
    log(`DEBUG:state:`, this.state);
    const { isLoading, shift } = this.state;
    const renderDetail = (t, shift) => {
      log(`DEBUG:shift:`, shift);
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
      const fromTime = startingAtMoment.format('h A');
      const toTime = endingAtMoment.format('h A');
      const timeString = `${fromTime} to ${toTime}`;
      const hours = endingAtMoment.diff(startingAtMoment, 'hours');
      const hoursPassed = todayAtMoment.diff(startingAtMoment, 'hours');
      const hoursPassedPct = parseFloat(hoursPassed / hours);
      // const price = hours * parseFloat(shift.minimum_hourly_rate);
      const address = venue.street_address;
      const clockIns = shift.clockin_set ? shift.clockin_set : [];
      console.log(`DEBUG:calculateEarningsFromClockIns:`, shift.clockin_set);
      const hoursWorked = calculateEarningsFromClockIns(
        shift.clockin_set,
      ).toFixed(2);
      console.log(`DEBUG:calculateEarningsFromClockIns:`, hoursWorked);
      const earningsSoFar = (hoursWorked * shift.minimum_hourly_rate).toFixed(
        2,
      );
      setTimeout(() => this.scrollView.scrollToEnd(), 1000);
      return (
        <>
          <ViewFlex justifyContent={'space-between'}>
            <View>
              <ModalHeader
                canClose={canClockIn(shift)}
                title={`Work Mode`}
                onPressClose={() => {
                  console.log(`DEBUG:navigate to Main Screen`);
                  this.props.navigation.goBack();
                }}
                onPressHelp={() => {}}
              />
            </View>
            <View style={{ flex: 8 }}>
              <JobHeader
                clientName={venue.title}
                positionName={shift.position.title}
                dateString={dateString}
                timeString={timeString}
                addressString={address}
                onPressDirection={
                  this.showOpenDirection() ? this.openMapsApp : () => {}
                }
              />
            </View>
            <View style={{ flex: 2, alignItems: 'center', paddingTop: 20 }}>
              <Progress.Bar
                borderRadius={10}
                progress={hoursPassedPct}
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
                    BLUE_DARK,
                  }}>
                  {toTime}
                </Text>
              </Progress.Bar>
            </View>
            <View style={{ flex: 3 }}>
              <Earnings price={earningsSoFar} hours={hoursWorked} />
            </View>
            <View style={[{ flex: 10 }]}>
              <ScrollView ref={(component) => (this.scrollView = component)}>
                <ClocksIn clockIns={clockIns} />
              </ScrollView>
            </View>
            <View
              style={[jobStyles.clockButtonBar, { flex: 2, paddingTop: 20 }]}>
              {this.renderButtons()}
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
    const { shift } = this.state;
    const canIClockIn = canClockIn(shift);
    const canIClockOut = canClockOut(shift);
    return (
      <View>
        {canIClockIn && (
          <ClockInButton
            onClick={this.clockIn}
            canClockIn={canIClockIn}
            diffInMinutes={getDiffInMinutesToStartShift(this.state.shift)}
          />
        )}
        {canIClockOut && <ClockOutButton onClick={this.clockOut} />}
        {!(canIClockIn || canIClockOut) && (
          <ReviewButton onClick={this.goToRateJob} />
        )}
      </View>
    );
  };

  goToRateJob = () => {
    if (!this.state.shiftId || !this.state.shift || !this.state.shift.id) {
      return;
    }

    this.props.navigation.navigate(RATE_EMPLOYER_ROUTE, {
      shift: this.state.shift,
    });
  };

  clockOut = () => {
    if (!this.state.shiftId) return;
    let jobTitle;

    try {
      jobTitle = this.state.shift.venue.title;
    } catch (e) {
      return;
    }

    if (!jobTitle) return;

    Alert.alert(i18next.t('MY_JOBS.wantToClockOut'), jobTitle, [
      { text: i18next.t('APP.cancel') },
      {
        text: i18next.t('MY_JOBS.clockOut'),
        onPress: () => {
          clockOut(
            this.state.shift.id,
            this.state.shift.venue.latitude,
            this.state.shift.venue.longitude,
            moment.utc(),
          );
          if (true) return;
          navigator.geolocation.getCurrentPosition(
            (data) => {
              this.setState({ isLoading: true }, () => {
                clockOut(
                  this.state.shift.id,
                  data.coords.latitude,
                  data.coords.longitude,
                  moment.utc(),
                );
              });
            },
            (err) => CustomToast(storeErrorHandler(err), 'danger'),
          );
        },
      },
    ]);
  };

  clockIn = () => {
    if (!this.state.shiftId) return;
    let jobTitle;
    try {
      jobTitle = this.state.shift.venue.title;
    } catch (e) {
      CustomToast('The venue has no title!');
      return;
    }

    Alert.alert(i18next.t('MY_JOBS.wantToClockIn'), jobTitle, [
      { text: i18next.t('APP.cancel') },
      {
        text: i18next.t('MY_JOBS.clockIn'),
        onPress: () => {
          clockIn(
            this.state.shift.id,
            this.state.shift.venue.latitude,
            this.state.shift.venue.longitude,
            moment.utc(),
          );
          if (true) return;
          navigator.geolocation.getCurrentPosition(
            (data) => {
              log(`DEBUG:clockin:`, this.state.shift.id);
              this.setState({ isLoading: true }, () => {
                log(
                  `DEBUG:clockin:`,
                  this.state.shift.id,
                  data.coords.latitude,
                  data.coords.longitude,
                  moment.utc(),
                );
                clockIn(
                  this.state.shift.id,
                  data.coords.latitude,
                  data.coords.longitude,
                  moment.utc(),
                );
              });
            },
            (err) => CustomToast(storeErrorHandler(err), 'danger'),
          );
        },
      },
    ]);
  };

  showOpenDirection = () => {
    try {
      if (this.state.invite.shift.venue.title) return true;
    } catch (err) {
      return false;
    }

    return false;
  };

  showMarker = () => {
    try {
      if (
        this.state.invite.shift.venue.longitude &&
        this.state.invite.shift.venue.latitude
      ) {
        return true;
      }
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

WorkModeScreen.routeName = 'WorkModeScreen';

export default WorkModeScreen;