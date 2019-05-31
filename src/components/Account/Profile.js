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
  }

  componentWillUnmount() {
    this.getProfileSubscription.unsubscribe();
    this.editProfileSubscription.unsubscribe();
    this.getEmployeeRatingsSubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
    this.jobStoreError.unsubscribe();
  }

  getProfileHandler = (profile) => {
    this.setState({ profile, isLoading: false });
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
              <BackgroundHeader>
                <>
                  <Text style={styles.textInfo}>
                    Add a picture of yourself and talk about your experiece to
                    increase your visibility and receive more invites
                  </Text>
                  <View style={styles.viewProgress}>
                    <View style={styles.barProgress} />
                    <View style={styles.barProgressCompleted} />
                    <Text style={styles.textProgress}>Completed 50%</Text>
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

              <View style={styles.viewPadding}>
                {/* <Text style={styles.textBio}>{this.state.profile.bio}</Text> */}
                <Text style={styles.textBio}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </View>

              {this.state.profile && this.state.profile.employee ? (
                <View style={styles.viewRow}>
                  <View style={styles.viewLeft}>
                    <Text style={styles.textRowTitle}>
                      {t('PROFILE.yourRating')}
                    </Text>
                    <Text style={styles.textRowNumber}>
                      {this.state.profile.employee.rating || t('APP.na')}
                    </Text>
                    {this.state.profile.employee.rating ? (
                      <Text style={styles.textRowTitle}>
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
                    ) : null}
                  </View>
                  <View style={styles.viewRight}>
                    <Text style={styles.textRowTitle}>
                      {t('PROFILE.completedJobs')}
                    </Text>
                    <Text style={styles.textRowNumber}>
                      {this.state.profile.employee.total_ratings}
                    </Text>
                  </View>
                </View>
              ) : null}

              {this.showBadges() ? (
                <>
                  <View style={styles.viewPaddingBadges}>
                    <Text style={styles.textSubtitle}>
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
              ) : null}

              {Array.isArray(this.state.ratings) &&
              this.state.ratings.length ? (
                  <View style={styles.viewPadding}>
                    <TouchableOpacity onPress={this.goToReviews}>
                      <Text style={styles.textSubtitle}>
                        {t('PROFILE.whatEmployersSaid')}
                      </Text>
                    </TouchableOpacity>

                    {this.state.ratings.map((rating, index) => (
                      <Text key={index} style={styles.textReview}>
                        {`" ${rating.comments}`}
                      </Text>
                    ))}
                  </View>
                ) : null}
              <View style={styles.viewInfo}>
                <Text style={styles.titleProfile}>Badges</Text>
                <Text style={styles.textProfile}>
                  The more badges you receive, the more invitations you will get
                </Text>
              </View>
              <View style={styles.viewInfo}>
                <Text style={styles.titleProfile}>
                  What employers said about you
                </Text>
                <Text style={styles.textProfile}>
                  To get jobs you can have comments
                </Text>
              </View>
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
}

Profile.routeName = 'Profile';

export default Profile;
