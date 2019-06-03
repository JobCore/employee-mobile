import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { Button, Icon } from 'native-base'
import { View } from 'react-native'

import { WHITE_MAIN } from '../../shared/colorPalette'
import { HELP_ROUTE } from '../../constants/routes'

const iconStyle = {
  resizeMode: 'contain',
  height: 32,
  width: 32,
  color: WHITE_MAIN,
  marginRight: 0,
  backgroundColor: '#CC90BF',
  borderRadius: 50,
  textAlign: 'center',
  paddingTop: 3.5,
  marginLeft: -10
}

class HelpIcon extends Component {
  handleOnPress = () => {
    this.props.navigation.navigate(HELP_ROUTE)
  }

  render () {
    return (
      <View>
        <Button
          title={''}
          transparent
          onPress={this.handleOnPress}>
          <Icon
            size={24}
            name="questioncircle"
            style={iconStyle}
          />
        </Button>
      </View>
    )
  }
}

export default withNavigation(HelpIcon)
