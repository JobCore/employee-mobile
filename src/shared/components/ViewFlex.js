import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const ViewFlex = ({ children, style = null, ...rest }) => {
  let originalStyle = { flex: 1 };
  if (style) {
    originalStyle = Object.assign({}, originalStyle, style);
  }
  return (
    <View style={originalStyle} {...rest}>
      {children}
    </View>
  );
};

ViewFlex.propTypes = {
  children: PropTypes.element.isRequired,
  style: PropTypes.object,
};

export { ViewFlex };
