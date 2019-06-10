import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, H1, Segment, Button } from 'native-base';
import styles from '../../components/MyJobs/style';
import PropTypes from 'prop-types';

class HeaderPayments extends Component {
  render() {
    return (
      <View style={styles.bgInfo}>
        <Segment style={styles.viewSegmentPayments}>
          {this.props.filters.map((filter, key) => (
            <Button
              style={[
                this.props.activeFilter === filter.action
                  ? styles.buttonPaymentsActive
                  : styles.buttonPaymentsInactive,
              ]}
              onPress={() => {
                this.props.selectFilter(filter.action);
              }}
              key={key}>
              <View style={styles.pointPending} />
            </Button>
          ))}
        </Segment>
        <View style={styles.viewTitle}>
          <View style={styles.viewItemPayments}>
            <Text style={styles.titleItem}>Pending Payments</Text>
          </View>
          <View style={styles.viewItemPayments}>
            <Text style={styles.titleItem}>Cleared Payments</Text>
          </View>
        </View>
        <View>
          <View style={styles.viewAmount}>
            <View style={styles.viewContent}>
              <Text style={styles.textTitle}>Amount</Text>
              <H1 style={styles.textSubTitle}>${this.props.totalAmount}</H1>
            </View>
            <View style={styles.viewContent}>
              <Text style={styles.textTitle}>Total Hours</Text>
              <H1 style={styles.textSubTitle}>{this.props.totalHours}</H1>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

HeaderPayments.propTypes = {
  filters: PropTypes.array.isRequired,
  activeFilter: PropTypes.string.isRequired,
  selectFilter: PropTypes.func.isRequired,
  totalAmount: PropTypes.number.isRequired,
  totalHours: PropTypes.number.isRequired,
};

export default HeaderPayments;
