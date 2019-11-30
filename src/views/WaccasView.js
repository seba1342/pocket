/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { tw } from "react-native-tailwindcss";
import AppProvider, { AppContext } from "../../AppContext";

import burgerImage from "../../assets/burger.png";
import maccasLogoImage from "../../assets/maccas.png";

class WaccasViewComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam(`headerTitle`, `Pockets`)
    };
  };

  styles = StyleSheet.create({
    rotateImage: {
      transform: [{ rotate: `180deg` }]
    },
    buyNowButton: {
      marginRight: 40,
      marginLeft: 40,
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: `#ffc300`,
      borderRadius: 2
    }
  });

  constructor() {
    super();

    this.state = {
      expanded: -1
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  // eslint-disable-next-line class-methods-use-this
  purchaseBurger = () => {
    const { appContext } = this.props;
    // hardcoded account id = 1, burger costs $1
    appContext.makePurchase(1, 1, `Fast food`);
  };

  render() {
    const { navigation, appContext } = this.props;
    const { expanded } = this.state;

    return (
      <View
        style={
          ([tw.wFull, tw.hFull, tw.relative, tw.itemsStretch, tw.p4],
          {
            backgroundColor: `#dd1021`
          })
        }
      >
        <View
          style={[
            tw.wFull,
            tw.hFull,
            tw.itemsCenter,
            tw.flex,
            tw.flexCol,
            tw.justifyBetween,
            tw.pT8,
            tw.pB16
          ]}
        >
          <Image
            style={[
              { width: 270, height: 250, backgroundColor: `transparent` },
              this.styles.rotateImage
            ]}
            source={maccasLogoImage}
          />
          <Image
            style={{ width: 282, height: 200, backgroundColor: `transparent` }}
            source={burgerImage}
          />
          <View
            style={[
              tw.bgWhite,
              tw.p4,
              tw.mT8,
              tw.rounded,
              tw.flex,
              tw.flexCol,
              tw.justifyBetween,
              tw.m8,
              {
                width: 360
              }
            ]}
          >
            <Text style={[tw.fontBold, tw.text4xl, tw.pY2]}>
              Today&apos;s deal
            </Text>
            <Text style={[tw.fontSemibold, tw.pY2]}>$1 shitty hamburgers!</Text>
            <TouchableOpacity
              onPress={this.purchaseBurger}
              style={[this.styles.buyNowButton, tw.itemsCenter, tw.pY2]}
            >
              <Text>Buy now!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const WaccasView = props => {
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

export default WaccasView;
