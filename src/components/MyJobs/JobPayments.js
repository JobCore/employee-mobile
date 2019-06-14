import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import {
  Container,
  Content,
  Text,
  Left,
  Body,
  List,
  ListItem,
} from 'native-base';
import styles from './style';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import * as inviteActions from './actions';
import { LOG } from '../../shared';
import CHICKEN from '../../assets/image/chicken.png';
import jobStore from './JobStore';
import * as jobActions from './actions';
import { CustomToast, Loading, CenteredText } from '../../shared/components';
import moment from 'moment';

import HeaderPayments from '../../shared/components/HeaderPayments';
import { ModalHeader } from '../../shared/components/ModalHeader';
import textStyles from '../../shared/textStyles';

class JobPayments extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('JOB_INVITES.inviteDetails'),
    tabBarIcon: () => (
      <Image
        style={{ resizeMode: 'contain', height: 30 }}
        source={require('../../assets/image/preferences.png')}
      />
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isRefreshing: false,
      emptyReviews: false,
      filterSelected: 'getPendingPayments',
      filters: [
        {
          action: 'getPendingPayments',
        },
        {
          action: 'getClearedPayments',
        },
      ],
      payments: [],
    };
  }

  componentDidMount() {
    this.getPendingPaymentsSubscription = jobStore.subscribe(
      'GetPendingPayments',
      this.getPaymentsHandler,
    );
    this.getClearedPaymentsSubscription = jobStore.subscribe(
      'GetClearedPayments',
      this.getPaymentsHandler,
    );
    this.jobStoreError = jobStore.subscribe('JobStoreError', this.errorHandler);

    this.loadData();
  }

  componentWillUnmount() {
    this.getPendingPaymentsSubscription.unsubscribe();
    this.getClearedPaymentsSubscription.unsubscribe();
  }

  getPaymentsHandler = (payments) => {
    let emptyPayments = false;
    if (Array.isArray(payments) && !payments.length) emptyPayments = true;

    this.setState({
      isLoading: false,
      isRefreshing: false,
      emptyPayments,
      payments,
    });
  };

  errorHandler = (err) => {
    this.setState({
      isLoading: false,
      isRefreshing: false,
    });
    CustomToast(err, 'danger');
  };

  loadData = () => {
    this.setState({ isLoading: true }, () => {
      this.getPayments();
    });
  };

  refreshData = () => {
    this.setState({ isRefreshing: true }, () => {
      this.getPayments();
    });
  };

  getPayments = () => {
    jobActions[this.state.filterSelected]();
  };

  selectFilter = (filterSelected) => {
    if (this.state.isLoading) return;

    this.setState({ filterSelected, isLoading: true }, this.getPayments);
  };

  render() {
    let totalAmount = 0,
      totalHours = 0;

    this.state.payments.forEach((payment) => {
      totalAmount += parseFloat(payment.total_amount);
      totalHours += parseFloat(payment.regular_hours);
    });

    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            {this.state.emptyReviews && (
              <CenteredText text={`${t('PAYMENTS.emptyPaymentes')}`} />
            )}
            <ModalHeader title={t('PAYMENTS.payments')} />
            <Content>
              <HeaderPayments
                totalAmount={totalAmount.toFixed(2)}
                totalHours={totalHours.toFixed(2)}
                selectFilter={this.selectFilter}
                activeFilter={this.state.filterSelected}
                filters={this.state.filters}
              />
              {this.state.payments.length ? (
                <List>
                  {this.state.payments.map((payment, key) => (
                    <ListItem avatar key={key}>
                      <Left>
                        <Image
                          resizeMode={'cover'}
                          circle={true}
                          source={
                            payment.employer &&
                            payment.employer.picture
                              ? { uri: payment.employer.picture }
                              : CHICKEN
                          }
                          style={styles.imgCover}
                        />
                      </Left>
                      <Body>
                        <Text>
                          <Text style={textStyles.textEmployer}>
                            {payment.employer.title}{' '}
                          </Text>
                          <Text style={textStyles.textGray}>will pay you </Text>{' '}
                          <Text style={textStyles.textRed}>
                            ${payment.total_amount}
                          </Text>
                          <Text style={textStyles.textGray}> for being a</Text>{' '}
                          <Text style={textStyles.textShiftTitle}>
                            {payment.shift.position.title}
                          </Text>{' '}
                          <Text>
                            {` ${t('JOB_PREFERENCES.dateStartToEnd', {
                              startingAt: moment(payment.shift.starting_at)
                                .tz(moment.tz.guess())
                                .format('lll'),
                              endingAt: moment(payment.shift.ending_at)
                                .tz(moment.tz.guess())
                                .format('lll'),
                            })} `}
                          </Text>
                        </Text>
                      </Body>
                    </ListItem>
                  ))}
                </List>
              ) : null}
            </Content>
          </Container>
        )}
      </I18n>
    );
  }

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

  getInvite = () => {
    if (this.state.inviteId === 'NO_ID') {
      return this.props.navigation.goBack();
    }

    this.isLoading(true);
    inviteActions.getInvite(this.state.inviteId);
  };

  applyJob = () => {
    let jobTitle;

    try {
      jobTitle = this.state.invite.shift.venue.title;
    } catch (e) {
      return;
    }

    if (!jobTitle) return;

    Alert.alert(
      i18next.t('JOB_INVITES.applyJob'),
      jobTitle,
      [
        {
          text: i18next.t('APP.cancel'),
          onPress: () => {
            LOG(this, 'Cancel applyJob');
          },
        },
        {
          text: i18next.t('JOB_INVITES.apply'),
          onPress: () => {
            this.isLoading(true);
            inviteActions.applyJob(this.state.invite.id);
          },
        },
      ],
      { cancelable: false },
    );
  };

  rejectJob = () => {
    let jobTitle;

    try {
      jobTitle = this.state.invite.shift.venue.title;
    } catch (e) {
      return;
    }

    if (!jobTitle) return;

    Alert.alert(
      i18next.t('JOB_INVITES.rejectJob'),
      jobTitle,
      [
        {
          text: i18next.t('APP.cancel'),
          onPress: () => {
            LOG(this, 'Cancel rejectJob');
          },
        },
        {
          text: i18next.t('JOB_INVITES.reject'),
          onPress: () => {
            this.isLoading(true);
            inviteActions.rejectJob(this.state.invite.id);
          },
        },
      ],
      { cancelable: false },
    );
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  };
}

export default JobPayments;
