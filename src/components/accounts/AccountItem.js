/* eslint-disable react/prop-types */
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { tw } from "react-native-tailwindcss";
import Icon from "react-native-vector-icons/FontAwesome";
import { AppContext } from "../../../AppContext";

const AccountItemComponent = props => {
  const { account, navigation } = props;

  return (
    <View
      style={[
        tw.p4,
        tw.m2,
        tw.roundedTLg,
        tw.bgWhite,
        tw.text2xl,
        tw.m4,
        tw.rounded,
        tw.shadowXl
      ]}
    >
      <View style={[tw.flex, tw.flexRow, tw.justifyBetween, tw.wFull]}>
        <View style={[tw.flexRow]}>
          <Text style={[tw.text3xl, tw.fontMedium, tw.mR8]}>
            {account.name}
          </Text>
        </View>

        <View style={[tw.flexRow, tw.justifyEnd]}>
          <Text style={[tw.text3xl, tw.fontMedium]}>${account.balance}</Text>
          {account.pockets && (
            <Icon
              style={[tw.mT2, tw.mL1]}
              name="chevron-down"
              size={15}
              color="#000"
            />
          )}
        </View>
      </View>
      {/* <Text style={[tw.textLg]}>Transactions</Text>
      {account.transactions && (
        <TransactionList
          navigation={navigation}
          transactions={account.transactions}
        />
      )} */}

      {account.pockets &&
        account.pockets.map((pocket, index) => {
          const itemKey = index;
          return (
            <View style={[tw.mT4]} key={(account.name, pocket.name)}>
              <View
                key={`activityItem-${itemKey}`}
                style={[
                  tw.p2,
                  tw.pY8,
                  tw.m1,
                  tw.bgWhite,
                  tw.rounded,
                  tw.shadowMd
                ]}
              >
                <TouchableHighlight
                  key={pocket.id}
                  onPress={() => {
                    navigation.navigate(`Pocket`, { pocket, account });
                  }}
                >
                  <View
                    style={[
                      tw.flexRow,
                      tw.bgWhite,
                      tw.roundedSm,
                      tw.justifyBetween,
                      tw.pX4
                    ]}
                  >
                    <View style={[tw.flexRow]}>
                      <Text style={[tw.mR3, tw.text4xl]}>
                        {pocket.categories[0].emoji}
                      </Text>
                      <Text
                        style={[
                          tw.textLg,
                          tw.pT1,
                          tw.text2xl,
                          tw.mT1,
                          tw.fontMedium
                        ]}
                      >
                        {pocket.name}
                      </Text>
                    </View>
                    <View>
                      <View style={[tw.flex, tw.flexRow]}>
                        <Text style={[tw.textLg, tw.text2xl, tw.mT1, tw.pT1]}>
                          ${pocket.spent}
                        </Text>
                        <Text style={[tw.selfEnd, tw.mB2, tw.fontMedium]}>
                          /${pocket.limit}
                        </Text>
                      </View>
                      <View style={[tw.flex, tw.flexRow]}>
                        <Text
                          style={[tw.selfEnd, tw.mB2, tw.fontMedium, tw.textXs]}
                        >
                          resets weekly
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
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
