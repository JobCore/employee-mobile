import { Button, Icon, Right } from 'native-base';
import { headerStyles } from '../../../shared/styles';
import PropTypes from 'prop-types';
import { HelpModal } from './HelpModal';
import React from 'react';

class HelpIcon extends React.Component {
  constructor({ screenName }) {
    super();
    this.state = { visible: false };
  }

  render() {
    const { visible } = this.state;
    return (
      <Right>
        <HelpModal visible={visible}/>
        <Button
          title={''}
          transparent
          onPress={() => this.setState({ visible: !visible })}>
          <Icon
            name="questioncircle"
            size={24}
            style={headerStyles.rightButtonImage}
          />
        </Button>
      </Right>
    );
  }
}


HelpIcon.propTypes = {
  screenName: PropTypes.string.isRequired,
};

export { HelpIcon };
