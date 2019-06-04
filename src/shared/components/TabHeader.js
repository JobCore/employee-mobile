import { Body, Header, Left, Title } from 'native-base'
import React from 'react'
import PropTypes from 'prop-types'
import { BLUE_MAIN } from '../colorPalette'
import { headerStyles } from '../styles'
import HelpIcon from './HelpIcon'

const TabHeader = ({ title, screenName }) => (
  <Header androidStatusBarColor={BLUE_MAIN} style={headerStyles.headerCustom}>
    <Body>
      <Title style={headerStyles.titleHeader}>{title}</Title>
    </Body>
    <HelpIcon screenName={screenName} />
  </Header>
)

TabHeader.propTypes = {
  title: PropTypes.string.isRequired,
  screenName: PropTypes.string.isRequired,
  rightImage: PropTypes.object,
}

export { TabHeader }
