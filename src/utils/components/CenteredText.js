import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'native-base';
import { BLUE_DARK } from '../../constants/colorPalette';

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCentered: {
    color: BLUE_DARK,
    textAlign: 'center',
  }
});

class CenteredText extends Component {
  render() {
    return (
        <View style={styles.centeredView}>
          <Text style={styles.textCentered}>
            {this.props.text}
          </Text>
        </View>
    )
  }
}

CenteredText.propTypes = {
  text: PropTypes.string,
};

export default CenteredText;
