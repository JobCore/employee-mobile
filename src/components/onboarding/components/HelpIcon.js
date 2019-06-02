import { Button, Icon, Right } from 'native-base';
import { headerStyles } from '../../../shared/styles';
import PropTypes from 'prop-types';
import { HelpModal } from './HelpModal';
import React from 'react';
import { fetchScreens } from '../onboarding-actions';
import { onboardingStore, SCREENS_EVENT } from '../onboarding-store';

class HelpIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false, screens: [] };
  }

  componentDidMount(): void {
    this.onboardingSubscription = onboardingStore.subscribe(SCREENS_EVENT, (screens) => {
      this.setState({ screens });
    });
    fetchScreens(this.props.screenName);
  }

  componentWillUnmount(): void {
    this.onboardingSubscription.unsubscribe();
  }

  render() {
    const { modalOpen, screens } = this.state;
    let content = <></>;
    if (screens.length > 0)
      content = <>
        <HelpModal visible={modalOpen}/>
        <Button
          title={''}
          transparent
          onPress={() => this.setState({ modalOpen: !modalOpen })}>
          <Icon
            name="questioncircle"
            size={24}
            style={headerStyles.rightButtonImage}
          />
        </Button>
      </>;
    return (
      <Right>
        {content}
      </Right>
    );
  }
}


HelpIcon.propTypes = {
  screenName: PropTypes.string.isRequired,
};

export { HelpIcon };
