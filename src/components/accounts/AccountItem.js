/* eslint-disable react/prop-types */
import React from "react";
import { View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { tw } from "react-native-tailwindcss";
import TransactionList from "../transactions/TransactionList";
import { AppContext } from "../../../AppContext";

const AccountItemComponent = props => {
  const { account, navigation } = props;

  return (
    <View style={[tw.p4, tw.m1, tw.roundedTLg, tw.bgTeal700, tw.text2xl]}>
      <Text>{account.name}</Text>
      <Text>{account.balance}</Text>
      <Text style={[tw.textLg]}>Transactions</Text>
      {account.transactions && (
        <TransactionList
          navigation={navigation}
          transactions={account.transactions}
        />
      )}
      {account.pockets &&
        account.pockets.map((pocket, index) => {
          const itemKey = index;
          return (
            <View
              key={`activityItem-${itemKey}`}
              style={[tw.p2, tw.pY8, tw.m1, tw.rounded, tw.bgBlack]}
            >
              <TouchableHighlight
                key={pocket.id}
                onPress={() => {
                  navigation.navigate(`Pocket`, { pocket, account });
                }}
              >
                <View
                  style={[
                    tw.wFull,
                    tw.flex,
                    tw.flexRow,
                    tw.justifyBetween,
                    tw.itemsStart
                  ]}
                >
                  <Text style={[tw.text2xl, tw.textWhite]}>{pocket.name}</Text>
                </View>
              </TouchableHighlight>
            </View>
          );
        })}
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
