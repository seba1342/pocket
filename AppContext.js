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
          name: `Spender`,
          balance: 875.65,
          pockets: [
            {
              id: 1,
              name: `Lifestyle`,
              limit: 150,
              spent: 69.1,
              period: `weekly`,
              categories: [
                { name: `Eating out`, emoji: `💃` },
                { name: `Shopping`, emoji: `🛍` }
              ]
            },
            {
              id: 2,
              name: `Transport`,
              limit: 1000,
              spent: 317.5,
              period: `weekly`,
              categories: [{ name: `Travel`, emoji: `🚀` }]
            }
          ],
          transactions: [
            {
              emoji: `🛍`,
              category: `Shopping`,
              description: `K-mart`,
              amount: `$23.1`
            },
            {
              emoji: `🛍`,
              category: `Shopping`,
              description: `Target`,
              amount: `$23`
            },
            {
              emoji: `🍽`,
              category: `Eating out`,
              description: `Nando's`,
              amount: `$23`
            },
            {
              emoji: `🚀`,
              category: `Travel`,
              description: `Hawaii`,
              amount: `$300`
            },
            {
              emoji: `🚀`,
              category: `Travel`,
              description: `Moon landing`,
              amount: `$17.5`
            }
          ]
        },
        {
          id: 2,
          name: `Savings`,
          balance: 15000
        }
      ],
      categories: [
        { name: `Fast food`, emoji: `🍕` },
        { name: `Eating out`, emoji: `🍽` },
        { name: `Shopping`, emoji: `🛍` },
        { name: `Alcohol`, emoji: `🍸` },
        { name: `Groceries`, emoji: `🛒` },
        { name: `Travel`, emoji: `🚀` },
        { name: `Holidays`, emoji: `🏝` }
      ],
      headerTitle: ``,
      notificationData: {
        title: ``,
        description: ``,
        image: ``,
        navigateTo: ``,
        navParams: {}
      },
      notificationHidden: true
    };
  }

  getPocketSpent = (accountId, pocketId) => {
    const account = this.getAccountById(accountId);
    let retVal = 0;

    account.pockets.forEach(pocket => {
      if (pocket.id === pocketId) {
        pocket.categories.forEach(category => {
          account.transactions.forEach(transaction => {
            if (transaction.category === category.name) {
              const amountString = transaction.amount;
              const amountStringNoDollarSign = amountString.substring(
                1,
                amountString.length
              );
              const amountFloat = parseFloat(amountStringNoDollarSign);

              retVal += amountFloat;
            }
          });
        });
      }
    });

    return retVal;
  };

  // returns account, or undefined
  getAccountById = accountId => {
    const { accounts } = this.state;
    let foundAccount;

    accounts.forEach(account => {
      if (account.id === accountId) {
        foundAccount = account;
      }
    });

    return foundAccount;
  };

  logTransaction = (accountId, categoryName, emoji, description, amount) => {
    const { accounts } = this.state;
    const transaction = { emoji, category: categoryName, description, amount };

    accounts.forEach(account => {
      if (account.id === accountId) {
        account.transactions.unshift(transaction);
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

          if (
            pocket.limit - this.getPocketSpent(accountId, pocket.id) <
            purchaseAmount
          ) {
            pocketLimitExceeded = true;
          }
        }
      });
    });

    if (pocketLimitExceeded) {
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

    return true;
  };

  setHeaderTitle = headerTitle => {
    this.setState({
      headerTitle
    });
  };

  setNotificationData = (title, description, image, navigateTo, navParams) => {
    this.setState({
      notificationData: {
        title,
        description,
        image,
        navigateTo,
        navParams
      }
    });

    this.showNotification();
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

  createPocket = pocket => {
    const { accounts } = this.state;

    accounts[0].pockets.push(pocket);

    this.setState({ accounts });
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
      categories,
      headerTitle,
      notificationData,
      notificationHidden
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          addPocket: this.addPocket,
          getPocketSpent: this.getPocketSpent,
          makePurchase: this.makePurchase,
          hideNotification: this.hideNotification,
          setHeaderTitle: this.setHeaderTitle,
          setNotificationData: this.setNotificationData,
          showNotification: this.showNotification,
          createPocket: this.createPocket,
          //
          accounts,
          categories,
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
