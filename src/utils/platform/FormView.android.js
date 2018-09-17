import React, { Component } from "react";
import {
  View,
  ScrollView,
  AsyncStorage,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from './styles';

class FormView extends Component {
  static navigationOptions = { header: null };

  render() {
    return (
      <ScrollView style={styles.viewForm} keyboardShouldPersistTaps={'always'}>
        {this.props.children}
      </ScrollView>
    );
  }
}

export default FormView;
