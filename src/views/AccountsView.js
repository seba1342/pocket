/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { NavigationEvents } from "react-navigation";
import { tw } from "react-native-tailwindcss";

import { AppContext } from "../../AppContext";

import AccountList from "../components/accounts/AccountList";
import CustomButton from "../components/CustomButton";
import Notification from "../components/Notification";

//

import waccasLogo from "../../assets/maccas.png";

class AccountsViewComponent extends Component {
  constructor() {
    super();

    this.state = {
      expanded: -1,
      tokens: []
    };
  }

  componentWillMount() {
    const { appContext } = this.props;

    appContext.setHeaderTitle(`Your accounts`);
  }

  componentDidMount() {
    //
  }

  expand = index => {
    const { expanded } = this.state;

    if (expanded === index) {
      this.setState({
        expanded: -1
      });
    } else {
      this.setState({
        expanded: index
      });
    }
  };

  isActive = tokenName => {
    const { tokens } = this.state;

    return tokens.includes(tokenName);
  };

  save = navigation => {
    const { appContext } = this.props;
    const { tokens } = this.state;

    appContext.setTokens(tokens);
  };

  toggle = token => {
    const { tokens } = this.state;

    if (!tokens.includes(token)) {
      tokens.push(token);
    } else {
      tokens.splice(tokens.indexOf(token), 1);
    }

    this.setState({
      tokens
    });
  };

  // static navigationOptions = {
  //   title: `Your accounts`
  // };

  render() {
    const { navigation, appContext } = this.props;
    const { accounts } = appContext;

    return (
      <>
        <NavigationEvents
          onWillFocus={() => appContext.setHeaderTitle(`Your accounts`)}
        />

        <ScrollView
          contentContainerStyle={[
            tw.wFull,
            tw.relative,
            tw.flex,
            tw.itemsStretch,
            tw.bgCream,
            tw.pT20,
            tw.pB20
          ]}
        >
          <AccountList navigation={navigation} accounts={accounts} />

          <CustomButton
            style={[tw.justifyEnd, { position: `absolute`, bottom: 0 }]}
            onPress={() => {
              navigation.navigate(`Waccas`);
            }}
          >
            <Text style={[tw.text2xl, tw.pB8]}>Go to Waccas</Text>
          </CustomButton>
        </ScrollView>
      </>
    );
  }
}

const AccountsView = props => {
  const { navigation } = props;

  return (
    <AppContext.Consumer>
      {appContext => {
        return (
          <AccountsViewComponent
            appContext={appContext}
            navigation={navigation}
          />
        );
      }}
    </AppContext.Consumer>
  );
};

export default AccountsView;
