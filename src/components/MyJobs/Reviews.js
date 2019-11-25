import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Container, Icon, Text } from 'native-base';
import * as jobActions from './actions';
import jobStore from './JobStore';
import styles from './ReviewsStyle';
import profileStyles from '../Account/PublicProfileStyle';
import {
  BackgroundHeader,
  CenteredText,
  CustomToast,
  Loading,
} from '../../shared/components';
import { I18n } from 'react-i18next';
import { BLUE_DARK, BLUE_LIGHT } from '../../shared/colorPalette';
import * as inviteActions from '../Invite/actions';
import inviteStore from '../Invite/InviteStore';
import { ModalHeader } from '../../shared/components/ModalHeader';
import { getRatingEmployeeFormat } from './job-utils';
import { Review, starsArray } from './components/Review';

class Reviews extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isRefreshing: false,
      emptyReviews: false,
      reviews: [],
      profile: {},
    };
  }

  componentDidMount() {
    this.getReviewsSubscription = jobStore.subscribe(
      'GetEmployeeRatings',
      this.getReviewsHandler,
    );
    this.getProfileSubscription = inviteStore.subscribe(
      'GetProfile',
      this.getProfileHandler,
    );
    this.jobStoreError = jobStore.subscribe('JobStoreError', this.errorHandler);

    this.loadData();
  }

  componentWillUnmount() {
    this.getReviewsSubscription.unsubscribe();
    this.getProfileSubscription.unsubscribe();
    this.jobStoreError.unsubscribe();
  }

  getReviewsHandler = (reviews) => {
    let emptyReviews = false;
    if (Array.isArray && !reviews.length) emptyReviews = true;

    this.setState({
      isLoading: false,
      isRefreshing: false,
      emptyReviews,
      reviews,
    });
  };

  getProfileHandler = (profile) => {
    this.setState({ profile });
  };

  errorHandler = (err) => {
    this.setState({
      isLoading: false,
      isRefreshing: false,
    });
    CustomToast(err, 'danger');
  };

  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            {this.state.emptyReviews ? (
              <CenteredText text={`${t('REVIEWS.emptyReviews')}`} />
            ) : null}
            <ModalHeader screenName="reviews" title={t('REVIEWS.reviews')} />
            {Array.isArray(this.state.reviews) ? (
              <FlatList
                style={styles.list}
                onRefresh={this.refreshData}
                refreshing={this.state.isRefreshing}
                onEndReached={this.getNextPage}
                data={this.state.reviews}
                extraData={this.state}
                ListHeaderComponent={
                  <BackgroundHeader>
                    <View style={[profileStyles.viewRow, { marginBottom: 0 }]}>
                      {this.state.profile && this.state.profile.employee ? (
                        <>
                          <View style={[profileStyles.viewLeft]}>
                            <Text style={profileStyles.textRowTitle}>
                              {t('PROFILE.yourRating')}
                            </Text>
                            <Text style={styles.textRowNumber}>
                              {getRatingEmployeeFormat(
                                this.state.profile.employee.rating,
                              )}
                            </Text>
                            <Text style={profileStyles.textRowTitle}>
                              {starsArray.map((star) => (
                                <Icon
                                  key={star}
                                  name={'md-star'}
                                  style={{
                                    color:
                                      this.state.profile.employee.rating >= star
                                        ? BLUE_DARK
                                        : BLUE_LIGHT,
                                    fontSize: 16,
                                  }}
                                />
                              ))}
                            </Text>
                          </View>
                          <View style={[profileStyles.viewRight]}>
                            <Text style={profileStyles.textRowTitle}>
                              {t('PROFILE.completedJobs')}
                            </Text>
                            <Text style={styles.textRowNumber}>
                              {this.state.profile.employee.total_ratings}
                            </Text>
                          </View>
                        </>
                      ) : null}
                    </View>
                  </BackgroundHeader>
                }
                keyExtractor={(review) => String(review.id)}
                renderItem={({ item: review }) => <Review review={review} />}
              />
            ) : null}
          </Container>
        )}
      </I18n>
    );
  }

  loadData = () => {
    this.setState({ isLoading: true }, () => {
      this.getReviews();
      this.getProfile();
    });
  };

  refreshData = () => {
    this.setState({ isRefreshing: true }, () => {
      this.getReviews();
      this.getProfile();
    });
  };

  getReviews = () => {
    jobActions.getEmployeeRatings();
  };

  getProfile = () => {
    inviteActions.getProfile();
  };
}

export default Reviews;
