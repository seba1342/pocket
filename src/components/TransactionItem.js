import React from "react";
import { View, Text } from "react-native";
import { AppContext } from "../../AppContext";

const TransactionItemComponent = props => {
  const { transaction, navigation } = props;

  return (
    <View>
      <Text>
        {transaction.emoji} - {transaction.amount}
      </Text>
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
