import React from "react";
import { View, Text } from "react-native";
import { tw } from "react-native-tailwindcss";
import { AppContext } from "../../../AppContext";

const TransactionItemComponent = props => {
  const { transaction, navigation } = props;

  return (
    <View
      style={[
        tw.flexRow,
        tw.mB3,
        tw.shadow,
        tw.bgWhite,
        tw.p5,
        tw.roundedSm,
        tw.justifyBetween
      ]}
    >
      <View style={[tw.flexRow]}>
        <Text style={[tw.mR3, tw.text2xl]}>{transaction.emoji}</Text>
        <Text style={[tw.textLg, tw.pT1]}>{transaction.description}</Text>
      </View>
      <View style={[tw.flex]}>
        <Text style={[tw.textLg, tw.fontSemibold]}>{transaction.amount}</Text>
      </View>
    </View>
  );
};

const TransactionItem = props => {
  const { navigation } = props;
  const { transaction } = props;

  return (
    <AppContext.Consumer>
      {appContext => {
        return (
          <TransactionItemComponent
            appContext={appContext}
            navigation={navigation}
            transaction={transaction}
          />
        );
      }}
    </AppContext.Consumer>
  );
};

export default TransactionItem;
