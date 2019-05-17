import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';
import { inviteStyles } from '../../components/Invite/InviteDetailsStyle';
import { I18n } from 'react-i18next';
import moment from 'moment';

class InviteDetails extends Component {
  render() {
    // const ratingAsNumber =
    //   this.props.shift && this.props.shift.employer
    //     ? parseInt(this.props.shift.employer.rating)
    //     : 0;

    // An Array To set the stars with array.map
    // const ratingArray = Number.isInteger(ratingAsNumber)
    //   ? Array.from({ length: ratingAsNumber }, (v, k) => k + 1)
    //   : new Array(0);

    return (
      <I18n>
        {(t) => (
          <View>
            {/*this.props.shift && !this.props.isInvite ? (
              <View style={{ marginBottom: 10 }}>
                <ListItem noBorder={false} style={{ marginLeft: 0 }}>
                  <Left>
                    <Thumbnail
                      source={
                        this.props.shift &&
                        this.props.shift.position &&
                        this.props.shift.position.picture
                          ? this.props.shift.position.picture
                          : PROFILE_IMG
                      }
                    />
                    <Body>
                      {this.props.shift.venue ? (
                        <Text style={{ color: BLUE_DARK, fontSize: 14 }}>
                          {this.props.shift.venue.title}
                        </Text>
                      ) : null}
                      {Array.isArray(ratingArray) ? (
                        <Text>
                          {ratingArray.map((emptyItem, index) => (
                            <Text key={index}>
                              <Icon
                                name={'md-star'}
                                style={{ color: BLUE_DARK, fontSize: 20 }}
                              />
                              <Text>{'  '}</Text>
                            </Text>
                          ))}
                        </Text>
                      ) : null}
                      {this.props.shift.employer &&
                      this.props.shift.employer.total_ratings >= 0 ? (
                          <Text style={{ color: BLUE_DARK, fontSize: 10 }}>
                            {`${this.props.shift.employer.total_ratings} ${t(
                              'MY_JOBS.review',
                            )}`}
                          </Text>
                        ) : null}
                    </Body>
                  </Left>
                </ListItem>
              </View>
            ) : null*/}
            {this.props.shift ? (
              <Text style={[inviteStyles.viewTitleInfo, { marginTop: 30 }]}>
                {this.props.shift.venue ? (
                  <Text style={inviteStyles.textOne}>
                    {this.props.shift.venue.title}
                  </Text>
                ) : null}
                <Text style={inviteStyles.textTwo}>
                  {` ${t('JOB_INVITES.lookingFor')} `}
                </Text>
                {this.props.shift.position ? (
                  <Text style={inviteStyles.textThree}>
                    {this.props.shift.position.title}
                  </Text>
                ) : null}
                <Text style={inviteStyles.textBlack}>
                  {` ${t('JOB_PREFERENCES.dateStartToEnd', {
                    startingAt: moment(this.props.shift.starting_at)
                      .tz(moment.tz.guess())
                      .format('lll'),
                    endingAt: moment(this.props.shift.ending_at)
                      .tz(moment.tz.guess())
                      .format('lll'),
                  })} `}
                </Text>
                <Text style={inviteStyles.textRed}>
                  {`$${this.props.shift.minimum_hourly_rate}/${t(
                    'JOB_INVITES.hr',
                  )}.`}
                </Text>
              </Text>
            ) : null}
          </View>
        )}
      </I18n>
    );
  }
}

InviteDetails.propTypes = {
  shift: PropTypes.object,
  isInvite: PropTypes.bool, // to hide employeer details for invitations
};

export default InviteDetails;
