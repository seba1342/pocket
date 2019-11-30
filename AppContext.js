/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component, createContext } from "react";

export const AppContext = createContext({});

class AppProvider extends Component {
  notificationInterval;

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
              period: `weekly`,
              categories: [
                { name: `Eating out`, emoji: `🍽` },
                { name: `Shopping`, emoji: `🛍` }
              ]
            },
            {
              id: 2,
              name: `Partying`,
              limit: 10,
              spent: 5,
              period: `weekly`,
              categories: [
                { name: `Alcohol`, emoji: `🍸` },
                { name: `Fast food`, emoji: `🍕` }
              ]
            },
            {
              id: 3,
              name: `Survival`,
              limit: 250,
              spent: 75,
              period: `monthly`,
              categories: [
                { name: `Transport`, emoji: `🚗` },
                { name: `Groceries`, emoji: `🛒` }
              ]
            }
          ],
          transactions: [
            {
              emoji: `🍸`,
              category: `Alcohol`,
              description: `Rats Bar`,
              amount: `$50`
            },
            {
              emoji: `🍸`,
              category: `Alcohol`,
              description: `Dan Murphy's`,
              amount: `$3000`
            },
            {
              emoji: `🍽`,
              category: `Fast food`,
              description: `Waccas`,
              amount: `$5`
            },
            {
              emoji: `🛍`,
              category: `Shopping`,
              description: `K-mart`,
              amount: `$23`
            },
            {
              emoji: `🛍`,
              category: `Shopping`,
              description: `Target`,
              amount: `$23`
            },
            {
              emoji: `🍕`,
              category: `Fast food`,
              description: `Hungry Wac's`,
              amount: `$23`
            },
            {
              emoji: `🍽`,
              category: `Eating out`,
              description: `Nando's`,
              amount: `$23`
            }
          ]
        },
        {
          id: 2,
          name: `Savings`,
          balance: 15000
        }
      ],
      headerTitle: ``,
      notificationData: {
        title: ``,
        description: ``,
        image: ``,
        navigateTo: ``
      },
      notificationHidden: true
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

  logTransaction = (accountId, categoryName, emoji, description, amount) => {
    // const account = this.getAccountById(accountId);
    // const { transactions } = account;
    const { accounts } = this.state;

    // console.log(`transactions`, transactions);

    const transaction = { emoji, category: categoryName, description, amount };
    // transactions.push(transaction);
    // account.transactions = transactions;

    accounts.forEach(account => {
      if (account.id === accountId) {
        account.transactions.push(transaction);
      }
    });

    this.setState({ accounts });
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
      accountId,
      purchaseCategoryName,
      emojiParam,
      descriptionParam,
      `$${purchaseAmount}`
    );
    console.log(`purchase successful`);
    return true;
  };

  setHeaderTitle = headerTitle => {
    this.setState({
      headerTitle
    });
  };

  setNotificationData = (title, description, image, navigateTo) => {
    this.setState({
      notificationData: {
        title,
        description,
        image,
        navigateTo
      }
    });

    this.showNotification();
  };

  showNotification = () => {
    const { notificationHidden } = this.state;

    if (notificationHidden) {
      this.setState({
        notificationHidden: false
      });

      this.notificationInterval = setInterval(() => {
        this.setState({
          notificationHidden: true
        });
      }, 5000);
    }
  };

  hideNotification = () => {
    this.setState({
      notificationHidden: true
    });
    clearInterval(this.notificationInterval);
  };

  render() {
    const { children } = this.props;
    const {
      accounts,
      headerTitle,
      notificationData,
      notificationHidden
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          addPocket: this.addPocket,
          makePurchase: this.makePurchase,
          hideNotification: this.hideNotification,
          setHeaderTitle: this.setHeaderTitle,
          setNotificationData: this.setNotificationData,
          showNotification: this.showNotification,
          //
          accounts,
          headerTitle,
          notificationData,
          notificationHidden
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
