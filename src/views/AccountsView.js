/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { Text, View } from "react-native";
import { tw } from "react-native-tailwindcss";

import { AppContext } from "../../AppContext";

import AccountList from "../components/accounts/AccountList";
import CustomButton from "../components/CustomButton";

class AccountsViewComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam(`headerTitle`, `Accounts`)
    };
  };

  constructor() {
    super();

    this.state = {
      expanded: -1,
      tokens: []
    };
  }

  componentWillMount() {}

  //

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

    // testing
    // navigation.navigate(`Index`);
    // navigation.navigate(`Tutorial1`);
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

  //

  render() {
    const { navigation } = this.props;

    return (
      <View style={[tw.wFull, tw.hFull, tw.relative, tw.flex, tw.itemsStretch]}>
        <AccountList />

        <View style={[tw.bgWhite]}>
          <CustomButton
            onPress={() => {
              navigation.navigate(`Pocket`);
            }}
          >
            <Text style={[tw.text2xl]}>Go to Pocket</Text>
          </CustomButton>
        </View>
      </View>
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
