/* eslint-disable react/prop-types */
import React, { Component, createContext } from "react";

export const AppContext = createContext({});

class AppProvider extends Component {
  constructor() {
    super();

    this.state = {
      accounts: [
        {
          id: 1,
          name: `Daily Accounts`,
          balance: 1000,
          pockets: [
            {
              id: 1,
              name: `Lifestyle`,
              limit: 1000,
              categories: [
                { name: `Eating out`, emoji: `🍽` },
                { name: `Shopping`, emoji: `🛍` }
              ]
            },
            { id: 2, name: `Eating out`, limit: 500 },
            { id: 3, name: `Groceries`, limit: 250 }
          ],
          transactions: [
            {
              emoji: `🎉`,
              category: `Partying`,
              description: `Rats Bar`,
              amount: `$50`
            },
            {
              emoji: `🍽`,
              category: `Eating out`,
              description: `Waccas`,
              amount: `$5`
            },
            {
              emoji: `🛍`,
              category: `Shopping`,
              description: `Christmas gifts`,
              amount: `$23`
            }
          ]
        },
        {
          id: 2,
          name: `Savings`,
          balance: 15000
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
