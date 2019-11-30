import React from "react";
import { View } from "react-native";
import { tw } from "react-native-tailwindcss";

const ProgressBar = props => {
  const { limit, spent, limitColor, spentColor } = props;

  return (
    <View
      style={[
        tw.mT4,
        tw.wFull,
        tw.h4,
        tw.roundedFull,
        { backgroundColor: limitColor }
      ]}
    >
      <View
        style={[
          tw.absolute,
          tw.hFull,
          tw.roundedFull,
          tw.z10,
          {
            backgroundColor: spentColor,
            width: `${(parseInt(spent) / parseInt(limit)) * 100}%`
          }
        ]}
      />
    </View>
  );
};

export default ProgressBar;
