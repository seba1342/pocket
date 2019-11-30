/* eslint-disable react/prop-types */
import React from "react";
import { View, Text } from "react-native";
import { tw } from "react-native-tailwindcss";
import { AppContext } from "../../../AppContext";

const CategoryItemComponent = props => {
  const { category } = props;

  return (
    <View style={[tw.bgBlack, tw.roundedFull, tw.pX3, tw.pY2, tw.mR3]}>
      <View style={[tw.flexRow]}>
        <Text style={[tw.textWhite, tw.mR1]}>{category.emoji}</Text>
        <Text style={[tw.textWhite]}>{category.name}</Text>
      </View>
    </View>
  );
};

const CategoryItem = props => {
  const { navigation } = props;
  const { category } = props;

  return (
    <AppContext.Consumer>
      {appContext => {
        return (
          <CategoryItemComponent
            appContext={appContext}
            navigation={navigation}
            category={category}
          />
        );
      }}
    </AppContext.Consumer>
  );
};

export default CategoryItem;
