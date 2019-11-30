/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { Text, View } from "react-native";
import { tw } from "react-native-tailwindcss";
import { AppContext } from "../../AppContext";

class WaccasViewComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam(`headerTitle`, `Pockets`)
    };
  };

  constructor() {
    super();

    this.state = {
      expanded: -1
    };
  }

  componentWillMount() {}

  render() {
    const { navigation } = this.props;
    const { expanded } = this.state;

    return (
      <View style={[tw.wFull, tw.hFull, tw.relative, tw.flex, tw.itemsStretch]}>
        <Text>Gday M8</Text>
        <View style={[tw.bgRed100]}>
          <Text>This is waccas!!!</Text>
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
          <WaccasViewComponent
            appContext={appContext}
            navigation={navigation}
          />
        );
      }}
    </AppContext.Consumer>
  );
};

export default PocketView;
