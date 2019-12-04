import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { tw } from "react-native-tailwindcss";

import { AppContext } from "../../AppContext";

const NotificationComponent = props => {
  const { appContext, navigation } = props;

  const { notificationData } = appContext;

  return (
    !appContext.notificationHidden && (
      <TouchableOpacity
        style={[tw.block, tw.relative, tw.z50, tw.wFull]}
        onPressIn={() => {
          if (notificationData.navParams) {
            navigation.navigate(
              notificationData.navigateTo,
              notificationData.navParams
            );
          } else {
            navigation.navigate(notificationData.navigateTo);
          }

          appContext.hideNotification();
        }}
      >
        <View
          style={[
            tw.wFull,
            tw.absolute,
            tw.top0,
            tw.left0,
            tw.textBlack,
            tw.flex,
            tw.flexRow,
            tw.z50,
            tw.pT8,
            tw.mT1
          ]}
        >
          <View
            style={[
              tw.wFull,
              tw.hFull,
              tw.absolute,
              tw.bgWhite,
              tw.z10,
              tw.mT8,
              tw.roundedBLg
            ]}
          />
          <View style={[tw.flex, tw.flexRow, tw.itemsCenter, tw.z20]}>
            <Image
              source={notificationData.image}
              style={[
                tw.w8,
                tw.h8,
                tw.m4,
                { transform: [{ rotate: `180deg` }] }
              ]}
            />

            <View style={[tw.flex, tw.flexCol]}>
              <Text style={[tw.textXl]}>{notificationData.title}</Text>
              <Text>{notificationData.description}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  );
};

const Notification = props => {
  const { navigation } = props;

  return (
    <AppContext.Consumer>
      {appContext => {
        return (
          <NotificationComponent
            appContext={appContext}
            navigation={navigation}
          />
        );
      }}
    </AppContext.Consumer>
  );
};

export default Notification;
