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
// import inviteStore from './InviteStore';
// import { JobDetails } from '../../shared/components';
import { LOG } from '../../shared';
import CHICKEN from '../../assets/image/chicken.png';
import jobStore from './JobStore';
import * as jobActions from './actions';
import { CustomToast, Loading, CenteredText } from '../../shared/components';

import HeaderPayments from '../../shared/components/HeaderPayments';
import { ModalHeader } from '../../shared/components/ModalHeader';
// import IconTime from '../../assets/image/time.png'

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
            <ModalHeader screenName="payments" title={t('PAYMENTS.payments')} />
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
                          source={CHICKEN}
                          style={styles.imgCover}
                        />
                      </Left>
                      <Body>
                        <Text>
                          {' '}
                          <Text style={styles.textOne}>
                            {payment.employer.title}{' '}
                          </Text>
                          <Text style={styles.textTwo}>will pay you </Text>{' '}
                          <Text style={styles.textRed}>
                            ${payment.total_amount}
                          </Text>
                          <Text style={styles.textTwo}>for being a</Text>{' '}
                          <Text style={styles.textThree}>
                            {payment.shift.position.title}
                          </Text>{' '}
                          from May 30th 3:00pm to May 30th 6:00pm
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
