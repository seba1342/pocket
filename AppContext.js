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
          balance: 300,
          pockets: [
            {
              id: 1,
              name: `Lifestyle`,
              limit: 1000,
              spent: 0,
              categories: [
                { name: `Eating out`, emoji: `🍽` },
                { name: `Shopping`, emoji: `🛍` }
              ]
            },
            {
              id: 2,
              name: `Partying`,
              limit: 10,
              spent: 0,
              categories: [
                { name: `Alcohol`, emoji: `🍸` },
                { name: `Fast food`, emoji: `🍕` }
              ]
            },
            {
              id: 3,
              name: `Survival`,
              limit: 250,
              spent: 0,
              categories: [
                { name: `Transport`, emoji: `🚗` },
                { name: `Groceries`, emoji: `🛒` }
              ]
            }
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

  // returns account, or undefined
  getAccountById = accountId => {
    const { accounts } = this.state;
    // eslint-disable-next-line consistent-return
    let foundAccount;
    accounts.forEach(account => {
      if (account.id === accountId) {
        foundAccount = account;
      }
    });
    return foundAccount;
  };

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

  logTransaction = (account, categoryName, emoji, description, amount) => {
    const { transactions } = account;
    console.log(`transactions`, transactions);
    const transaction = { emoji, category: categoryName, description, amount };
    transactions.push(transaction);
    account.transactions = transactions;
    this.setState({ account });
  };

  makePurchase = (
    accountId,
    purchaseAmount,
    descriptionParam,
    emojiParam,
    purchaseCategoryName
  ) => {
    const account = this.getAccountById(accountId);
    if (purchaseAmount > account.balance) {
      console.log(`total account limit exceeded`);
      return false;
    }
    let pocketToSpendFrom;
    let pocketLimitExceeded = false;
    account.pockets.forEach(pocket => {
      pocket.categories.forEach(category => {
        if (category.name === purchaseCategoryName) {
          pocketToSpendFrom = pocket;
          if (pocket.limit - pocket.spent < purchaseAmount) {
            console.log(`pocket limit exceeded`);
            pocketLimitExceeded = true;
          }
        }
      });
    });
    if (pocketLimitExceeded) {
      console.log(`exiting function cause pocket limit exceeded`);
      return false;
    }
    // at this point, the transaction is all good
    account.balance -= purchaseAmount;
    if (pocketToSpendFrom !== undefined) {
      pocketToSpendFrom.spent += purchaseAmount;
    }
    this.logTransaction(
      account,
      purchaseCategoryName,
      emojiParam,
      descriptionParam,
      `$${purchaseAmount}`
    );
    console.log(`purchase successful`);
    return true;
  };

  render() {
    const { children } = this.props;
    const { accounts } = this.state;

    return (
      <AppContext.Provider
        value={{
          addPocket: this.addPocket,
          makePurchase: this.makePurchase,
          accounts
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
