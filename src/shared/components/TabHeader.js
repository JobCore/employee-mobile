import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base';
import { BLUE_MAIN } from '../colorPalette';
import { headerStyles } from '../styles';
import { Modal, View, Text, TouchableHighlight, Alert } from 'react-native';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
    </Modal>);
};

class Help extends React.Component {
  constructor({ screenName }) {
    super();
    this.state = { visible: false };
  }

  render() {
    const { visible } = this.state;
    return <Right>
      <HelpModal visible={visible}/>
      <Button title={''} transparent onPress={() => this.setState({ visible: !visible })}>
        <Icon
          name="questioncircle"
          size={24}
          style={headerStyles.rightButtonImage}
        />
      </Button>
    </Right>;
  }
}

const TabHeader = ({ title, screenName }) => {
  return (
    <Header androidStatusBarColor={BLUE_MAIN} style={headerStyles.headerCustom}>
      <Left style={{ width: 20, backgroundColor: 'yellow' }}/>
      <Body>
        <Title style={headerStyles.titleHeader}>{title}</Title>
      </Body>
      <Help screenName={screenName}/>
    </Header>
  );
};

TabHeader.propTypes = {
  title: PropTypes.string.isRequired,
  screenName: PropTypes.string.isRequired,
  rightImage: PropTypes.object,
};

export { TabHeader };
