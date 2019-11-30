import React from "react";
import { View, Text } from "react-native";
import { tw } from "react-native-tailwindcss";
import { AppContext } from "../../../AppContext";
import TransactionItem from "./TransactionItem";

const TransactionListComponent = props => {
  const { transactions, navigation } = props;

  return (
    <View style={[tw.shadow2xl, tw.bgWhite, tw.roundedSm, tw.p4, tw.mT6]}>
      <Text
        style={[tw.textXl, tw.mB4, tw.fontSemibold]}
      >{`Purchases (${transactions.length})`}</Text>
      {transactions &&
        transactions.map((transaction, index) => {
          const indexKey = index;
          return (
            <View key={indexKey}>
              <TransactionItem
                navigation={navigation}
                transaction={transaction}
              />
            </View>
          );
        })}
    </View>
  );
};

const TransactionList = props => {
  const { navigation } = props;
  const { transactions } = props;

  return (
    <AppContext.Consumer>
      {appContext => {
        return (
          <TransactionListComponent
            appContext={appContext}
            navigation={navigation}
            transactions={transactions}
          />
        );
      }}
    </AppContext.Consumer>
  );
};

export default TransactionList;
