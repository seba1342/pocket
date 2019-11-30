import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const CustomButton = props => {
  const { style, children, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

CustomButton.defaultProps = {
  onPress: () => {},
  style: [styles.b1]
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.instanceOf(Array)
};

export default CustomButton;
