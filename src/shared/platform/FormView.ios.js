import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';

class FormView extends Component {
  static navigationOptions = { header: null };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.viewForm}>{this.props.children}</View>
      </KeyboardAvoidingView>
    );
  }
}

export default FormView;
