import { Body, Button, Header, Left, Right, Text } from 'native-base';
import { Image } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { headerStyles } from '../styles';
import { BLUE_MAIN } from '../colorPalette';
import HelpIcon from '../../components/onboarding/components/HelpIcon';

class _ModalHeader extends Component {
  render() {
    const {
      canClose = true,
      onPressClose = () => {
        this.props.navigation.goBack();
      },
      title,
      withoutHelpIcon,
      screenName,
    } = this.props;

    return (
      <Header
        androidStatusBarColor={BLUE_MAIN}
        style={headerStyles.headerCustom}>
        <Left>
          {canClose ? (
            <Button
              style={{ marginLeft: 10 }}
              transparent
              onPress={onPressClose}>
              <Image
                style={headerStyles.backButton}
                source={require('../../assets/image/back.png')}
              />
            </Button>
          ) : null}
        </Left>
        <Body style={{ flex: 0 }}>
          <Text style={headerStyles.modalTitleHeader}>{title}</Text>
        </Body>
        <Right>
          {withoutHelpIcon ? <></> : <HelpIcon screenName={screenName} />}
        </Right>
      </Header>
    );
  }
}

_ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  screenName: PropTypes.string.isRequired,
  onPressClose: PropTypes.func,
  onPressHelp: PropTypes.func,
  canClose: PropTypes.bool,
  withoutHelpIcon: PropTypes.bool,
};
_ModalHeader.defaultProps = {
  screenName: null,
};

const ModalHeader = withNavigation(_ModalHeader);

export { ModalHeader };
