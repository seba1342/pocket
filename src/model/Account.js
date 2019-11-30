export default class Account {
  constructor(name, balance, pockets) {
    this.name = name;
    this.balance = balance;
    this.pockets = pockets;
  }

  getName() {
    return this.name;
  }

  getBalance() {
    return this.balance;
  }

  getPockets() {
    return this.pockets;
  }

  getPocket(pocketId) {
    return this.pockets.find(pocket => {
      pocket.id === pocketId;
    });
  }

  addPocket(pocket) {
    this.pockets.push(pocket);
  }

  updatePocket(pocket) {}
}
