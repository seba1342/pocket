import React from "react";
import { View, Text } from "react-native";

const AccountList = props => {
  const { accounts } = props;

  return accounts.map(account => (
    <View>
      <Text>{account.name}</Text>
    </View>
  ));
};

export default AccountList;
