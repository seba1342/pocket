/* eslint-disable no-unused-vars */
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
            { id: 1, name: `Partying`, limit: 1000, spent: 0 },
            { id: 2, name: `Eating out`, limit: 500, spent: 0 },
            { id: 3, name: `Groceries`, limit: 250, spent: 0 }
          ],
          transactions: [
            {
              emoji: `🎉`,
              category: `Partying`,
              description: `Rats Bar`,
              amount: `$50`
            },
            {
              emoji: `🎉`,
              category: `Eating out`,
              description: `Waccas`,
              amount: `$5`
            },
            {
              emoji: `🎉`,
              category: `Groceries`,
              description: `Woolies`,
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

  getAccountById(accountId) {
    const { accounts } = this.state;
    // eslint-disable-next-line consistent-return
    accounts.forEach(account => {
      if (account.id === accountId) {
        return account;
      }
    });
    return false;
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

  makePayment = (accountId, purchaseAmount, purchaseCategory) => {
    const account = this.getAccountById(accountId);
    if (purchaseAmount > account.balance) {
      return false;
    }
    let pocketToSpendFrom;
    account.pockets.forEach(pocket => {
      pocket.forEach(category => {
        if (category.name === purchaseCategory.name) {
          pocketToSpendFrom = pocket;
          if (pocket.limit - pocket.spent < purchaseAmount) {
            return false;
          }
        }
      });
    });
    // at this point, the transaction is all good
    account.balance -= purchaseAmount;
    if (pocketToSpendFrom !== undefined) {
      pocketToSpendFrom.spent += purchaseAmount;
    }
    return true;
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
