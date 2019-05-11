import React, { Component } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

class FormViewPreferences extends Component {
  static navigationOptions = { header: null };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.viewFormPreferences}>{this.props.children}</View>
      </KeyboardAvoidingView>
    );
  }
}

FormViewPreferences.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FormViewPreferences;
