import React, { Component } from "react";
import { BLUE_DARK } from '../../constants/colorPalette';
import {
  View,
  ScrollView,
  AsyncStorage,
  // SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from "react-native";
import { Container, Item, Input, Button, Text, Form, Label, Toast, Spinner, DatePicker } from 'native-base';
import styles from './AddAvailabilityStyle';
import { REGISTER_ROUTE, FORGOT_ROUTE, APP_ROUTE } from "../../constants/routes";
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { LOG, WARN, ERROR } from "../../utils";
import { FormView } from "../../utils/platform";
import moment from 'moment';

class AddAvailability extends Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      startingAt: '',
      endingAt: '',
    };
  }

  componentDidMount() {
    this.addAvailabilitySubscription = inviteStore
      .subscribe('AddAvailability', (data) => this.addAvailabilityHandler(data));
    this.getAvailabilitySubscription = inviteStore
      .subscribe('GetAvailability', (data) => this.getAvailabilityHandler(data));
    this.inviteStoreError = inviteStore
      .subscribe('InviteStoreError', (err) => this.errorHandler(err));
  }

  componentWillUnmount() {
    this.addAvailabilitySubscription.unsubscribe();
    this.getAvailabilitySubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
  }

  addAvailabilityHandler = (data) => {
    this.getAvailability();

    return Toast.show({
      position: 'top',
      type: "success",
      text: i18next.t('JOB_PREFERENCES.availabilityAdded'),
      duration: 4000,
    });
  }

  getAvailabilityHandler = (data) => {
    this.isLoading(false);
    this.props.navigation.goBack();
  }

  errorHandler = (err) => {
    this.isLoading(false);
    Toast.show({
      position: 'top',
      type: "danger",
      text: JSON.stringify(err),
      duration: 4000,
    });
  }

  render() {
    if (this.state.isLoading) {
      return (<View style={styles.container}>
                <Spinner color={BLUE_DARK}/>
            </View>);
    }

    return (<I18n>{(t, { i18n }) => (
            <View style={styles.container}>
                <Image
                    style={styles.viewBackground}
                    source={require('../../assets/image/bg.jpg')}
                />
                <Image
                    style={styles.viewLogo}
                    source={require('../../assets/image/logo1.png')}
                />
                <FormView>
                  <Form>
                    <Item style={styles.viewInput} rounded>
                      <DatePicker
                        defaultDate={new Date()}
                        minimumDate={new Date()}
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText={t('JOB_PREFERENCES.selectStartDate')}
                        textStyle={{ color: BLUE_DARK }}
                        onDateChange={(startingAt) => this.setState({startingAt})}
                      />
                    </Item>

                      <Item style={styles.viewInput} rounded>
                        <DatePicker
                          defaultDate={new Date()}
                          minimumDate={new Date()}
                          locale={"en"}
                          timeZoneOffsetInMinutes={undefined}
                          modalTransparent={false}
                          animationType={"fade"}
                          androidMode={"default"}
                          placeHolderText={t('JOB_PREFERENCES.selectendDate')}
                          textStyle={{ color: BLUE_DARK }}
                          onDateChange={(endingAt) => this.setState({endingAt})}
                        />
                      </Item>
                  </Form>

                  <Button
                      full
                      onPress={this.addAvailability}
                      style={styles.viewButtomLogin}>
                      <Text
                          style={styles.textButtom}>
                          {t('JOB_PREFERENCES.addAvailability')}
                      </Text>
                  </Button>

                  <TouchableOpacity
                      full
                      onPress={() => this.props.navigation.goBack()}
                      style={styles.viewButtomSignUp}>
                      <Text
                          style={styles.textButtomSignUp}>
                          {t('REGISTER.goBack')}
                      </Text>
                  </TouchableOpacity>
                </FormView>
            </View>)
        }</I18n>);
  }

  addAvailability = () => {
    this.isLoading(true);
    inviteActions.addAvailability(this.state.startingAt, this.state.endingAt);
  };

  getAvailability = () => {
    inviteActions.getAvailability();
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }
}

export default AddAvailability;
