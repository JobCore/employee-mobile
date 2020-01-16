import { Alert } from 'react-native';
import { i18next } from '../i18n';
import * as jobActions from '../components/MyJobs/actions';
import moment from 'moment';
import { CustomToast } from './components';

export function clockInMixin() {
  console.log(`${this.constructor.name}:clockInMixin`);
  if (!this.state.shiftId) return;

  let jobTitle;
  try {
    jobTitle = this.state.shift.venue.title;
  } catch (e) {
    CustomToast('The venue has no title!');
    return;
  }

  if (!jobTitle) return;

  Alert.alert(i18next.t('MY_JOBS.wantToClockIn'), jobTitle, [
    { text: i18next.t('APP.cancel') },
    {
      text: i18next.t('MY_JOBS.clockIn'),
      onPress: () => {
        console.log(`${this.constructor.name}:clockInMixin:onPress:`);
        let clockinReported = false;
        navigator.geolocation.getCurrentPosition(
          (data) => {
            console.log(
              `${this.constructor.name}:clockInMixin:onPress:data:`,
              data,
            );
            clockinReported = true;
            this.setState({ isLoading: true }, () => {
              jobActions.clockIn(
                this.state.shift.id,
                _round(data.coords.latitude),
                _round(data.coords.longitude),
                moment.utc(),
              );
            });
          },
          (e) => {
            console.log(
              `${this.constructor.name}:clockInMixin:onPress:error:`,
              e,
            );
            clockinReported = true;
            jobActions.clockIn(this.state.shift.id, 0, 0, moment.utc());
          },
        );
        setTimeout(() => {
          console.log(
            `${this.constructor.name}:clockInMixin:setTimeout:`,
            clockinReported,
          );
          if (!clockinReported)
            jobActions.clockIn(this.state.shift.id, 0, 0, moment.utc());
        }, 1000);
      },
    },
  ]);
}

const _round = (x) => {
  return Number.parseFloat(x).toFixed(8);
};

export function clockOutMixin() {
  console.log(`${this.constructor.name}:clockOutMixin`);
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
        console.log(`${this.constructor.name}:clockOutMixin:onPress`);
        let clockOutReported = false;
        navigator.geolocation.getCurrentPosition(
          (data) => {
            console.log(`${this.constructor.name}:clockOutMixin:data:`, data);
            clockOutReported = true;
            this.setState({ isLoading: true }, () => {
              jobActions.clockOut(
                this.state.shift.id,
                _round(data.coords.latitude),
                _round(data.coords.longitude),
                moment.utc(),
              );
            });
          },
          () => {
            clockOutReported = true;
            jobActions.clockOut(this.state.shift.id, 0, 0, moment.utc());
          },
        );
        setTimeout(() => {
          console.log(
            `${this.constructor.name}:clockOutMixin:setTimeout:`,
            clockOutReported,
          );
          if (!clockOutReported)
            jobActions.clockOut(this.state.shift.id, 0, 0, moment.utc());
        }, 1000);
      },
    },
  ]);
}
