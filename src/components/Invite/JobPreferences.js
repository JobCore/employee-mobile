import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Container, Header, Content, Button, Text, Left, Body, Title, Right, Accordion, List, ListItem, Icon, Segment, Item, Input, Form, Label, Toast, Spinner, CheckBox } from 'native-base';
import styles from './JobPreferencesStyle';
import { BLUE_DARK, BLUE_LIGHT, BLUE_MAIN } from '../../constants/colorPalette'
import { TABBAR_ROUTE, SETTING_ROUTE } from "../../constants/routes";
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { FormViewPreferences } from "../../utils/platform";

class JobPreferences extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('JOB_PREFERENCES.jobPreferences'),
    tabBarIcon: ({tintColor}) => (
      <Image
        style={{resizeMode: 'contain', height: 30}}
        source={require('../../assets/image/preferences.png')}
      />
    )
  };

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      positions: [],
      unavailabilitys: [],
      minimum_hourly_rate: '',
      available_on_weekends: false,
    }
  }

  _renderHeaderPosition(t) {
    return (
      <View style={styles.viewHeader}>
        <Text style={styles.textHeader}>
          {t('JOB_PREFERENCES.selectPosition')}
        </Text>
      </View>
    );
  }

  _renderHeaderAvailibility(t) {
    return (
      <View style={styles.viewHeader}>
        <Text style={styles.textHeader}>
          {t('JOB_PREFERENCES.selectUnavailability')}
        </Text>
      </View>
    );
  }

  _renderPosition = () => {
  return (
    <ScrollView style={styles.contentScroll}>
      <List style={{marginBottom: 30, paddingLeft: 0,}}>
        {(Array.isArray(this.state.positions.map)) ?
         this.state.positions.map((position) =>
        <ListItem selected={false} style={styles.itemSelectCheck}>
          <Left>
            <Text style={styles.textList}>Waitress</Text>
          </Left>
          <Right>
            <Icon name="ios-checkmark-circle" style={{fontSize: 20, color: BLUE_DARK}}/>
          </Right>
        </ListItem>)
       : null}
      </List>
    </ScrollView>
  );
}
_renderAvailability = () => {
  return (
    <ScrollView style={styles.contentScroll}>
      <List style={{marginBottom: 30, paddingLeft: 0,}}>
        {(Array.isArray(this.state.unavailabilitys.map)) ?
         this.state.unavailabilitys.map((unavailability) =>
        <ListItem selected={false} style={styles.itemSelectCheck}>
          <Left>
            <Text style={styles.textList}>Waitress</Text>
          </Left>
          <Right>
            <Icon name="ios-checkmark-circle" style={{fontSize: 20, color: BLUE_DARK}}/>
          </Right>
        </ListItem>)
       : null}
      </List>
    </ScrollView>
  );
}
  render() {
    return (<I18n>{(t, { i18n }) => (
      <Container>
        <Header androidStatusBarColor={BLUE_MAIN} style={styles.headerCustom}>
          <Left/>
          <Body>
            <Title style={styles.titleHeader}>
              {t('JOB_PREFERENCES.jobPreferences')}
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate(SETTING_ROUTE)}>
              <Image
                style={{resizeMode: 'contain', height: 25,}}
                source={require('../../assets/image/controls.png')}
              />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <ScrollView>
            <Accordion dataArray={[{ title: t('JOB_PREFERENCES.selectPosition') }]}
              expanded={1}
              style={styles.accordionPosition}
              renderContent={this._renderPosition}
              renderHeader={() => this._renderHeaderPosition(t)}
            />

            <Text style={styles.textAvailability}>
              {t('JOB_PREFERENCES.unavailability')}
            </Text>
            <Accordion dataArray={[{ title: t('JOB_PREFERENCES.selectUnavailability') }]}
              style={styles.accordionAvailability}
              renderContent={this._renderAvailability}
              renderHeader={() => this._renderHeaderAvailibility(t)}
            />

            <FormViewPreferences>
              <Form>
                <Item style={styles.viewInput} rounded>
                  <CheckBox checked={this.state.available_on_weekends} color={BLUE_DARK}/>
                  <Body>
                    <Text style={styles.weekendsText}>
                      {t('JOB_PREFERENCES.available_on_weekends')}
                    </Text>
                  </Body>
                </Item>
                <Item style={styles.viewInput} inlineLabel rounded>
                  <Label style={styles.labelForm}>
                    {t('JOB_PREFERENCES.hourlyRateLabel')}
                  </Label>
                  <Input value={this.state.minimum_hourly_rate}
                        placeholder={t('JOB_PREFERENCES.minimumHourlyRate')}
                             onChangeText={(text) => this.setState({minimum_hourly_rate: text})}/>
                </Item>
              </Form>
            </FormViewPreferences>

            <View style={styles.viewCrud}>
              <View style={styles.viewButtomLeft}>
                <Button
                  style={styles.buttomLeft} full rounded>
                  <Text style={styles.textButtomLeft}>
                    {t('JOB_PREFERENCES.save')}
                  </Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </Content>
      </Container>
    )}</I18n>);
  }
}
export default JobPreferences;
