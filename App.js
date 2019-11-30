import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet, Text, View } from "react-native";

import AccountsView from "./src/views/AccountsView";
import PocketView from "./src/views/PocketView";

const RootStack = createStackNavigator(
  {
    Index: AccountsView,
    Pocket: PocketView
  },
  {
    initialRouteName: `Index`
    // initialRouteName: `Preferences`,
    // defaultNavigationOptions: ({ navigation }) => ({
    //   header: <Header navigation={navigation} />,
    //   headerStyle: {
    //     backgroundColor: `transparent`,
    //     zIndex: 999
    //   }
    // })
  }
);

const AppContainer = createAppContainer(RootStack);

const App = () => {
  return <AppContainer />;
};

export default App;
