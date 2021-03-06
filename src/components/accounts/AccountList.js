/* eslint-disable react/prop-types */
import React from "react";
import { View } from "react-native";
import { tw } from "react-native-tailwindcss";

import { AppContext } from "../../../AppContext";
import AccountItem from "./AccountItem";

const AccountListComponent = props => {
  const { accounts, navigation } = props;

  return (
    accounts &&
    accounts.map((account, index) => {
      const accountListKey = index;
      return (
        <View styles={[tw.pB16, tw.relative, tw.block]} key={accountListKey}>
          <AccountItem navigation={navigation} account={account} />
        </View>
      );
    })
  );
};

const AccountList = props => {
  const { navigation } = props;
  const { accounts } = props;

  return (
    <AppContext.Consumer>
      {appContext => {
        return (
          <AccountListComponent
            appContext={appContext}
            navigation={navigation}
            accounts={accounts}
          />
        );
      }}
    </AppContext.Consumer>
  );
};

export default AccountList;
