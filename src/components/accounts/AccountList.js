import React from "react";
import { View } from "react-native";
import { AppContext } from "../../../AppContext";
import AccountItem from "./AccountItem";

const AccountListComponent = props => {
  const { accounts } = props;

  return (
    accounts &&
    accounts.map(account => (
      <View>
        <AccountItem account={account} />
      </View>
    ))
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
