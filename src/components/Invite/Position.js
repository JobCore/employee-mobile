import React, { Component } from 'react';
import { View, Image, Alert, ScrollView, RefreshControl } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Left,
  Right,
  List,
  ListItem,
  Icon,
} from 'native-base';
import styles from './PositionStyle';
import { BLUE_DARK } from '../../shared/colorPalette';
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { CustomToast, Loading } from '../../shared/components';
import { LOG } from '../../shared';
import { ModalHeader } from '../../shared/components/ModalHeader';

class Position extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('JOB_PREFERENCES.position'),
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
      positionList: inviteStore.getState('GetPositions') || [],
      positions: Object.assign(
        [],
        (inviteStore.getState('GetJobPreferences') || {}).positions,
      ),
    };
  }

  componentDidMount() {
    this.getPositionsSubscription = inviteStore.subscribe(
      'GetPositions',
      (positionList) => this.getPositionsHandler(positionList),
    );
    this.getJobPreferencesSubscription = inviteStore.subscribe(
      'GetJobPreferences',
      (data) => this.getJobPreferencesHandler(data),
    );
    this.editPositionsSubscription = inviteStore.subscribe(
      'EditPositions',
      (data) => this.editPositionsHandler(data),
    );
    this.inviteStoreError = inviteStore.subscribe('InviteStoreError', (err) =>
      this.errorHandler(err),
    );

    if (!this.state.positionList.length) {
      this.isLoading(true);
      this.getPositions();
    }

    if (!this.state.positions.length) {
      this.isLoading(true);
      this.getJobPreferences();
    }
  }

  getPositionsHandler = (positionList) => {
    this.isLoading(false);
    this.setState({ positionList });
  };

  getJobPreferencesHandler = (data) => {
    this.isLoading(false);

    this.setState({
      positions: data.positions,
      isRefreshing: false,
    });
  };

  editPositionsHandler = () => {
    this.getJobPreferences();
    CustomToast(i18next.t('JOB_PREFERENCES.positionUpdated'));
    this.props.navigation.goBack();
  };

  errorHandler = () => {
    this.setState({ isRefreshingInvites: false });
    this.isLoading(false);
  };

  componentWillUnmount() {
    this.getPositionsSubscription.unsubscribe();
    this.getJobPreferencesSubscription.unsubscribe();
    this.editPositionsSubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
  }

  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            <ModalHeader
              screenName="position"
              title={t('JOB_PREFERENCES.position')}
            />
            <Content
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.refreshPositions}
                />
              }
              padder>
              <View style={styles.viewContainer}>
                <Button full rounded style={styles.buttonPosition}>
                  <Text uppercase={false} style={styles.textHeader}>
                    {t('JOB_PREFERENCES.position')}
                  </Text>
                </Button>
                <ScrollView style={styles.contentScroll}>
                  <List style={{ marginBottom: 30, paddingLeft: 0 }}>
                    {Array.isArray(this.state.positionList)
                      ? this.state.positionList.map((position) => {
                        const isPositionSelected = this.isPositionSelected(
                          position,
                        );

                        return (
                          <ListItem
                            onPress={() =>
                              this.selectUnselectPosition(
                                position,
                                isPositionSelected,
                              )
                            }
                            key={position.id}
                            selected={isPositionSelected}
                            style={styles.itemSelectCheck}>
                            <Left>
                              <Text style={styles.textList}>
                                {position.title}
                              </Text>
                            </Left>
                            <Right>
                              <Icon
                                name={
                                  isPositionSelected
                                    ? 'ios-checkmark-circle'
                                    : 'ios-radio-button-off'
                                }
                                style={{ fontSize: 20, color: BLUE_DARK }}
                              />
                            </Right>
                          </ListItem>
                        );
                      })
                      : null}
                  </List>
                </ScrollView>

                <View style={styles.viewCrud}>
                  <View style={styles.viewButtomLeft}>
                    <Button
                      onPress={() => this.props.navigation.goBack()}
                      style={styles.buttomLeft}
                      full
                      rounded
                      bordered>
                      <Text style={styles.textWhite}>{t('APP.cancel')}</Text>
                    </Button>
                  </View>
                  <View style={styles.viewButtomRight}>
                    <Button
                      onPress={this.editPosition}
                      style={styles.buttomRight}
                      full
                      rounded
                      bordered>
                      <Text style={styles.textWhite}>
                        {t('JOB_PREFERENCES.save')}
                      </Text>
                    </Button>
                  </View>
                </View>
              </View>
            </Content>
          </Container>
        )}
      </I18n>
    );
  }

  refreshPositions = () => {
    this.setState({ isRefreshing: false });
    this.getPositions();
    this.getJobPreferences();
  };

  getPositions = () => {
    inviteActions.getPositions();
  };

  /**
   * Select or unselect position based on isPositionSelected
   * @param  {object}  position           the position
   * @param  {Boolean} isPositionSelected if the position is selected
   */
  selectUnselectPosition = (position, isPositionSelected) => {
    let positionsCopy;

    if (isPositionSelected) {
      positionsCopy = this.state.positions.filter((e) => e.id !== position.id);
    }

    if (!isPositionSelected) {
      positionsCopy = this.state.positions;
      positionsCopy.push(position);
    }

    if (Array.isArray(positionsCopy)) {
      this.setState({ positions: positionsCopy });
    }
  };

  isPositionSelected = (position) => {
    if (!position || !Array.isArray(this.state.positionList)) {
      return false;
    }

    for (const pos of this.state.positions) {
      if (pos.id === position.id) return true;
    }

    return false;
  };

  getJobPreferences = () => {
    inviteActions.getJobPreferences();
  };

  editPosition = () => {
    Alert.alert(
      i18next.t('JOB_PREFERENCES.editPosition'),
      '',
      [
        {
          text: i18next.t('APP.cancel'),
          onPress: () => {
            LOG(this, 'Cancel editPosition');
          },
        },
        {
          text: i18next.t('JOB_PREFERENCES.update'),
          onPress: () => {
            this.isLoading(true);

            inviteActions.editPositions(
              this.state.positions.map((position) => position.id),
            );
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

export default Position;
