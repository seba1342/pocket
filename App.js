import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AccountsView from "./src/views/AccountsView";
import PocketView from "./src/views/PocketView";
import AppProvider from "./AppContext";

const RootStack = createStackNavigator(
  {
    Index: AccountsView,
    Pocket: PocketView
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
