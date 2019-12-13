import React, { Component } from 'react';
import { Content, Container, Button, Text } from 'native-base';
import { I18n } from 'react-i18next';
import { REGISTER_ROUTE } from '../../constants/routes';
import { TabHeader } from '../../shared/components/TabHeader';
import styles from './TermsAndConditionsStyle';
import * as actions from './actions';
import store from './AccountStore';

class TermsAndConditionsScreen extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.editTermsAndConditionsSubscription = store.subscribe(
      'TermsAndCondition',
      (bool) => {
        console.log('terms changed: ', bool);
        this.props.navigation.navigate(REGISTER_ROUTE);
      },
    );
  }

  componentWillUnmount() {
    this.editTermsAndConditionsSubscription.unsubscribe();
  }

  updateTermsAndCondition = (boolean) => {
    actions.editTermsAndCondition(boolean);
  };

  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            <TabHeader
              goBack
              onPressBack={() => this.updateTermsAndCondition(false)}
              title={t('TERMS_AND_CONDITIONS.title')}
            />
            <Content contentContainerStyle={{ flexGrow: 1 }}>
              <Button
                full
                onPress={() => this.updateTermsAndCondition(true)}
                style={styles.viewButtomLogin}>
                <Text style={styles.textButtom}>
                  {t('TERMS_AND_CONDITIONS.accept')}
                </Text>
              </Button>
              <Button
                full
                onPress={() => this.updateTermsAndCondition(false)}
                style={styles.viewButtomLogin}>
                <Text style={styles.textButtom}>
                  {t('TERMS_AND_CONDITIONS.reject')}
                </Text>
              </Button>
            </Content>
          </Container>
        )}
      </I18n>
    );
  }
}

export default TermsAndConditionsScreen;
