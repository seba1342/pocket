/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { Text, View } from "react-native";
import { tw } from "react-native-tailwindcss";
import { AppContext } from "../../AppContext";

import CustomButton from "../components/CustomButton";

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

    return (
      <View
        style={[
          tw.wFull,
          tw.hFull,
          tw.relative,
          tw.flex,
          tw.itemsStretch,
          tw.bgPeach
        ]}
      >
        <Text>Gday M8</Text>
        <View style={[tw.flex1, tw.bgWhite]}>
          <CustomButton
            style={[
              tw.wFull,
              tw.flex,
              tw.flexRow,
              tw.itemsCenter,
              tw.justifyBetween,
              tw.pY5,
              tw.pX3
            ]}
          >
            <Text style={[tw.text2xl]}>Go to screen</Text>
          </CustomButton>
        </View>
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
