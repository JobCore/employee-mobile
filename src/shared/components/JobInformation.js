import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { JobHeader } from '../../components/MyJobs/components/JobHeader';
import { JobHours } from '../../components/MyJobs/components/JobHours';

const JobInformation = (props) => {
  const shift = props.shift;
  const { venue, starting_at, ending_at } = shift;
  const todayAtMoment = moment().tz(moment.tz.guess());
  const todayString = todayAtMoment.format('MMM D');
  const startingAtMoment = moment(starting_at).tz(moment.tz.guess());
  const from = startingAtMoment.format('MMM D');
  const endingAtMoment = moment(ending_at).tz(moment.tz.guess());
  const to = endingAtMoment.format('MMM D');
  const dateString =
    from === to ? (from === todayString ? 'Today' : from) : `${from} to ${to}`;
  const fromTime = startingAtMoment.format('h:mm A');
  const toTime = endingAtMoment.format('h:mm A');
  const timeString = `${fromTime} to ${toTime}`;
  const hours = endingAtMoment.diff(startingAtMoment, 'minutes') / 60;
  const price = hours * parseFloat(shift.minimum_hourly_rate);
  const address = venue.street_address;

  return (
    <>
      <View style={{ height: 150 }}>
        <JobHeader
          clientLogo={shift.employer.picture}
          clientName={shift.employer.title}
          positionName={shift.position.title}
          dateString={dateString}
          timeString={timeString}
          addressString={address}
          onPressDirection={props.onPressDirection}
          minimumHourlyRate={shift.minimum_hourly_rate}
        />
      </View>
      <View style={{ height: 85 }}>
        <JobHours price={price} hours={hours} />
      </View>
    </>
  );
};

JobInformation.propTypes = {
  shift: PropTypes.object.isRequired,
  onPressDirection: PropTypes.func.isRequired,
  flexHeader: PropTypes.number,
  flexHours: PropTypes.number,
};

export { JobInformation };
