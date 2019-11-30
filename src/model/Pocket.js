export default class Pocket {
  constructor(name, limit, categories) {
    this.name = name
    this.limit = limit
    this.categories = categories
  }

  getName() {
    return this.name
  }

  getLimit() {
    return this.limit
  }

  getCategories() {
    return this.categories
  }
}
