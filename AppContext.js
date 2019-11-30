/* eslint-disable react/prop-types */
import React, { Component, createContext } from "react";

export const AppContext = createContext({});

class AppProvider extends Component {
  constructor() {
    super();

    this.state = {
      accounts: [
        { id: 1, name: `Daily Accounts`, balance: 1000, pockets: [] },
        {
          id: 2,
          name: `Savings`,
          balance: 15000,
          pockets: []
        }
      ]
    };
  }

  addPocket = (accountId, accountPocket) => {
    const { accounts } = this.state;

    accounts.forEach(account => {
      if (account.id === accountId) {
        account.pockets.push(accountPocket);
      }
    });

    this.setState({
      accounts
    });
  };

  render() {
    const { children } = this.props;
    const { accounts } = this.state;

    return (
      <AppContext.Provider
        value={{
          addPocket: this.addPocket,
          accounts
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;