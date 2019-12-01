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
          name: `Everyday Account`,
          balance: 999,
          pockets: [
            {
              id: 1,
              name: `Lifestyle`,
              limit: 150,
              spent: 69,
              period: `weekly`,
              categories: [
                { name: `Eating out`, emoji: `💃` },
                { name: `Shopping`, emoji: `🛍` }
              ]
            },
            {
              id: 2,
              name: `Transport`,
              limit: 10,
              spent: 0,
              period: `weekly`,
              categories: [{ name: `Travel`, emoji: `🚀` }]
            }
          ],
          transactions: [
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
            // console.log(transaction);
            // console.log(category);
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
    // eslint-disable-next-line consistent-return
    let foundAccount;
    accounts.forEach(account => {
      if (account.id === accountId) {
        foundAccount = account;
      }
    });
    return foundAccount;
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
      // this.setNotificationData(
      //   `Transaction Rejected`,
      //   `Insufficient funds in main account`,
      //   crewsDenied,
      //   `Index`
      // );
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
            console.log(`pocket limit exceeded`);
            // this.setNotificationData(
            //   `Transaction Rejected`,
            //   `Insufficient funds in ${pocket.name} Pocket`,
            //   crewsDenied,
            //   `Index`
            // );
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
    console.log(`logging transaction`);
    this.logTransaction(
      accountId,
      purchaseCategoryName,
      emojiParam,
      descriptionParam,
      `$${purchaseAmount}`
    );
    console.log(`Purchase Successful`);
    // this.setNotificationData(
    //   `Transaction Approved`,
    //   `Purchased ${descriptionParam} for $${purchaseAmount}`,
    //   crewsAccepted,
    //   `Index`
    // );
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
