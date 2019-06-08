import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import {
  Container,
  Content,
  Button,
  Icon,
  View,
  Item,
  Textarea,
  Text,
} from 'native-base';
import rateEmployerStyle from './RateEmployerStyle.js';
import { BLUE_DARK, GRAY_LIGHT } from '../../shared/colorPalette';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import * as jobActions from './actions';
import jobStore from './JobStore';
import { Loading, CustomToast } from '../../shared/components';
import { WARN, LOG } from '../../shared';
import { ModalHeader } from '../../shared/components/ModalHeader';

class RateEmployer extends Component {
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
      'RateEmployer',
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
    CustomToast(i18next.t('MY_JOBS.employerRated'));
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
            <ModalHeader
              screenName="rateEmployer"
              title={t('MY_JOBS.rateEmployer')}
            />
            <Content contentContainerStyle={rateEmployerStyle.content}>
              {this.state.shift && this.state.shift.employer ? (
                <Text style={rateEmployerStyle.textShift}>
                  {this.state.shift.employer.title}
                </Text>
              ) : null}
              <Text style={rateEmployerStyle.textRate}>
                {t('MY_JOBS.rateThisEmployer')}
              </Text>

              {Array.isArray(this.state.starsArray) ? (
                <View style={rateEmployerStyle.starsView}>
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
                style={rateEmployerStyle.viewTextArea}
                rounded>
                <Textarea
                  ref={(textarea) => (this.textarea = textarea)}
                  rowSpan={5}
                  placeholder={t('MY_JOBS.rateComment')}
                  value={this.state.comments}
                  onChangeText={(text) => this.setState({ comments: text })}
                />
              </Item>

              <View style={rateEmployerStyle.viewCrud}>
                <View style={rateEmployerStyle.viewButtomLeft}>
                  <Button
                    onPress={this.goBack}
                    style={rateEmployerStyle.buttomLeft}
                    full
                    rounded
                    bordered>
                    <Text style={rateEmployerStyle.textViolet}>
                      {t('APP.cancel')}
                    </Text>
                  </Button>
                </View>
                <View style={rateEmployerStyle.viewButtomRight}>
                  <Button
                    onPress={this.rateEmployer}
                    style={rateEmployerStyle.buttomRight}
                    full
                    rounded
                    bordered>
                    <Text style={rateEmployerStyle.textBlue}>
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

  rateEmployer = () => {
    if (
      !this.state.shift ||
      !this.state.shift.id ||
      !this.state.shift.employer
    ) {
      return;
    }

    Alert.alert(
      i18next.t('MY_JOBS.wantToRateEmployer'),
      this.state.shift.employer.title,
      [
        {
          text: i18next.t('APP.cancel'),
          onPress: () => {
            LOG(this, 'Cancel rateEmployer');
          },
        },
        {
          text: i18next.t('MY_JOBS.rate'),
          onPress: () => {
            this.setState({ isLoading: true }, () => {
              jobActions.rateEmployer(
                this.state.shift.id,
                this.state.shift.employer,
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

export default RateEmployer;
