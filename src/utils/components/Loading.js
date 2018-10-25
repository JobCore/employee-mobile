import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Modal,
} from 'react-native';
import { Spinner } from 'native-base';
import { BLUE_DARK, WHITE_MAIN } from '../../constants/colorPalette';
import { LOG } from "../../utils";

const Loading = props => {
  const {
    isLoading,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isLoading}
      onRequestClose={() => {LOG(this, 'close modal')}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Spinner color={BLUE_DARK}/>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: WHITE_MAIN,
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

Loading.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loading;
