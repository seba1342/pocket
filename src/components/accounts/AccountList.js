import React from "react";
import { View, Text } from "react-native";

const AccountList = props => {
  const { accounts } = props;

  if (accounts) {
    return accounts.map(account => (
      <View>
        <Text>{account.name}</Text>
      </View>
    ));
  }

  return (
    <View>
      <Text>Hey</Text>
    </View>
  );
};

export default AccountList;
