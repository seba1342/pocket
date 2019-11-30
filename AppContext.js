/* eslint-disable react/prop-types */
import React, { Component, createContext } from "react";

export const AppContext = createContext({});

class AppProvider extends Component {
  constructor() {
    super();

    this.state = {
      accounts: [
        {
          name: `Daily Accounts`,
          balance: 1000,
          pockets: []
        },
        {
          name: `Savings`,
          balance: 15000,
          pockets: []
        }
      ]
    };
  }

  render() {
    const { children } = this.props;
    const { accounts } = this.state;

    return (
      <AppContext.Provider
        value={{
          // FUNCTIONS
          accounts
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
