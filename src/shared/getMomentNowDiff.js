import moment from 'moment';

const getMomentNowDiff = datetime => {
  const datetimeMoment = moment(datetime);
  const nowMoment = moment.utc();
  const diff = datetimeMoment.diff(nowMoment, 'minutes');

  return diff;
};

export default getMomentNowDiff;
