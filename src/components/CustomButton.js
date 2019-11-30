import React from "react";
import { TouchableOpacity } from "react-native";

const CustomButton = props => {
  const { style, children, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

CustomButton.defaultProps = {
  onPress: () => {}
  // style: [styles.b1]
};

export default CustomButton;
