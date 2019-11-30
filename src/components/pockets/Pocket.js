/* eslint-disable react/prop-types */
import React from "react";
import { View, Text } from "react-native";
import { tw } from "react-native-tailwindcss";
import { AppContext } from "../../../AppContext";
import CategoryItem from "./Category";
import TransactionList from "../transactions/TransactionList";

const PocketComponent = props => {
  const { pocket, account, navigation } = props;
  const pocketCategories = pocket.categories.map(c => c.name);

  const transactions = account.transactions.filter(transaction =>
    pocketCategories.includes(transaction.category)
  );

  return (
    <View>
      <View style={[tw.flexRow]}>
        <Text
          style={[tw.text3xl, tw.fontBold, tw.capitalize]}
        >{`${pocket.name}`}</Text>
        <Text style={[tw.text3xl]}> pocket</Text>
      </View>

      <View style={[tw.flexCol, tw.justifyBetween, tw.mT6]}>
        <Text style={[tw.text2xl, tw.fontSemibold, tw.mB3]}>Categories:</Text>
        <View style={[tw.flexRow]}>
          {pocket.categories.map((category, index) => {
            const indexKey = index;
            return <CategoryItem key={indexKey} category={category} />;
          })}
        </View>
      </View>
      <View style={[tw.flexRow, tw.justifyBetween, tw.mT6]}>
        <Text style={[tw.text2xl, tw.fontSemibold]}>Spend:</Text>
        <View style={[tw.flexRow]}>
          <Text
            style={[tw.textXl, tw.selfEnd, tw.fontSemibold]}
          >{`$${pocket.spent}`}</Text>
          <Text style={[tw.selfEnd]}>{`/$${pocket.limit}`}</Text>
        </View>
      </View>
      <View>
        <Text style={[tw.selfEnd]}>{`resets ${pocket.period}`}</Text>
      </View>
      <TransactionList transactions={transactions} navigation={navigation} />
      {/* <View>
        <ProgressBar>{`resets ${pocket.period}`}</ProgressBar>
      </View> */}
    </View>
  );
};

const Pocket = props => {
  const { navigation } = props;
  const { pocket, account } = props;

  return (
    <AppContext.Consumer>
      {appContext => {
        return (
          <PocketComponent
            appContext={appContext}
            navigation={navigation}
            pocket={pocket}
            account={account}
          />
        );
      }}
    </AppContext.Consumer>
  );
};

export default Pocket;
