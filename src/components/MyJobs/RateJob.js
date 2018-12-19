import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import {
  Container,
  Content,
  Button,
  Header,
  Left,
  Right,
  Body,
  Title,
  Icon,
  View,
  Item,
  Textarea,
  Text,
} from 'native-base';
import styles from '../Invite/InviteDetailsStyle';
import rateJobStyle from './RateJobStyle.js';
import {
  WHITE_MAIN,
  BLUE_MAIN,
  BLUE_DARK,
  GRAY_LIGHT,
} from '../../constants/colorPalette';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import * as jobActions from './actions';
import jobStore from './JobStore';
import { Loading, CustomToast } from '../../utils/components';
import { WARN, LOG } from '../../utils';

class RateJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      starsArray: [1, 2, 3, 4, 5],
      rating: null,
      comments: '',
      shift: props.navigation.getParam('shift', {}),
    };
  }

  componentDidMount() {
    this.rateJobSubscription = jobStore.subscribe(
      'RateJob',
      this.rateJobHandler,
    );

    this.jobStoreError = jobStore.subscribe('JobStoreError', this.errorHandler);
  }

  componentWillUnmount() {
    this.rateJobSubscription.unsubscribe();
    this.jobStoreError.unsubscribe();
  }

  rateJobHandler = () => {
    this.setState({ isLoading: false });
    CustomToast(i18next.t('MY_JOBS.jobRated'));
    this.props.navigation.goBack();
  };

  errorHandler = () => {
    this.setState({ isLoading: false });
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
                <Title style={styles.titleHeader}>{t('MY_JOBS.rateJob')}</Title>
              </Body>
              <Right />
            </Header>

            <Content contentContainerStyle={rateJobStyle.content}>
              {this.state.shift && this.state.shift.employer ? (
                <Text style={rateJobStyle.textShift}>
                  {this.state.shift.employer.title}
                </Text>
              ) : null}
              <Text style={rateJobStyle.textRate}>
                {t('MY_JOBS.rateThisJob')}
              </Text>

              {Array.isArray(this.state.starsArray) ? (
                <View style={rateJobStyle.starsView}>
                  {this.state.starsArray.map((star) => (
                    <TouchableOpacity
                      key={star}
                      style={{ marginRight: star < 5 ? 20 : 0 }}
                      onPress={() => {
                        this.starClick(star);
                      }}>
                      <Icon
                        name={
                          this.state.rating >= star
                            ? 'md-star'
                            : 'md-star-outline'
                        }
                        style={{
                          color:
                            this.state.rating >= star ? BLUE_DARK : GRAY_LIGHT,
                          fontSize: 50,
                          textAlign: 'center',
                        }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}

              <Item
                onPress={this.focusTextarea}
                style={rateJobStyle.viewTextArea}
                rounded>
                <Textarea
                  ref={(textarea) => (this.textarea = textarea)}
                  rowSpan={5}
                  placeholder={t('MY_JOBS.rateComment')}
                  value={this.state.comments}
                  onChangeText={(text) => this.setState({ comments: text })}
                />
              </Item>

              <View style={rateJobStyle.viewCrud}>
                <View style={rateJobStyle.viewButtomLeft}>
                  <Button
                    onPress={this.goBack}
                    style={rateJobStyle.buttomLeft}
                    full
                    rounded
                    bordered>
                    <Text style={rateJobStyle.textViolet}>
                      {t('APP.cancel')}
                    </Text>
                  </Button>
                </View>
                <View style={rateJobStyle.viewButtomRight}>
                  <Button
                    onPress={this.rateJob}
                    style={rateJobStyle.buttomRight}
                    full
                    rounded
                    bordered>
                    <Text style={rateJobStyle.textBlue}>
                      {t('MY_JOBS.rate')}
                    </Text>
                  </Button>
                </View>
              </View>
            </Content>
          </Container>
        )}
      </I18n>
    );
  }

  starClick = (star) => {
    this.setState({ rating: star });
  };

  rateJob = () => {
    if (
      !this.state.shift ||
      !this.state.shift.id ||
      !this.state.shift.employer
    ) {
      return;
    }

    Alert.alert(
      i18next.t('MY_JOBS.wantToRateJob'),
      this.state.shift.employer.title,
      [
        {
          text: i18next.t('APP.cancel'),
          onPress: () => {
            LOG(this, 'Cancel rateJob');
          },
        },
        {
          text: i18next.t('MY_JOBS.rate'),
          onPress: () => {
            this.setState({ isLoading: true }, () => {
              jobActions.rateJob(
                this.state.shift.id,
                this.state.shift.employer.id,
                this.state.rating,
                this.state.comments,
              );
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  focusTextarea = () => {
    try {
      this.textarea._root.focus();
    } catch (err) {
      WARN(`focusTextarea error: ${err}`);
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
  };
}

export default RateJob;
