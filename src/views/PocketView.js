/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { NavigationEvents } from "react-navigation";
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

  componentWillMount() {
    const { appContext } = this.props;

    appContext.setHeaderTitle(`Pocket`);
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
    const { appContext, navigation } = this.props;

    const { pocket, account } = navigation.state.params;

    return (
      <>
        <NavigationEvents
          onWillFocus={() => appContext.setHeaderTitle(`${pocket.name} pocket`)}
        />

        <ScrollView
          contentContainerStyle={[
            tw.wFull,
            tw.minHFull,
            tw.relative,
            tw.flex,
            tw.itemsStretch,
            tw.p4,
            tw.bgCream,
            tw.pT16
          ]}
        >
          <Pocket pocket={pocket} account={account} />
        </ScrollView>
      </>
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
