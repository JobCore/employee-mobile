import React, { Component } from "react";
import {
  View,
  ScrollView,
  AsyncStorage,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from './styles';

class FormViewPreferences extends Component {
  static navigationOptions = { header: null };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.viewFormPreferences}>
          {this.props.children}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default FormViewPreferences;
