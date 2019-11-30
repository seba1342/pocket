/* eslint-disable react/prop-types */
import React from "react";
import { View, Text } from "react-native";
import { AppContext } from "../../../AppContext";

const AccountItemComponent = props => {
  const { account } = props;

  return (
    <View>
      <Text>{account.name}</Text>
      <Text>{account.balance}</Text>
    </View>
  );
};

const AccountItem = props => {
  const { navigation } = props;
  const { account } = props;

  return (
    <AppContext.Consumer>
      {appContext => {
        return (
          <AccountItemComponent
            appContext={appContext}
            navigation={navigation}
            account={account}
          />
        );
      }}
    </AppContext.Consumer>
  );
};

export default AccountItem;
