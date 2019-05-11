import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, H1, Segment, Button } from 'native-base';
import styles from '../../components/MyJobs/style';

export default class HeaderPayments extends Component {
  render() {
    return (
      <View style={styles.bgInfo}>
        <Segment style={styles.viewSegmentPayments}>
          <Button style={styles.buttonPaymentsActive}>
            <View style={styles.pointPending} />
          </Button>
          <Button style={styles.buttonPaymentsInactive}>
            <View style={styles.pointPending} />
          </Button>
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
              <H1 style={styles.textSubTitle}>$1000</H1>
            </View>
            <View style={styles.viewContent}>
              <Text style={styles.textTitle}>Total Hours</Text>
              <H1 style={styles.textSubTitle}>10</H1>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
