import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { tw } from "react-native-tailwindcss";

//

import AccountsView from "./src/views/AccountsView";
import PocketView from "./src/views/PocketView";
import AppProvider from "./AppContext";
import WaccasView from "./src/views/WaccasView";

//

import Header from "./src/components/Header";

const RootStack = createStackNavigator(
  {
    Index: AccountsView,
    Pocket: PocketView,
    Waccas: WaccasView
  },
  {
    initialRouteName: `Index`,
    defaultNavigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} />,
      headerStyle: {
        backgroundColor: `transparent`,
        zIndex: 40
      }
    })
  }
);

const AppContainer = createAppContainer(RootStack);

const App = () => {
  return (
    <AppProvider>
      <AppContainer />
    </AppProvider>
  );
};

export default App;
