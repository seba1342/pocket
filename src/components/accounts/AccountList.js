import React from "react";
import View from "react-native";

const CustomButton = props => {
  const { accounts } = props;

  return (
    
  )
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
