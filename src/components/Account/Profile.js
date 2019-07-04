import React, { Component } from 'react';
import { View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content, Text, Thumbnail, Icon } from 'native-base';
import styles from './ProfileStyle';
import * as inviteActions from '../Invite/actions';
import inviteStore from '../Invite/InviteStore';
import * as jobActions from '../MyJobs/actions';
import jobStore from '../MyJobs/JobStore';
import accountStore from './AccountStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import {
  CustomToast,
  Loading,
  BackgroundHeader,
} from '../../shared/components';
import { REVIEWS_ROUTE } from '../../constants/routes';
import { BLUE_DARK, BLUE_LIGHT } from '../../shared/colorPalette';
import PROFILE_IMG from '../../assets/image/profile.png';
import { ModalHeader } from '../../shared/components/ModalHeader';
import EditProfile from './EditProfile';
import { Review } from '../MyJobs/components/Review';
import { getRatingEmployeeFormat } from '../MyJobs/job-utils';

class Profile extends Component {
  static navigationOptions = {
    tabBarLabel: i18next.t('PROFILE.profile'),
    tabBarIcon: () => (
      <Image
        style={{ resizeMode: 'contain', width: 42, height: 42 }}
        source={require('../../assets/image/myJobs.png')}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isRefreshing: false,
      starsArray: [1, 2, 3, 4, 5],
      ratings: [],
      profile: {},
      completed: 0,
    };
  }

  componentDidMount() {
    this.getProfileSubscription = inviteStore.subscribe(
      'GetProfile',
      this.getProfileHandler,
    );
    this.editProfileSubscription = accountStore.subscribe(
      'EditProfile',
      this.getProfile,
    );
    this.getEmployeeRatingsSubscription = jobStore.subscribe(
      'GetEmployeeRatings',
      this.getEmployeeRatingsHandler,
    );
    this.inviteStoreError = inviteStore.subscribe(
      'InviteStoreError',
      this.errorHandler,
    );
    this.jobStoreError = jobStore.subscribe('JobStoreError', this.errorHandler);

    this.firstLoad();
    this.updateCompleted();
  }

  componentWillUnmount() {
    this.getProfileSubscription.unsubscribe();
    this.editProfileSubscription.unsubscribe();
    this.getEmployeeRatingsSubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
    this.jobStoreError.unsubscribe();
  }

  getProfileHandler = (profile) => {
    this.setState(
      {
        profile,
        isLoading: false,
      },
      this.updateCompleted,
    );
  };

  getEmployeeRatingsHandler = (ratings) => {
    if (Array.isArray(ratings)) {
      if (ratings.length <= 2) return this.setState({ ratings });

      const lastTwoElements = ratings.slice(ratings.length - 2, ratings.length);
      this.setState({ ratings: lastTwoElements });
    }
  };

  errorHandler = (err) => {
    this.setState({ isLoading: false, isRefreshing: false });
    CustomToast(err, 'danger');
  };

  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            <ModalHeader
              title={t('PROFILE.profile')}
              onPressClose={() => this.props.navigation.goBack()}
              onPressHelp={() => this.props.navigation.goBack()}
            />
            <Content>
              <BackgroundHeader heightAuto>
                <>
                  <Text style={styles.textInfo}>
                    "{t('PROFILE.completeProfileText')}"
                  </Text>
                  <View style={styles.viewProgress}>
                    <View style={styles.barProgress} />
                    <View
                      style={styles.barProgressCompleted(this.state.completed)}
                    />
                    <Text style={styles.textProgress}>
                      Completed {this.state.completed}%
                    </Text>
                    <View
                      style={styles.barProgressCircle(
                        this.state.completed === 100,
                      )}
                    />
                  </View>
                  <TouchableOpacity onPress={this.goToEditProfile}>
                    <View style={styles.viewProfileImg}>
                      <Thumbnail
                        large
                        source={
                          this.state.profile && this.state.profile.picture
                            ? { uri: this.state.profile.picture }
                            : PROFILE_IMG
                        }
                      />
                      <View style={styles.viewCameraCircle}>
                        <Image
                          style={styles.camera}
                          source={require('../../assets/image/camera.png')}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>

                  {this.state.profile && this.state.profile.user ? (
                    <Text style={styles.textName}>
                      {`${this.state.profile.user.first_name} ${
                        this.state.profile.user.last_name
                      }`}
                    </Text>
                  ) : null}
                </>
              </BackgroundHeader>
              <View>
                <Text style={styles.textBio}>{this.state.profile.bio}</Text>
              </View>
              {this.state.profile && this.state.profile.employee ? (
                <View style={styles.viewRow}>
                  <View style={styles.viewLeft}>
                    <Text style={styles.textRowTitle}>
                      {t('PROFILE.yourRating')}
                    </Text>
                    <Text style={styles.textRowNumber}>
                      {/*{this.state.profile.employee.rating ||*/}
                      {/*t('PROFILE.noRating')}*/}

                      {getRatingEmployeeFormat(
                        this.state.profile.employee.rating,
                      )}
                    </Text>
                    <Text style={styles.textRowTitle}>
                      {this.state.starsArray.map((star) => (
                        <Icon
                          key={star}
                          name={'md-star'}
                          style={{
                            color:
                              this.state.profile.employee.rating &&
                              this.state.profile.employee.rating >= star
                                ? BLUE_DARK
                                : BLUE_LIGHT,
                            fontSize: 22.5,
                          }}
                        />
                      ))}
                    </Text>
                  </View>
                  <View style={styles.viewRight}>
                    <Text style={styles.textRowTitle}>
                      {t('PROFILE.completedJobs')}
                    </Text>
                    <Text style={styles.textRowNumber}>
                      {/*{this.state.profile.employee.total_ratings > 0*/}
                      {/*  ? this.state.profile.employee.total_ratings*/}
                      {/*  : t('PROFILE.noRating')}*/}

                      {this.state.profile.employee.total_ratings}
                    </Text>
                  </View>
                </View>
              ) : null}

              {this.showBadges() ? (
                <>
                  <View style={styles.viewInfo}>
                    <Text style={[styles.textSubtitle, { marginBottom: 10 }]}>
                      {t('PROFILE.badges')}
                    </Text>
                  </View>
                  <FlatList
                    style={styles.badgesList}
                    horizontal
                    data={this.state.profile.employee.badges}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item: badge, index }) => (
                      <View
                        style={[
                          styles.viewBadgeListItem,
                          index === 0 ? { marginLeft: 30 } : null,
                        ]}>
                        <Thumbnail
                          source={
                            badge.image_url
                              ? { uri: badge.image_url }
                              : PROFILE_IMG
                          }
                          style={styles.imageBadge}
                        />
                        <Text style={styles.textBadgeName}>{badge.title}</Text>
                      </View>
                    )}
                  />
                </>
              ) : (
                <View style={styles.viewInfo}>
                  <Text style={[styles.titleProfile, { marginBottom: 10 }]}>
                    {t('PROFILE.badges')}
                  </Text>
                  <Text style={styles.textProfile}>
                    {t('PROFILE.noBadges')}
                  </Text>
                </View>
              )}
              {Array.isArray(this.state.ratings) &&
              this.state.ratings.length ? (
                  <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <TouchableOpacity onPress={this.goToReviews}>
                      <Text style={[styles.textSubtitle, { paddingLeft: 20 }]}>
                        {t('PROFILE.whatEmployersSaid')}
                      </Text>
                    </TouchableOpacity>
                    {this.state.ratings.map((rating, index) => (
                      <Review review={rating} key={index} />
                    ))}
                  </View>
                ) : (
                  <View style={styles.viewInfo}>
                    <Text style={styles.titleProfile}>
                      {t('PROFILE.whatEmployersSaid')}
                    </Text>
                    <Text style={styles.textProfile}>
                      {t('PROFILE.noJobsComments')}
                    </Text>
                  </View>
                )}
            </Content>
          </Container>
        )}
      </I18n>
    );
  }

  firstLoad = () => {
    this.setState({ isLoading: true }, () => {
      this.getProfile();
      this.getEmployeeRatings();
    });
  };

  showBadges = () => {
    try {
      if (
        Array.isArray(this.state.profile.employee.badges) &&
        this.state.profile.employee.badges.length
      )
        return true;
    } catch (e) {
      return false;
    }

    return false;
  };

  getProfile = () => {
    inviteActions.getProfile();
  };

  getEmployeeRatings = () => {
    jobActions.getEmployeeRatings();
  };

  goToEditProfile = () => {
    this.props.navigation.navigate(EditProfile.routeName);
  };

  goToReviews = () => {
    this.props.navigation.navigate(REVIEWS_ROUTE);
  };

  updateCompleted() {
    let { completed, profile } = this.state;

    if (profile) {
      completed += this.state.profile.picture ? 50 : 0;
      completed += this.state.profile.bio ? 50 : 0;

      this.setState({ completed });
    }
  }
}

Profile.routeName = 'Profile';

export default Profile;
