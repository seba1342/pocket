/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { Text, View } from "react-native";
import { tw } from "react-native-tailwindcss";
import { AppContext } from "../../AppContext";
import CustomButton from "./CustomButton";
import Notification from "./Notification";

class HeaderComponent extends Component {
  componentWillMount() {}

  //
  // render

  render() {
    const { appContext, navigation } = this.props;

    return (
      <>
        {!appContext.notificationHidden && (
          <Notification
            navigation={navigation}
            notificationData={appContext.notificationData}
          />
        )}

        <View
          style={[
            tw.wFull,
            tw.absolute,
            tw.pT8,
            tw.pL4,
            tw.mT4,
            tw.flex,
            tw.flexRow
          ]}
        >
          {navigation.state.routeName !== `Index` ? (
            <>
              <CustomButton
                style={[tw.absolute, tw.pT10, tw.pL4, tw.z50]}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text>{`< Back`}</Text>
              </CustomButton>

              <View style={[tw.wFull, tw.itemsCenter, tw.justifyCenter]}>
                <Text style={[tw.text3xl, tw.fontBold]}>
                  {appContext.headerTitle}
                </Text>
              </View>
            </>
          ) : (
            <Text style={[tw.text3xl, tw.fontBold]}>
              {appContext.headerTitle}
            </Text>
          )}
        </View>
      </>
    );
  }
}

const Header = props => {
  const { navigation } = props;

  return (
    <AppContext.Consumer>
      {appContext => (
        <HeaderComponent appContext={appContext} navigation={navigation} />
      )}
    </AppContext.Consumer>
  );
};

export default Header;
