import React, { Component } from 'react';
import {
  View,
  ScrollView,
  AsyncStorage,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';

class FormViewPreferences extends Component {
  static navigationOptions = { header: null };

  render() {
    return (
      <ScrollView
        style={styles.viewFormPreferences}
        keyboardShouldPersistTaps={'always'}>
        {this.props.children}
      </ScrollView>
    );
  }
}

export default FormViewPreferences;
