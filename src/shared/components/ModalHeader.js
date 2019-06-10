import { Body, Button, Header, Icon, Left, Right, Text } from 'native-base';
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
            <Button transparent onPress={onPressClose}>
              <Icon name="ios-close" style={[headerStyles.leftButtonImage]} />
            </Button>
          ) : null}
        </Left>
        <Body>
          <Text style={headerStyles.modalTitleHeader}>{title}</Text>
        </Body>
        {!withoutHelpIcon ? (
          <Right>
            <HelpIcon screenName={screenName} />
          </Right>
        ) : (
          <Right />
        )}
      </Header>
    );
  }
}

_ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  screenName: PropTypes.string,
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
