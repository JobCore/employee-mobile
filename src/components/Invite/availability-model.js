import moment from 'moment';

export const availabilityModel = [
  {
    starting_at: moment()
      .startOf('week')
      .add('days', 4), //thursday
    ending_at: moment()
      .startOf('week')
      .add('days', 4), //thursday
    day_number: 4,
    available: true,
    allday: true,
  },
  {
    starting_at: moment()
      .startOf('week')
      .add('days', 5), //friday
    ending_at: moment()
      .startOf('week')
      .add('days', 5), //friday
    day_number: 5,
    available: true,
    allday: true,
  },
  {
    starting_at: moment().endOf('week'), // saturday
    ending_at: moment().endOf('week'), // saturday
    day_number: 6,
    available: true,
    allday: true,
  },
  {
    starting_at: moment().startOf('week'), //sunday
    ending_at: moment().startOf('week'), //sunday
    day_number: 0,
    available: true,
    allday: true,
  },
  {
    starting_at: moment().startOf('isoweek'), //monday
    ending_at: moment().startOf('isoweek'), //monday
    day_number: 1,
    available: true,
    allday: true,
  },
  {
    starting_at: moment()
      .startOf('week')
      .add('days', 2), //tuesday
    ending_at: moment()
      .startOf('week')
      .add('days', 2), //tuesday
    day_number: 2,
    available: true,
    allday: true,
  },
  {
    starting_at: moment()
      .startOf('week')
      .add('days', 3), //wedesday
    ending_at: moment()
      .startOf('week')
      .add('days', 3), //wedesday
    day_number: 3,
    available: true,
    allday: true,
  },
];
