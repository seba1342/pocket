import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AccountsView from "./src/views/AccountsView";
import PocketView from "./src/views/PocketView";
import AppProvider from "./AppContext";
import WaccasView from "./src/views/WaccasView";

const RootStack = createStackNavigator(
  {
    Index: AccountsView,
    Pocket: PocketView,
    Waccas: WaccasView
  },
  {
    initialRouteName: `Index`
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
