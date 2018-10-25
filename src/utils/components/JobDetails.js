import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  View,
} from "react-native";
import {
  Text,
} from 'native-base';
import styles from '../../components/Invite/InviteDetailsStyle';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { LOG, WARN, ERROR } from "../../utils";
import moment from 'moment';

class InviteDetails extends Component {
  render() {
    return (<I18n>{(t, { i18n }) => (
            <View>
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
                      startingAt: moment(this.props.shift.starting_at).format('lll'),
                      endingAt: moment(this.props.shift.ending_at).format('lll'),
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
