import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { BG_GRAY_LIGHT } from '../colorPalette';

const styles = heightAuto => StyleSheet.create({
  bgView: {
    backgroundColor: BG_GRAY_LIGHT,
    justifyContent: 'center',
    height: heightAuto ? 'auto' : 150,
  },
});

class BackgroundHeader extends Component {
  render() {
    const {
      props: {
        heightAuto
      }
    } = this

    return <View style={styles(heightAuto).bgView}>{this.props.children}</View>;
  }
}

BackgroundHeader.propTypes = {
  children: PropTypes.element.isRequired,
  heightAuto: PropTypes.bool
};

export default BackgroundHeader;
