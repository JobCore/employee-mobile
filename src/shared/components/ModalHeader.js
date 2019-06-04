import { Body, Button, Header, Icon, Left, Right, Text } from 'native-base'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'
import { headerStyles } from '../styles'
import { BLUE_MAIN } from '../colorPalette'

import { HELP_ROUTE } from '../../constants/routes'
import HelpIcon from './HelpIcon'

class ModalHeader extends Component {
  render() {
    const {
      canClose = true,
      onPressClose = () => {},
      title,
      withoutHelpIcon,
      screenName,
    } = this.props

    return (
      <Header
        androidStatusBarColor={BLUE_MAIN}
        style={headerStyles.headerCustom}
      >
        {canClose ? (
          <Left>
            <Button transparent onPress={onPressClose} title="">
              <Icon
                name="ios-arrow-back"
                style={[headerStyles.leftButtonImage]}
              />
            </Button>
          </Left>
        ) : (
          <Left />
        )}
        <Body>
          <Text style={[headerStyles.modalTitleHeader]}>{title}</Text>
        </Body>
        <Right>
          {!withoutHelpIcon && <HelpIcon screenName={screenName} />}
        </Right>
      </Header>
    )
  }
}

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onPressClose: PropTypes.func,
  onPressHelp: PropTypes.func,
  canClose: PropTypes.bool,
}

ModalHeader = withNavigation(ModalHeader)

export { ModalHeader }
