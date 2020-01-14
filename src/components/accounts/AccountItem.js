/* eslint-disable react/prop-types */
import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { tw } from "react-native-tailwindcss";
import Icon from "react-native-vector-icons/FontAwesome";
import ProgressBar from "../ProgessBar";
import { AppContext } from "../../../AppContext";

class AccountItemComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      expanded: true
    };
  }

  handleExpand = () => {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded
    });
  };

  render() {
    const { account, appContext, navigation } = this.props;
    const { expanded } = this.state;

    return (
      <TouchableHighlight onPress={this.handleExpand} underlayColor="#E8D7AD">
        <View
          style={[
            tw.p4,
            tw.m2,
            tw.mX4,
            tw.bgWhite,
            tw.text2xl,
            tw.roundedLg,
            tw.shadowXl
          ]}
        >
          <View style={[tw.flex, tw.flexRow, tw.justifyBetween, tw.wFull]}>
            <View style={[tw.flexCol]}>
              <Text style={[tw.text3xl, tw.mR4]}>{account.name}</Text>
              <Text style={[tw.textSm, tw.fontLight, tw.mT1, tw.opacity75]}>
                1040-4000-132
              </Text>
            </View>
            <View style={[tw.flexRow, tw.selfCenter]}>
              <Text style={[tw.text3xl, tw.fontMedium, tw.mR2]}>
                ${account.balance}
              </Text>
              {account.pockets && (
                <View style={[tw.pR2]}>
                  <Icon
                    style={[tw.mT3, tw.mL2]}
                    name={expanded ? `chevron-up` : `chevron-down`}
                    size={15}
                    color="#000"
                  />
                </View>
              )}
            </View>
          </View>

          {account.pockets &&
            expanded &&
            account.pockets.map((pocket, index) => {
              const itemKey = index;
              const pocketSpend = appContext.getPocketSpent(
                account.id,
                pocket.id
              );

              return (
                <View key={itemKey}>
                  <TouchableHighlight
                    key={pocket.id}
                    onPress={() => {
                      navigation.navigate(`Pocket`, { pocket, account });
                    }}
                    underlayColor="#FFFFFF"
                  >
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
                        <View
                          style={[
                            tw.flexRow,
                            tw.flex,
                            tw.flexRow,
                            tw.justifyBetween
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
                            <View
                              style={[
                                tw.flex,
                                tw.flexRow,
                                tw.justifyEnd,
                                tw.itemsEnd
                              ]}
                            >
                              <Text
                                style={[
                                  tw.textXl,
                                  tw.mT1,
                                  tw.pT1,
                                  tw.fontMedium
                                ]}
                              >
                                ${pocket.spent}
                              </Text>
                              <Text style={[tw.textXl]}>/${pocket.limit}</Text>
                            </View>
                            <View style={[tw.flex, tw.flexRow, tw.justifyEnd]}>
                              <Text style={[tw.mB2, tw.textXs, tw.textRight]}>
                                resets weekly
                              </Text>
                            </View>
                          </View>
                        </View>

                        <ProgressBar
                          limit={pocket.limit}
                          spent={pocketSpend}
                          limitColor="#222222"
                          spentColor="#E8D7AD"
                        />
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              );
            })}

          {account.pockets && (
            <TouchableHighlight
              onPress={() => {
                navigation.navigate(`AddPocket`);
              }}
              underlayColor="#FFFFFF"
            >
              <View style={[tw.flex, tw.flexRow, tw.itemsCenter, tw.mT2]}>
                {!expanded && (
                  <View style={[tw.w1_2]}>
                    <Text style={[tw.textLg]}>
                      {account.pockets.length} Pockets
                    </Text>
                  </View>
                )}

                <View
                  style={[
                    tw.mT2,
                    tw.p4,
                    tw.w1_2,
                    tw.bgWhite,
                    tw.selfEnd,
                    tw.shadowLg,
                    tw.roundedFull,
                    tw.flexRow,
                    tw.justifyCenter
                  ]}
                >
                  <Text style={[tw.fontSemibold]}>Add new pocket</Text>

                  <View style={[tw.mL4]}>
                    <Icon weight name="plus" size={18} color="#000" />
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          )}
        </View>
      </TouchableHighlight>
    );
  }
}

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
