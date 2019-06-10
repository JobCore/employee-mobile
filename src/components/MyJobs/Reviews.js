import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {
  Icon,
  Text,
  Container,
  Left,
  Body,
  ListItem,
  Thumbnail,
} from 'native-base';
import * as jobActions from './actions';
import jobStore from './JobStore';
import styles from './ReviewsStyle';
import profileStyles from '../Account/ProfileStyle';
import {
  CustomToast,
  Loading,
  CenteredText,
  BackgroundHeader,
} from '../../shared/components';
import { I18n } from 'react-i18next';
import {
  BLUE_MAIN,
  BLUE_DARK,
  BLUE_LIGHT,
  VIOLET_MAIN,
} from '../../shared/colorPalette';
import * as inviteActions from '../Invite/actions';
import inviteStore from '../Invite/InviteStore';
import myJobsImg from '../../assets/image/profile.png';
import moment from 'moment';
import { ModalHeader } from '../../shared/components/ModalHeader';

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
      starsArray: [1, 2, 3, 4, 5],
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

  getRatingEmployeeFormat(rating) {
    rating = parseFloat(rating);

    return rating && typeof rating === 'number' ? rating.toFixed(1) : '0.0';
  }

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
                              {this.getRatingEmployeeFormat(
                                this.state.profile.employee.rating,
                              )}
                            </Text>
                            <Text style={profileStyles.textRowTitle}>
                              {this.state.starsArray.map((star) => (
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
                renderItem={({ item: review }) => (
                  <>
                    <ListItem noBorder style={{ paddingBottom: 5 }}>
                      <Left>
                        <Thumbnail
                          source={
                            review.shift &&
                            review.shift.position &&
                            review.shift.position.picture
                              ? review.shift.position.picture
                              : myJobsImg
                          }
                        />
                        <Body>
                          {review.shift && review.shift.employer ? (
                            <Text style={{ color: VIOLET_MAIN, fontSize: 14 }}>
                              {review.shift.employer.title}
                            </Text>
                          ) : null}
                          {review.shift && review.shift.position ? (
                            <Text
                              style={{
                                color: BLUE_LIGHT,
                                fontSize: 16,
                                fontWeight: 'normal',
                              }}>
                              {`${t('REVIEWS.workingAs')} `}
                              <Text
                                style={{
                                  color: BLUE_MAIN,
                                  fontWeight: 'bold',
                                }}>
                                {review.shift.position.title}
                              </Text>
                            </Text>
                          ) : null}
                          <Text
                            style={{
                              color: BLUE_DARK,
                              fontSize: 16,
                              fontWeight: 'normal',
                            }}>
                            {this.getRatingEmployeeFormat(review.rating)}{' '}
                            <Text>
                              {this.state.starsArray.map((star) => (
                                <Icon
                                  key={star}
                                  name={'md-star'}
                                  style={{
                                    color:
                                      review.rating >= star
                                        ? BLUE_DARK
                                        : BLUE_LIGHT,
                                    fontSize: 16,
                                  }}
                                />
                              ))}

                              <Text
                                style={{
                                  color: BLUE_DARK,
                                  fontWeight: 'bold',
                                }}>
                                {'                '}
                                {moment(review.created_at)
                                  .tz(moment.tz.guess())
                                  .format('L')}
                              </Text>
                            </Text>
                          </Text>
                        </Body>
                      </Left>
                    </ListItem>
                    <ListItem
                      style={{ paddingTop: 5, paddingLeft: 18, marginLeft: 0 }}
                      noBorder={false}>
                      <Text
                        style={{
                          color: BLUE_DARK,
                          fontSize: 16,
                        }}>
                        "{review.comments}"
                      </Text>
                    </ListItem>
                  </>
                )}
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
