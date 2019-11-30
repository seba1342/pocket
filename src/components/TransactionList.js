import React from "react";
import { View } from "react-native";
import { AppContext } from "../../AppContext";
import TransactionItem from "./TransactionItem";

const TransactionListComponent = props => {
  const { transactions, navigation } = props;

  return (
    transactions &&
    transactions.map(transaction => (
      <View>
        <TransactionItem navigation={navigation} transaction={transaction} />
      </View>
    ))
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
