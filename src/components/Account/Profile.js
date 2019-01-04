import React, { Component } from 'react';
import { View, Image, TouchableOpacity, FlatList } from 'react-native';
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Body,
  Title,
  Right,
  Thumbnail,
  Button,
  Icon,
} from 'native-base';
import styles from './ProfileStyle';
import * as inviteActions from '../Invite/actions';
import inviteStore from '../Invite/InviteStore';
import * as jobActions from '../MyJobs/actions';
import jobStore from '../MyJobs/JobStore';
import accountStore from './AccountStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { CustomToast, Loading } from '../../utils/components';
import { EDIT_PROFILE_ROUTE } from '../../constants/routes';
import {
  BLUE_MAIN,
  WHITE_MAIN,
  BLUE_DARK,
  GRAY_LIGHT,
} from '../../constants/colorPalette';
import PROFILE_IMG from '../../assets/image/myJobs.png';

class Profile extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('DASHBOARD.dashboard'),
    tabBarIcon: () => (
      <Image
        style={{ resizeMode: 'contain', height: 30 }}
        source={require('../../assets/image/dashboard.png')}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isRefreshing: false,
      starsArray: [1, 2, 3, 4, 5],
      badges: [
        // TODO: remove this and get the data from profile.badges
        'EP',
        'ES',
        'OK',
        'US',
        'EP',
        'ES',
        'OK',
        'US',
        'EP',
        'ES',
        'OK',
        'US',
      ],
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
    alert(JSON.stringify(profile));
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
    this.isLoading(false);
    this.setState({ isRefreshing: false });
    CustomToast(err, 'danger');
  };

  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}

            <Header
              androidStatusBarColor={BLUE_MAIN}
              style={styles.headerCustom}>
              <Left>
                <Button
                  transparent
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon
                    name="ios-close"
                    size={24}
                    style={{ color: WHITE_MAIN, marginLeft: 20 }}
                  />
                </Button>
              </Left>
              <Body>
                <Title style={styles.titleHeader}>{t('PROFILE.profile')}</Title>
              </Body>
              <Right />
            </Header>

            <Content>
              <TouchableOpacity onPress={this.goToEditProfile}>
                <Thumbnail
                  style={styles.profileImg}
                  large
                  source={
                    this.state.profile && this.state.profile.picture
                      ? { uri: this.state.profile.picture }
                      : PROFILE_IMG
                  }
                />
              </TouchableOpacity>

              {this.state.profile && this.state.profile.user ? (
                <Text style={styles.textName}>
                  {`${this.state.profile.user.first_name} ${
                    this.state.profile.user.last_name
                  }`}
                </Text>
              ) : null}

              <Text style={styles.textBio}>{this.state.profile.bio}</Text>

              {this.state.profile && this.state.profile.employee ? (
                <View style={styles.viewRow}>
                  <View style={styles.viewLeft}>
                    <Text style={styles.textRowTitle}>
                      {t('PROFILE.yourRating')}
                    </Text>
                    <Text style={styles.textRowNumber}>
                      {this.state.profile.employee.rating}
                    </Text>
                    <Text style={styles.textRowTitle}>
                      {this.state.starsArray.map((star) => (
                        <Icon
                          key={star}
                          name={'md-star'}
                          style={{
                            color:
                              this.state.profile.employee.rating >= star
                                ? BLUE_DARK
                                : GRAY_LIGHT,
                            fontSize: 16,
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
                      {this.state.profile.employee.total_ratings}
                    </Text>
                  </View>
                </View>
              ) : null}

              {Array.isArray(this.state.badges) && this.state.badges.length ? (
                <>
                  <View style={styles.viewPaddingBadges}>
                    <Text style={styles.textSubtitle}>
                      {t('PROFILE.badges')}
                    </Text>
                  </View>

                  <FlatList
                    style={styles.badgesList}
                    horizontal
                    data={this.state.badges}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item: review, index }) => (
                      <View
                        style={[
                          styles.circleBadge,
                          index === 0 ? { marginLeft: 30 } : null,
                        ]}>
                        <Text style={styles.textBadge}>{review}</Text>
                      </View>
                    )}
                  />
                </>
              ) : null}

              {Array.isArray(this.state.ratings) &&
              this.state.ratings.length ? (
                  <View style={styles.viewPadding}>
                    <Text style={styles.textSubtitle}>
                      {t('PROFILE.whatEmployersSaid')}
                    </Text>

                    {this.state.ratings.map((rating, index) => (
                      <Text key={index} style={styles.textReview}>
                        {`"${rating.comments}"`}
                      </Text>
                    ))}
                  </View>
                ) : null}
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

  getProfile = () => {
    inviteActions.getProfile();
  };

  getEmployeeRatings = () => {
    jobActions.getEmployeeRatings();
  };

  goToEditProfile = () => {
    this.props.navigation.navigate(EDIT_PROFILE_ROUTE);
  };
}
export default Profile;
