import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  View,
} from "react-native";
import {
  Text,
  Thumbnail,
  Left,
  Body,
  ListItem,
  Separator,
  Icon,
} from 'native-base';
import styles from '../../components/Invite/InviteDetailsStyle';
import { I18n } from 'react-i18next';
import myJobsImg from '../../assets/image/myJobs.png';
import { BLUE_MAIN, BLUE_DARK } from '../../constants/colorPalette';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';

class InviteDetails extends Component {
  render() {
    const ratingAsNumber = (this.props.shift && this.props.shift.employer)
      ? parseInt(this.props.shift.employer.rating)
      : 0;

    // An Array To set the stars with array.map
    const ratingArray = (Number.isInteger(ratingAsNumber))
      ? Array.from({length: ratingAsNumber}, (v, k) => k+1)
      : new Array(0);

    return (<I18n>{(t, { i18n }) => (
            <View>
              {(this.props.shift) ?
                <View style={{marginBottom: 10}}>
                  <ListItem noBorder={false} style={{marginLeft: 0}}>
                    <Left>
                      <Thumbnail source={(this.props.shift && this.props.shift.position &&
                         this.props.shift.position.picture) ?
                         this.props.shift.position.picture : myJobsImg} />
                      <Body>
                        {(this.props.shift.venue) ?
                          <Text style={{color: BLUE_DARK, fontSize: 14}}>
                            {this.props.shift.venue.title}
                          </Text>
                        : null}
                          {(Array.isArray(ratingArray)) ?
                            <Text>
                              {ratingArray.map((emptyItem, index) =>
                              <Text key={index}>
                                <Icon name={'md-star'} style={{color: BLUE_DARK, fontSize: 20}}/>
                                <Text>{'  '}</Text>
                              </Text>)}
                            </Text>
                          : null}
                          {(this.props.shift.employer && this.props.shift.employer.total_ratings >= 0) ?
                            <Text style={{color: BLUE_DARK, fontSize: 10}}>
                              {`${this.props.shift.employer.total_ratings} ${t('MY_JOBS.review')}`}
                            </Text>
                          : null}
                      </Body>
                    </Left>
                  </ListItem>
                </View>
              : null}
              {(this.props.shift) ?
              <Text style={styles.viewTitleInfo}>
                  {(this.props.shift.venue) ?
                  <Text style={styles.textOne}>
                    {this.props.shift.venue.title}
                  </Text>
                  : null}
                  <Text style={styles.textTwo}>
                    {` ${t('JOB_INVITES.lookingFor')} `}
                  </Text>
                  {(this.props.shift.position) ?
                    <Text style={styles.textThree}>
                    {this.props.shift.position.title}
                  </Text>
                  : null}
                </Text>
                : null}
                {/* title date info */}
                {(this.props.shift) ?
                <Text>
                  <Text style={styles.textTwo}>
                    {` ${t('JOB_INVITES.on')} `}
                  </Text>
                  <Text style={styles.textBlack}>
                  {`${
                    t('JOB_PREFERENCES.dateStartToEnd', {
                      startingAt: moment(this.props.shift.starting_at)
                      .tz(DeviceInfo.getTimezone())
                      .format('lll'),
                      endingAt: moment(this.props.shift.ending_at)
                      .tz(DeviceInfo.getTimezone())
                      .format('lll'),
                    })
                  } `}
                  {/* Sep 24th From 3pm to 6pm. */}
                </Text>
                  <Text style={styles.textRed}>
                  {`$${this.props.shift.minimum_hourly_rate}/${t('JOB_INVITES.hr')}.`}
                  </Text>
                </Text>
              : null }
            </View>
          )
      }</I18n>);
  }
}

InviteDetails.propTypes = {
  shift: PropTypes.object
};

export default InviteDetails;
