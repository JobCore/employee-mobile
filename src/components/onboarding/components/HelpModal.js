import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, TouchableHighlight, Alert } from 'react-native';

const HelpModal = ({ visible = false }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={{ marginTop: 22 }}>
        <View>
          <Text>Hello World!</Text>
          <TouchableHighlight>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

HelpModal.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export { HelpModal };
