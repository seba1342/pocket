/* eslint-disable react/prop-types */
import React from "react";
import { View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { AppContext } from "../../../AppContext";

const AccountItemComponent = props => {
  const { account, navigation } = props;
  console.log(navigation);

  return (
    <View>
      <Text>{account.name}</Text>
      <Text>{account.balance}</Text>
      {account.pockets &&
        account.pockets.map(pocket => (
          <TouchableHighlight
            key={pocket.id}
            onPress={() => {
              navigation.navigate(`Pocket`, pocket);
            }}
          >
            <Text>{pocket.name}</Text>
          </TouchableHighlight>
        ))}
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
