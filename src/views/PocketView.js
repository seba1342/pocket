/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { View } from "react-native";
import { tw } from "react-native-tailwindcss";
import { AppContext } from "../../AppContext";
import Pocket from "../components/pockets/Pocket";

class PocketViewComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam(`headerTitle`, `Pockets`)
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

    navigation.navigate(`Tutorial1`);
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
    const { expanded, tokens } = this.state;

    const { pocket, account } = navigation.state.params;

    return (
      <View
        style={[
          tw.wFull,
          tw.hFull,
          tw.relative,
          tw.flex,
          tw.itemsStretch,
          tw.p4
        ]}
      >
        <Pocket pocket={pocket} account={account} />
      </View>
    );
  }
}

const PocketView = props => {
  const { navigation } = props;

  return (
    <AppContext.Consumer>
      {appContext => {
        return (
          <PocketViewComponent
            appContext={appContext}
            navigation={navigation}
          />
        );
      }}
    </AppContext.Consumer>
  );
};

export default PocketView;
