import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { BG_GRAY_LIGHT } from '../../constants/colorPalette';

const styles = StyleSheet.create({
  bgView: {
    flex: 1,
    backgroundColor: BG_GRAY_LIGHT,
    justifyContent: 'center',
    height: 150,
  },
});

class BackgroundHeader extends Component {
  render() {
    return <View style={styles.bgView}>{this.props.children}</View>;
  }
}

BackgroundHeader.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BackgroundHeader;
