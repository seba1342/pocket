/* eslint-disable react/prop-types */
import React from "react";
import { View, Text } from "react-native";
import { tw } from "react-native-tailwindcss";
import { AppContext } from "../../../AppContext";

const SelectableCategoryItemComponent = props => {
  const { category } = props;
  const bg = category.isSelected ? tw.bgBlack : tw.bgWhite;
  const textColor = category.isSelected ? tw.textWhite : tw.textBlack;
  const styles = [bg, tw.roundedFull, tw.pX3, tw.pY2, tw.mR3];

  return (
    <View style={styles}>
      <View style={[tw.flexRow]}>
        <Text style={[tw.mR1]}>{category.emoji}</Text>
        <Text style={[textColor]}>{category.name}</Text>
      </View>
    </View>
  );
};

const SelectableCategoryItem = props => {
  const { navigation } = props;
  const { category } = props;

  return (
    <AppContext.Consumer>
      {appContext => {
        return (
          <SelectableCategoryItemComponent
            appContext={appContext}
            navigation={navigation}
            category={category}
          />
        );
      }}
    </AppContext.Consumer>
  );
};

export default SelectableCategoryItem;
